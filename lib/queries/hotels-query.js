import { dbConnect } from "@/lib/dbConnect";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-modal";
import { reviewModel } from "@/models/review-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-format";

export async function getAllHotels() {
    await dbConnect();

    const hotels = await hotelModel
    .find()
    .select(["thumbNailUrl", "name", "highRate", "lowRate", "city", "propertyCategory"])
    .lean();

    return replaceMongoIdInArray(hotels);
}

export async function getHotelById(hotelId) {
    await dbConnect();

    const hotel = await hotelModel.findById(hotelId).lean();

    return hotel ? replaceMongoIdInObject(hotel) : null;
}

export async function getRatingsForAHotel(hotelId){
    await dbConnect();

    const ratings = await ratingModel.find({hotelId: hotelId}).lean();
    return replaceMongoIdInArray(ratings);
}
export async function getReviewsForAHotel(hotelId){
    await dbConnect();

    const reviews = await reviewModel.find({hotelId: hotelId}).lean();
    return replaceMongoIdInArray(reviews);
}