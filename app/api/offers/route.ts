import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import OfferModel from "@/models/Offer";

export async function GET(req: NextRequest) {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, message: "DB Offline" }, { status: 503 });
    }
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get("salonId");

    const query = salonId ? { salonId } : {};
    const offers = await OfferModel.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, offers });
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
    const newOffer = await OfferModel.create(body);
    return NextResponse.json({ success: true, offer: newOffer });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, message: "DB Offline" }, { status: 503 });
    }
    const { id } = await req.json();
    const current = await OfferModel.findOne({ id });
    if (!current) {
      return NextResponse.json({ success: false, error: "Offer not found" }, { status: 404 });
    }
    current.isActive = !current.isActive;
    await current.save();
    return NextResponse.json({ success: true, offer: current });
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
      return NextResponse.json({ success: false, error: "Missing offer id" }, { status: 400 });
    }
    await OfferModel.deleteOne({ id });
    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
