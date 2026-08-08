"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const destinations = [
  "Puglia",
  "Catania",
  "London",
  "Portsmouth",
  "Palermo",
  "Frejus",
  "Paris",
  "Calvi",
  "Cergy",
  "Saint-Denis",
  "Le Pré-Saint-Gervais",

];

// helper: date কে YYYY-MM-DD ফরম্যাটে convert করবে
const formatDate = (date) => date.toISOString().split("T")[0];

const getDefaultCheckin = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return formatDate(date);
};

const getDefaultCheckout = (checkinStr) => {
  const date = checkinStr ? new Date(checkinStr) : new Date();
  date.setDate(date.getDate() + 1);
  return formatDate(date);
};

const Search = ({ fromList }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("destination") || destinations[0],
  );
  const [checkin, setCheckin] = useState(
    searchParams.get("checkin") || getDefaultCheckin(),
  );
  const [checkout, setCheckout] = useState(
    searchParams.get("checkout") ||
      getDefaultCheckout(searchParams.get("checkin") || getDefaultCheckin()),
  );

  const handleCheckinChange = (e) => {
    const newCheckin = e.target.value;
    setCheckin(newCheckin);

    // checkin change hole checkout jodi checkin er age or same hoy, auto next day set hobe
    if (!checkout || checkout <= newCheckin) {
      setCheckout(getDefaultCheckout(newCheckin));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);

    const url = `/hotel-list?${params.toString()}`;

    if (fromList) {
      router.replace(url);
    } else {
      router.push(url);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="lg:max-h-62.5 mt-6">
        <div id="searchParams" className={fromList && "!shadow-none"}>
          <div>
            <span>Destination</span>
            <h4 className="mt-2">
              <select
                name="destination"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </h4>
          </div>

          <div>
            <span>Check in</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkin"
                id="checkin"
                value={checkin}
                min={formatDate(new Date())}
                onChange={handleCheckinChange}
                required
              />
            </h4>
          </div>

          <div>
            <span>Checkout</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkout"
                id="checkout"
                value={checkout}
                min={checkin || formatDate(new Date())}
                onChange={(e) => setCheckout(e.target.value)}
                required
              />
            </h4>
          </div>
        </div>
      </div>

      <button type="submit" className="search-btn">
        🔍️ {fromList ? "Modify Search" : "Search"}
      </button>
    </form>
  );
};

export default Search;
