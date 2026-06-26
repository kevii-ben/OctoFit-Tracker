import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: string[];
  focus: string;
  captain: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: String, required: true }],
  focus: { type: String, required: true },
  captain: { type: String, required: true },
}, { timestamps: true });

export const Team = mongoose.model<ITeam>('Team', teamSchema);
