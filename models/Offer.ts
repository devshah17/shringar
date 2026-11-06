import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOfferDocument extends Document {
  id: string;
  salonId: string;
  code: string;
  title: string;
  discountPercent: number;
  minBillAmount: number;
  validUntil: string;
  isActive: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema = new Schema<IOfferDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    salonId: { type: String, required: true, index: true },
    code: { type: String, required: true },
    title: { type: String, required: true },
    discountPercent: { type: Number, required: true },
    minBillAmount: { type: Number, default: 0 },
    validUntil: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export const OfferModel: Model<IOfferDocument> =
  mongoose.models.Offer || mongoose.model<IOfferDocument>("Offer", OfferSchema);

export default OfferModel;
