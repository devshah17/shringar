import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: false, message: "DB Offline" }, { status: 503 });
    }
    const users = await UserModel.find().lean();
    return NextResponse.json({ success: true, users });
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
    const userData = await req.json();
    const existing = await UserModel.findOne({ email: userData.email });
    if (existing) {
      const updated = await UserModel.findOneAndUpdate(
        { email: userData.email },
        { $set: userData },
        { new: true }
      ).lean();
      return NextResponse.json({ success: true, user: updated });
    }
    const newUser = await UserModel.create(userData);
    return NextResponse.json({ success: true, user: newUser });
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
    const { userId, role, status, permissions } = await req.json();
    const updates: Record<string, unknown> = {};
    if (role !== undefined) updates.role = role;
    if (status !== undefined) updates.status = status;
    if (permissions !== undefined) updates.permissions = permissions;

    const updated = await UserModel.findOneAndUpdate(
      { id: userId },
      { $set: updates },
      { new: true }
    ).lean();
    return NextResponse.json({ success: true, user: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
