import { getReviewsForAHotel } from '@/lib/queries/hotels-query';
import Link from 'next/link';
import React from 'react'

const HotelReview = async ({ hotelId }) => {
    const reviews = await getReviewsForAHotel(hotelId);
  return (
    <>
      {reviews?.length === 0 ? (
        <Link href="#" className="underline">
          Be the first one to review
        </Link>
      ) : (
        <Link href={`/hotel/${hotelId}/reviews`} className="underline">
          {reviews.length} Reviews
        </Link>
      )}
    </>
  );
}

export default HotelReview
