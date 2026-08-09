import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bookingModel } from "@/models/booking-model";
import { getBookingById, getHotelById } from "@/lib/queries/hotels-query";

async function BookingConfirmation({ params }) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  const hotel = await getHotelById(booking.hotelId);

  return (
    <section className="container">
      <div className="max-w-xl mx-auto my-12 mt-[100px]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-bold text-2xl">Booking Confirmed</h2>
          <p className="text-gray-600 text-sm mt-1">
            A confirmation has been sent to {booking.guestEmail}
          </p>
        </div>

        <div className="border border-[#CCCCCC]/60 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-[#CCCCCC]/60">
            <span className="text-gray-500 text-sm">Booking ID</span>
            <span className="font-medium text-sm">{booking._id}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Hotel</span>
            <span className="font-medium">{hotel?.name || "N/A"}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Guest Name</span>
            <span className="font-medium">{booking.guestName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Check in</span>
            <span className="font-medium">{booking.checkin}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Checkout</span>
            <span className="font-medium">{booking.checkout}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Nights</span>
            <span className="font-medium">{booking.nights}</span>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#CCCCCC]/60">
            <span className="text-gray-500 text-sm">Total Paid</span>
            <span className="font-bold text-lg">${booking.totalPrice}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">Status</span>
            <span className="capitalize font-medium text-green-600">
              {booking.status}
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="/"
            className="flex-1 text-center border border-[#CCCCCC]/60 py-2 rounded-md"
          >
            Back to Home
          </Link>
          <Link
            href="/bookings"
            className="flex-1 text-center btn-primary py-2 rounded-md"
          >
            View My Bookings
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BookingConfirmation;