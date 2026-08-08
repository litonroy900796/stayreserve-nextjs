import Link from "next/link";
import HotelRating from "./HotelRating";
import HotelReview from "./HotelReview";


const HotelSummaryInfo = ({
  info,
  fromListPage,
  searchId,
  checkin,
  checkout,
}) => {
  console.log("searchParams", searchId);
  return (
    <>
      <div className={fromListPage ? "flex-1" : "flex-1 container"}>
        <h2
          className={fromListPage ? "font-bold text-lg" : "font-bold text-2xl"}
        >
          {info?.name}
        </h2>
        <p>📍 {info?.city}</p>
        <div className="flex gap-2 items-center my-4">
          <HotelRating hotelId={info?.id} />
          <HotelReview hotelId={info?.id} />
        </div>
        <div>
          <span className="bg-yellow-300 p-1 rounded-md">
            {info?.propertyCategory} Star Property
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end justify-center">
        <h2 className="text-2xl font-bold text-right">
          ${info?.lowRate}/night
        </h2>
        <p className=" text-right">Per Night for 1 Room</p>
        {fromListPage ? (
          <Link
            href={`/hotel/${info?.name}?searchId=${info?.id}&checkin=${checkin}&checkout=${checkout}`}
            className="btn-primary "
          >
            Details
          </Link>
        ) : (
          <Link
            href={`/hotel-checkout?property_id=${info?.id}&checkin=${checkin}&checkout=${checkout}`}
            className="btn-primary "
          >
            Book
          </Link>
        )}
      </div>
    </>
  );
};

export default HotelSummaryInfo;
