import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-modal";
import { reviewModel } from "@/models/review-model";
import { replaceMongoIdInArray } from "@/utils/data-format";

export async function getAllHotels() {
    const hotels = await hotelModel
    .find()
    .select(["thumbNailUrl", "name", "highRate", "lowRate", "city", "propertyCategory"])
    .lean();

    return replaceMongoIdInArray(hotels);
}
export async function getRatingsForAHotel(hotelId){
    const ratings = await ratingModel.find({hotelId: hotelId}).lean();
    return replaceMongoIdInArray(ratings);
}
export async function getReviewsForAHotel(hotelId){
    const reviews = await reviewModel.find({hotelId: hotelId}).lean();
    return replaceMongoIdInArray(reviews);
}