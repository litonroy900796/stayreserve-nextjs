import HotelSummaryInfo from "../HotelSummaryInfo";

const Summary = ({ hotelInfo, searchId, checkin, checkout }) => {
  return (
    <section className="py-4 mt-[100px] ">
      <div className="flex container">
        <HotelSummaryInfo
          info={hotelInfo}
          fromListPage={false}
          searchId={searchId}
          checkin={checkin}
          checkout={checkout}
        />
      </div>
    </section>
  );
};

export default Summary;

