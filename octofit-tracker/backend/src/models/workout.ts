import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  durationMinutes: number;
  focus: string;
  equipment: string[];
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
  equipment: [{ type: String }],
}, { timestamps: true });

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
