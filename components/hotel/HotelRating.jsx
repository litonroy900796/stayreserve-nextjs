import { getRatingsForAHotel } from "@/lib/queries/hotels-query";
import React from "react";

async function HotelRating({ hotelId }) {
  const ratings = await getRatingsForAHotel(hotelId);
  const totalReviews = ratings.length;

  const averageRating = totalReviews
    ? Math.round(
        (ratings.reduce((sum, r) => sum + r.rating, 0) / totalReviews) * 10,
      ) / 10
    : 0;

  const ratingText = getRatingText(averageRating);

  return (
    <>
      <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
        {totalReviews ? averageRating : "N/A"}
      </div>
      <span className="font-medium">{ratingText}</span>
    </>
  );
}

function getRatingText(rating) {
  if (rating >= 4.5) return "Exceptional";
  if (rating >= 4) return "Excellent";
  if (rating >= 3.5) return "Very Good";
  if (rating >= 3) return "Good";
  if (rating >= 2) return "Fair";
  return "No Reviews";
}

export default HotelRating;
