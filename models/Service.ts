import mongoose, { Schema, Document, Model } from "mongoose";
import { ServiceCategory } from "@/lib/types";

export interface IServiceDocument extends Document {
  id: string;
  salonId: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  description: string;
  popular?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IServiceDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    salonId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Hair",
        "Skin & Facial",
        "Nails & Art",
        "Bridal & Festive",
        "Spa & Wellness",
        "Beard & Men's Grooming",
      ],
      required: true,
    },
    price: { type: Number, required: true },
    durationMinutes: { type: Number, required: true, default: 45 },
    description: { type: String, default: "" },
    popular: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const ServiceModel: Model<IServiceDocument> =
  mongoose.models.Service || mongoose.model<IServiceDocument>("Service", ServiceSchema);

export default ServiceModel;
