import { Schema, model, Types } from 'mongoose';

const ticketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  }
});

export const ticketModel = model('Ticket', ticketSchema);
