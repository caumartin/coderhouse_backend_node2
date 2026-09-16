import { mongoose } from 'mongoose';
import { env } from './env.js';

const MONGODB_URI = env.MONGODB_URI;

export async function connectDB() {
  await mongoose.connect(MONGODB_URI)}