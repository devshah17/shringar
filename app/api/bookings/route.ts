import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import BookingModel from "@/models/Booking";
import UserModel from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, message: "DB Offline" }, { status: 503 });
    }
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");
    const salonId = searchParams.get("salonId");

    const query: Record<string, unknown> = {};
    if (customerId) query.customerId = customerId;
    if (salonId) query.salonId = salonId;

    const bookings = await BookingModel.find(query).sort({ date: -1, time: -1 }).lean();
    return NextResponse.json({ success: true, bookings });
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
    const newBooking = await BookingModel.create(body);

    // If points earned, update customer's reward points in User collection
    if (body.pointsEarned && body.pointsEarned > 0 && body.customerId) {
      await UserModel.findOneAndUpdate(
        { id: body.customerId },
        { $inc: { rewardPoints: body.pointsEarned } }
      );
    }

    return NextResponse.json({ success: true, booking: newBooking });
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
    const { id, status } = await req.json();
    const updated = await BookingModel.findOneAndUpdate(
      { id },
      { $set: { status } },
      { new: true }
    ).lean();
    return NextResponse.json({ success: true, booking: updated });
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
      return NextResponse.json({ success: false, error: "Missing booking id" }, { status: 400 });
    }
    await BookingModel.deleteOne({ id });
    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
