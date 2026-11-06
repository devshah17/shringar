import mongoose, { Schema, Document, Model } from "mongoose";
import { SalonType } from "@/lib/types";

export interface ISalonDocument extends Document {
  id: string;
  ownerId: string;
  name: string;
  type: SalonType;
  address: string;
  city: string;
  phone: string;
  rating: number;
  reviewCount: number;
  image: string;
  establishedYear: number;
  createdAt: Date;
  updatedAt: Date;
}

const SalonSchema = new Schema<ISalonDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    ownerId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["unisex", "ladies", "men"], required: true, default: "unisex" },
    address: { type: String, default: "" },
    city: { type: String, default: "Mumbai" },
    phone: { type: String, default: "" },
    rating: { type: Number, default: 5.0 },
    reviewCount: { type: Number, default: 0 },
    image: { type: String, default: "" },
    establishedYear: { type: Number, default: 2026 },
  },
  {
    timestamps: true,
  }
);

export const SalonModel: Model<ISalonDocument> =
  mongoose.models.Salon || mongoose.model<ISalonDocument>("Salon", SalonSchema);

export default SalonModel;
