import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SalonModel from "@/models/Salon";
import ServiceModel from "@/models/Service";
import BookingModel from "@/models/Booking";

export async function GET(req: NextRequest) {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, message: "DB Offline" }, { status: 503 });
    }
    const { searchParams } = new URL(req.url);
    const ownerId = searchParams.get("ownerId");

    const query = ownerId ? { ownerId } : {};
    const salons = await SalonModel.find(query).lean();
    return NextResponse.json({ success: true, salons });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, message: "DB Offline" }, { status: 503 });
    }
    const body = await req.json();
    const newSalon = await SalonModel.create(body);
    return NextResponse.json({ success: true, salon: newSalon });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, message: "DB Offline" }, { status: 503 });
    }
    const { id, ...updates } = await req.json();
    const updated = await SalonModel.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    return NextResponse.json({ success: true, salon: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, message: "DB Offline" }, { status: 503 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing salon id" }, { status: 400 });
    }

    await Promise.all([
      SalonModel.deleteOne({ id }),
      ServiceModel.deleteMany({ salonId: id }),
      BookingModel.deleteMany({ salonId: id }),
    ]);

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
