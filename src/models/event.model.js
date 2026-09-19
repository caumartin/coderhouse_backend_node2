import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
    place: {
    type: String,
    required: true,
  },
    capacity: {
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
  }
});

export const eventModel = model('Event', eventSchema);
