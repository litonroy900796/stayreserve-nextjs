import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const bookingSchema = new Schema(
  {
    hotelId: {
      required: true,
      type: ObjectId,
    },
    userId: {
      required: true,
      type: ObjectId,
    },
    checkin: {
      required: true,
      type: String,
    },
    checkout: {
      required: true,
      type: String,
    },
    nights: {
      required: true,
      type: Number,
    },
    totalPrice: {
      required: true,
      type: Number,
    },
    guestName: {
      required: true,
      type: String,
    },
    guestEmail: {
      required: true,
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true },
);

export const bookingModel =
  mongoose.models.bookings ?? mongoose.model("bookings", bookingSchema);
