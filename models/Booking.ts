import mongoose, { Schema, Document, Model } from "mongoose";
import { BookingStatus } from "@/lib/types";

export interface IBookingDocument extends Document {
  id: string;
  salonId: string;
  salonName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  stylistName: string;
  date: string;
  time: string;
  price: number;
  status: BookingStatus;
  pointsEarned?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBookingDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    salonId: { type: String, required: true, index: true },
    salonName: { type: String, required: true },
    customerId: { type: String, required: true, index: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, default: "" },
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    stylistName: { type: String, default: "Senior Stylist" },
    date: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Confirmed", "Completed", "Cancelled"],
      default: "Confirmed",
    },
    pointsEarned: { type: Number, default: 0 },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

export const BookingModel: Model<IBookingDocument> =
  mongoose.models.Booking || mongoose.model<IBookingDocument>("Booking", BookingSchema);

export default BookingModel;
