"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PaymentForm = ({
  session,
  checkin,
  checkout,
  hotel,
  nights,
  totalPrice,
}) => {
  const router = useRouter();
  const { user } = session || {};
  console.log("hotel", hotel);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    checkin: checkin || "",
    checkout: checkout || "",
    card: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email) {
      setError("Name and email are required.");
      return;
    }
    if (!formData.card || !formData.expiry || !formData.cvv) {
      setError("Please fill in all card details.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelId: hotel?.id,
          checkin: formData.checkin,
          checkout: formData.checkout,
          nights,
          totalPrice,
          guestName: formData.name,
          guestEmail: formData.email,
          card: formData.card,
          expiry: formData.expiry,
          cvv: formData.cvv,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Booking failed. Please try again.");
        setLoading(false);
        return;
      }

      router.push(`/booking-confirmation/${data.booking._id}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form className="my-8" onSubmit={handleSubmit}>
      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-2 mb-4">
          {error}
        </p>
      )}

      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={handleChange}
          name="name"
          id="name"
          required
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <span>Check in</span>
        <h4 className="mt-2">
          <input
            type="date"
            value={formData.checkin}
            onChange={handleChange}
            name="checkin"
            id="checkin"
            required
          />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <span>Checkout</span>
        <h4 className="mt-2">
          <input
            type="date"
            value={formData.checkout}
            onChange={handleChange}
            name="checkout"
            id="checkout"
            required
          />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="card" className="block">
          Card Number
        </label>
        <input
          type="text"
          id="card"
          name="card"
          value={formData.card}
          onChange={handleChange}
          maxLength={19}
          placeholder="1234 5678 9012 3456"
          required
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="expiry" className="block">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiry"
          name="expiry"
          value={formData.expiry}
          onChange={handleChange}
          placeholder="MM/YY"
          maxLength={5}
          required
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="cvv" className="block">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          maxLength={4}
          required
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Processing..." : `Pay Now ($${totalPrice || 10})`}
      </button>
    </form>
  );
};

export default PaymentForm;
