import { Schema, model, Types } from 'mongoose';

const ticketSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'cancelled'],
      default: 'active'
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    },
    code: {
      type: String,
      unique: true
    },
    cancelledAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
)

export const ticketModel = model('Ticket', ticketSchema);
