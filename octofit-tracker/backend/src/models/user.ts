import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  fitnessGoal: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessGoal: { type: String, required: true },
  role: { type: String, default: 'member' },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
