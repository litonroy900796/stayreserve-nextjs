import { dbConnect } from "@/lib/dbConnect";
import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-modal";
import { reviewModel } from "@/models/review-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-format";

export async function getAllHotels({ destination, checkin, checkout } = {}) {
  await dbConnect();

  const normalizedDestination = Array.isArray(destination)
    ? destination[0]
    : destination;

  const query = {};
  if (normalizedDestination && normalizedDestination !== "all") {
    query.city = { $regex: normalizedDestination.trim(), $options: "i" };
  }

  const hotels = await hotelModel
    .find(query)
    .select([
      "thumbNailUrl",
      "name",
      "highRate",
      "lowRate",
      "city",
      "propertyCategory",
    ])
    .lean();

  // checkin/checkout na thakle sob hotel isBooked: false
  if (!checkin || !checkout) {
    return replaceMongoIdInArray(
      hotels.map((hotel) => ({ ...hotel, isBooked: false })),
    );
  }

  // oi date range e overlap kora shob booking khuje ber koro
  const conflictingBookings = await bookingModel
    .find({
      checkin: { $lt: checkout },
      checkout: { $gt: checkin },
    })
    .select("hotelId")
    .lean();

  const bookedHotelIds = new Set(
    conflictingBookings.map((booking) => booking.hotelId.toString()),
  );

  const hotelsWithFlag = hotels.map((hotel) => ({
    ...hotel,
    isBooked: bookedHotelIds.has(hotel._id.toString()),
  }));

  return replaceMongoIdInArray(hotelsWithFlag);
}

export async function getHotelById(hotelId) {
  await dbConnect();

  const hotel = await hotelModel.findById(hotelId).lean();

  return hotel ? replaceMongoIdInObject(hotel) : null;
}

export async function getRatingsForAHotel(hotelId) {
  await dbConnect();

  const ratings = await ratingModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(ratings);
}
export async function getReviewsForAHotel(hotelId) {
  await dbConnect();

  const reviews = await reviewModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(reviews);
}
