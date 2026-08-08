import { auth } from "@/auth";
import PaymentForm from "@/components/payment/PaymentForm";
import { getHotelById } from "@/lib/queries/hotels-query";
import React from "react";

async function HotelCheckOut({ searchParams }) {
  const session = await auth();
  const { property_id, checkin, checkout } = await searchParams;
  const hotel = await getHotelById(property_id);

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  const nights = Math.max(
    1,
    Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)),
  );
  const totalPrice = (hotel?.lowRate || 0) * nights;

  return (
    <section className="container">
      <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
        <h2 className="font-bold text-2xl">Payment Details</h2>
        <p className="text-gray-600 text-sm">
          You have picked <b>{hotel?.name}</b> and total price is{" "}
          <b>${totalPrice}</b> for {nights} day(s).
        </p>
        <PaymentForm
          session={session}
          checkin={checkin}
          checkout={checkout}
          hotel={hotel}
          nights={nights}
          totalPrice={totalPrice}
        />
      </div>
    </section>
  );
}

export default HotelCheckOut;
