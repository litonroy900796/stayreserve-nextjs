import HotelList from "@/components/hotel/HotelList";
import Filter from "@/components/search/Filter";
import Search from "@/components/search/Search";
import { getAllAmenities } from "@/lib/queries/hotels-query";
import { Suspense } from "react";

async function HotelsPage({ searchParams }) {
  const params = (await searchParams) ?? {}; // Next.js 15+ e searchParams Promise
  const { destination, checkin, checkout, sort, price, stars, amenities } =
    params;

  const amenityOptions = await getAllAmenities();

  return (
    <>
      <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
        <div className="container items-center py-12 ">
          <Suspense fallback={null}>
            <Search fromList={true} />
          </Suspense>
        </div>
      </section>
      <section className="py-12">
        <div className="container grid grid-cols-12">
          <Filter amenityOptions={amenityOptions} />
          <HotelList
            destination={destination}
            checkin={checkin}
            checkout={checkout}
            sort={sort}
            price={price}
            stars={stars}
            amenities={amenities}
          />
        </div>
      </section>
    </>
  );
}

export default HotelsPage;
