import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  calories: number;
  distanceKm?: number;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  distanceKm: { type: Number },
}, { timestamps: true });

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
