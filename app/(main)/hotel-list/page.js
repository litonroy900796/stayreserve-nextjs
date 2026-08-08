import HotelList from "@/components/hotel/HotelList";
import Filter from "@/components/search/Filter";
import Search from "@/components/search/Search";
import { Suspense } from "react";

async function HotelsPage({ searchParams }) {
  const params = await searchParams; // Next.js 15+ e searchParams Promise
  const { destination, checkin, checkout } = params;

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
          <Filter />
          <HotelList
            destination={destination}
            checkin={checkin}
            checkout={checkout}
          />
        </div>
      </section>
    </>
  );
}

export default HotelsPage;
