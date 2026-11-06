import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRewardConfigDocument extends Document {
  id: string;
  earnRate: number;
  pointValueRupees: number;
  minPointsToRedeem: number;
  tierThresholds: {
    bronze: number;
    silver: number;
    gold: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const RewardConfigSchema = new Schema<IRewardConfigDocument>(
  {
    id: { type: String, default: "global-rewards", unique: true, index: true },
    earnRate: { type: Number, default: 5 },
    pointValueRupees: { type: Number, default: 0.5 },
    minPointsToRedeem: { type: Number, default: 100 },
    tierThresholds: {
      bronze: { type: Number, default: 0 },
      silver: { type: Number, default: 250 },
      gold: { type: Number, default: 500 },
    },
  },
  {
    timestamps: true,
  }
);

export const RewardConfigModel: Model<IRewardConfigDocument> =
  mongoose.models.RewardConfig ||
  mongoose.model<IRewardConfigDocument>("RewardConfig", RewardConfigSchema);

export default RewardConfigModel;
