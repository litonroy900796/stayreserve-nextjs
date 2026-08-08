import Gallery from '@/components/hotel/details/Gallery';
import Overview from '@/components/hotel/details/Overview';
import Summary from '@/components/hotel/details/Summary';
import { getHotelById } from '@/lib/queries/hotels-query';
import { notFound } from 'next/navigation';

async function HotelDetails({ searchParams }) {
  const { searchId,checkin,checkout } = await searchParams;
  const hotelInfo = await getHotelById(searchId);
  
  if (!hotelInfo) {
    notFound();
  }

  return (
    <div>
      <Summary
        hotelInfo={hotelInfo}
        searchId={searchId}
        checkin={checkin}
        checkout={checkout}
      />
      <Gallery gallery={hotelInfo?.gallery} />
      <Overview overview={hotelInfo?.overview} />
    </div>
  );
}

export default HotelDetails
