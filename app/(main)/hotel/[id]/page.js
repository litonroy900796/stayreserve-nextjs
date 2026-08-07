import Gallery from '@/components/hotel/details/Gallery';
import Overview from '@/components/hotel/details/Overview';
import Summary from '@/components/hotel/details/Summary';
import { getHotelById } from '@/lib/queries/hotels-query';
import { notFound } from 'next/navigation';

async function HotelDetails({ params }) {
  const { id } = await params;
  const hotelInfo = await getHotelById(id);

  if (!hotelInfo) {
    notFound();
  }

  return (
    <div>
      <Summary hotelInfo={hotelInfo} />
      <Gallery gallery={hotelInfo?.gallery} />
      <Overview overview={hotelInfo?.overview} />
    </div>
  );
}

export default HotelDetails
