import { getAllHotels } from "@/lib/queries/hotels-query";
import HotelCard from "./HotelCard";

const HotelList = async ({ destination, checkin, checkout, sort, price, stars, amenities }) => {
  const hotels = await getAllHotels({ destination, checkin, checkout, sort, price, stars, amenities });

  return (
    <div className="col-span-9">
      <div className="space-y-4">
        {hotels.length === 0 ? (
          <p className="text-center py-10 text-gray-500">
            কোনো হোটেল পাওয়া যায়নি এই সার্চের জন্য।
          </p>
        ) : (
          hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} destination={destination} checkin={checkin} checkout={checkout} />)
        )}
      </div>
    </div>
  );
};

export default HotelList;
