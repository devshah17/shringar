import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ServiceModel from "@/models/Service";

export async function GET(req: NextRequest) {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, message: "DB Offline" }, { status: 503 });
    }
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get("salonId");

    const query = salonId ? { salonId } : {};
    const services = await ServiceModel.find(query).lean();
    return NextResponse.json({ success: true, services });
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
    const newService = await ServiceModel.create(body);
    return NextResponse.json({ success: true, service: newService });
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
    const updated = await ServiceModel.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    return NextResponse.json({ success: true, service: updated });
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
      return NextResponse.json({ success: false, error: "Missing service id" }, { status: 400 });
    }
    await ServiceModel.deleteOne({ id });
    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
