import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SalonModel from "@/models/Salon";
import ServiceModel from "@/models/Service";
import BookingModel from "@/models/Booking";
import UserModel from "@/models/User";
import OfferModel from "@/models/Offer";
import RewardConfigModel from "@/models/RewardConfig";
import {
  INITIAL_SALONS,
  INITIAL_SERVICES,
  INITIAL_BOOKINGS,
  INITIAL_USERS,
  INITIAL_OFFERS,
  INITIAL_REWARD_CONFIG,
} from "@/lib/mock-data";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: false,
        offline: true,
        message: "MongoDB connection unavailable",
      });
    }

    // Auto-seed initial data if database is empty
    const salonCount = await SalonModel.countDocuments();
    if (salonCount === 0) {
      await Promise.all([
        SalonModel.insertMany(INITIAL_SALONS),
        ServiceModel.insertMany(INITIAL_SERVICES),
        BookingModel.insertMany(INITIAL_BOOKINGS),
        UserModel.insertMany(INITIAL_USERS),
        OfferModel.insertMany(INITIAL_OFFERS),
        RewardConfigModel.create(INITIAL_REWARD_CONFIG),
      ]);
    }

    const [salons, services, bookings, users, offers, rewardDoc] = await Promise.all([
      SalonModel.find().lean(),
      ServiceModel.find().lean(),
      BookingModel.find().sort({ createdAt: -1 }).lean(),
      UserModel.find().lean(),
      OfferModel.find().sort({ createdAt: -1 }).lean(),
      RewardConfigModel.findOne().lean(),
    ]);

    const sanitize = <T extends { _id?: unknown; __v?: unknown }>(items: T[]) =>
      items.map(({ _id, __v, ...rest }) => rest);

    return NextResponse.json({
      success: true,
      salons: sanitize(salons),
      services: sanitize(services),
      bookings: sanitize(bookings),
      users: sanitize(users),
      offers: sanitize(offers),
      rewardConfig: rewardDoc
        ? (({ _id, __v, ...rest }) => rest)(rewardDoc)
        : INITIAL_REWARD_CONFIG,
    });
  } catch (error: unknown) {
    console.error("API /sync error:", error);
    const errMessage = error instanceof Error ? error.message : "Sync error";
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}
