import mongoose, { Schema, Document, Model } from "mongoose";
import { UserRole, UserStatus } from "@/lib/types";

export interface IUserDocument extends Document {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  salonIds?: string[];
  rewardPoints?: number;
  permissions?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    role: { type: String, enum: ["owner", "customer", "admin"], required: true, default: "customer" },
    status: { type: String, enum: ["Active", "Suspended"], default: "Active" },
    avatar: { type: String },
    phone: { type: String },
    salonIds: [{ type: String }],
    rewardPoints: { type: Number, default: 0 },
    permissions: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;
