import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/dbConnect";
import { bookingModel } from "@/models/booking-model";
import mongoose from "mongoose";


export async function POST(req) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 },
      );
    }

    const body = await req.json();
    const {
      hotelId,
      checkin,
      checkout,
      nights,
      totalPrice,
      guestName,
      guestEmail,
      card,
      expiry,
      cvv,
    } = body;

    if (!hotelId || !checkin || !checkout || !guestName || !guestEmail) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    if (!card || !expiry || !cvv) {
      return NextResponse.json(
        { error: "Card details are required." },
        { status: 400 },
      );
    }

    await dbConnect();

    const booking = await bookingModel.create({
      hotelId: new mongoose.Types.ObjectId(hotelId),
      userId: new mongoose.Types.ObjectId(session.user.id),
      checkin,
      checkout,
      nights,
      totalPrice,
      guestName,
      guestEmail,
      status: "confirmed",
    });

    return NextResponse.json(
      { message: "Booking successful", booking },
      { status: 201 },
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
