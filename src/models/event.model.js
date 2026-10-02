import { Schema, Types, model } from 'mongoose';

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
    city: {
    type: String,
    required: true,
  },
    available_tickets: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  organizer: {
    type: Types.ObjectId,
    ref: "User"
  }
});

export const eventModel = model('Event', eventSchema);
