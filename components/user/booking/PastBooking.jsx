const PastBooking = ({ bookings = [] }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Past Bookings</h3>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-sm border border-[#CCCCCC]/60 rounded-lg p-6 text-center">
          You have no past bookings.
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-[#CCCCCC]/60 rounded-lg p-4 opacity-80"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">
                    {booking.hotel?.name || "Hotel"}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {booking.checkin} — {booking.checkout} ({booking.nights}{" "}
                    night{booking.nights > 1 ? "s" : ""})
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
                  Completed
                </span>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#CCCCCC]/40">
                <span className="text-sm text-gray-500">Total Paid</span>
                <span className="font-semibold">${booking.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastBooking;
