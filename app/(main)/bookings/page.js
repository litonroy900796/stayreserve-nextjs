import { auth } from "@/auth";
import { dbConnect } from "@/lib/dbConnect";

import { getHotelById } from "@/lib/queries/hotels-query";
import PastBooking from "@/components/user/booking/PastBooking";
import UpcomingBooking from "@/components/user/booking/UpcomingBooking";
import ProfileInfo from "@/components/user/ProfileInfo";
import { bookingModel } from "@/models/booking-model";
import { userModel } from "@/models/user-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-format";

async function getUserByEmail(email) {
  if (!email) return null;

  const user = await userModel.findOne({ email }).lean();
  return user ? replaceMongoIdInObject(user) : null;
}

async function getAllBookings(userId) {
  if (!userId) {
    return [];
  }

  const bookings = await bookingModel
    .find({ userId })
    .sort({ checkin: -1 })
    .lean();

  return replaceMongoIdInArray(bookings);
}

async function attachHotelInfo(bookings) {
  return Promise.all(
    bookings.map(async (booking) => ({
      ...booking,
      hotel: await getHotelById(booking.hotelId),
    })),
  );
}

function BookingPage() {
  return (
    <>
      <section className="mt-[100px]">
        <div className="container">
          <ProfileInfo />
        </div>
      </section>
      <section>
        <div className="container">
          <BookingLists />
        </div>
      </section>
    </>
  );
}

async function BookingLists() {
  await dbConnect();
  const session = await auth();

  if (!session?.user) {
    return (
      <p className="text-center text-gray-500 py-12">
        Please login to view your bookings.
      </p>
    );
  }

  const loggedInUser = await getUserByEmail(session.user.email);
  const allBookings = await getAllBookings(loggedInUser?.id);

  const today = new Date().toISOString().split("T")[0];
  const past = allBookings.filter((b) => b.checkout < today);
  const upcoming = allBookings.filter((b) => b.checkout >= today);

  if (!allBookings.length) {
    return (
      <div className="py-8 text-center text-gray-500">
        No bookings found for this account yet.
      </div>
    );
  }

  const [pastWithHotel, upcomingWithHotel] = await Promise.all([
    attachHotelInfo(past),
    attachHotelInfo(upcoming),
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <PastBooking bookings={pastWithHotel} />
      <UpcomingBooking bookings={upcomingWithHotel} />
    </div>
  );
}

export default BookingPage;
