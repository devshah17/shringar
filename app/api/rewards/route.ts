import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import RewardConfigModel from "@/models/RewardConfig";
import { INITIAL_REWARD_CONFIG } from "@/lib/mock-data";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ success: true, rewardConfig: INITIAL_REWARD_CONFIG, offline: true });
    }
    let config = await RewardConfigModel.findOne().lean();
    if (!config) {
      config = await RewardConfigModel.create(INITIAL_REWARD_CONFIG);
    }
    return NextResponse.json({ success: true, rewardConfig: config });
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
    const updates = await req.json();
    const updated = await RewardConfigModel.findOneAndUpdate(
      {},
      { $set: updates },
      { upsert: true, new: true }
    ).lean();
    return NextResponse.json({ success: true, rewardConfig: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
