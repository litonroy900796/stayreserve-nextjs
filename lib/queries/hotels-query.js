import mongoose from "mongoose";
import { dbConnect } from "@/lib/dbConnect";
import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-modal";
import { reviewModel } from "@/models/review-model";
import { amenityModel } from "@/models/amenity-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-format";

export async function getAllHotels({
  destination,
  checkin,
  checkout,
  sort,
  price,
  stars,
  amenities,
} = {}) {
  await dbConnect();

  const normalizedDestination = Array.isArray(destination)
    ? destination[0]
    : destination;

  const query = {};
  if (normalizedDestination && normalizedDestination !== "all") {
    query.city = { $regex: normalizedDestination.trim(), $options: "i" };
  }

  // Star category filter (checkbox theke asha comma-separated string, e.g. "5,4")
  if (stars) {
    const starValues = (Array.isArray(stars) ? stars[0] : stars)
      .split(",")
      .filter(Boolean)
      .map(Number);

    if (starValues.length) {
      query.propertyCategory = { $in: starValues };
    }
  }

  // amenities filter part update
  if (amenities) {
    const amenityIds = (Array.isArray(amenities) ? amenities[0] : amenities)
      .split(",")
      .filter(Boolean)
      .filter((id) => mongoose.Types.ObjectId.isValid(id))
      .map((id) => new mongoose.Types.ObjectId(id));

    if (amenityIds.length) {
     query.amenities = { $in: amenityIds };
    }
  }

  // Price range filter (comma-separated range ids, e.g. "range1,range3")
  if (price) {
    const priceIds = (Array.isArray(price) ? price[0] : price)
      .split(",")
      .filter(Boolean);

    const PRICE_RANGES = {
      range1: { min: 13, max: 30 },
      range2: { min: 30, max: 60 },
      range3: { min: 60, max: 97 },
      range4: { min: 97, max: 152 },
      range5: { min: 182, max: null },
    };

    const priceConditions = priceIds
      .map((id) => PRICE_RANGES[id])
      .filter(Boolean)
      .map(({ min, max }) =>
        max
          ? { lowRate: { $gte: min, $lte: max } }
          : { lowRate: { $gte: min } },
      );

    if (priceConditions.length) {
      query.$or = priceConditions;
    }
  }

  let hotelsQuery = hotelModel
    .find(query)
    .select([
      "thumbNailUrl",
      "name",
      "highRate",
      "lowRate",
      "city",
      "propertyCategory",
      "amenities",
    ]);

  // Sort by price
  const normalizedSort = Array.isArray(sort) ? sort[0] : sort;
  if (normalizedSort === "highToLow") {
    hotelsQuery = hotelsQuery.sort({ lowRate: -1 });
  } else if (normalizedSort === "lowToHigh") {
    hotelsQuery = hotelsQuery.sort({ lowRate: 1 });
  }

  const hotels = await hotelsQuery.lean();

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
export async function getBookingById(id) {
  await dbConnect();
  const booking = await bookingModel.findById(id).lean();
  return booking ? JSON.parse(JSON.stringify(booking)) : null;
}

export async function getAllAmenities() {
  await dbConnect();
  const amenities = await amenityModel.find().select(["name"]).lean();
  return replaceMongoIdInArray(amenities);
}