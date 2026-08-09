"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const PRICE_RANGES = [
  { id: "range1", label: "$ 13 - $ 30", min: 13, max: 30 },
  { id: "range2", label: "$ 30 - $ 60", min: 30, max: 60 },
  { id: "range3", label: "$ 60 - $ 97", min: 60, max: 97 },
  { id: "range4", label: "$ 97 - $ 152", min: 97, max: 152 },
  { id: "range5", label: "$ 182+", min: 182, max: null },
];

const STAR_OPTIONS = [
  { id: "fiveStar", label: "5 Star", value: "5" },
  { id: "fourStar", label: "4 Star", value: "4" },
  { id: "threeStar", label: "3 Star", value: "3" },
  { id: "twoStar", label: "2 Star", value: "2" },
  { id: "oneStar", label: "1 Star", value: "1" },
];

const Filter = ({ amenityOptions = [] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sort") || "";
  const selectedPrices =
    searchParams.get("price")?.split(",").filter(Boolean) || [];
  const selectedStars =
    searchParams.get("stars")?.split(",").filter(Boolean) || [];
  const selectedAmenities =
    searchParams.get("amenities")?.split(",").filter(Boolean) || [];

  const updateParams = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const toggleMultiValue = useCallback(
    (key, id, currentValues) => {
      const next = currentValues.includes(id)
        ? currentValues.filter((v) => v !== id)
        : [...currentValues, id];
      updateParams(key, next.join(","));
    },
    [updateParams],
  );

  return (
    <div className="col-span-3 space-y-4">
      <div>
        <h3 className="font-bold text-lg">Sort By</h3>
        <div className="flex flex-col gap-2 mt-2">
          <label htmlFor="highToLow">
            <input
              type="radio"
              id="highToLow"
              name="sortBy"
              checked={sortBy === "highToLow"}
              onChange={() => updateParams("sort", "highToLow")}
            />{" "}
            Price High to Low
          </label>

          <label htmlFor="lowToHigh">
            <input
              type="radio"
              id="lowToHigh"
              name="sortBy"
              checked={sortBy === "lowToHigh"}
              onChange={() => updateParams("sort", "lowToHigh")}
            />{" "}
            Price Low to high
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg">Price Range</h3>
        <div className="flex flex-col gap-2 mt-2">
          {PRICE_RANGES.map((range) => (
            <label key={range.id} htmlFor={range.id}>
              <input
                type="checkbox"
                id={range.id}
                checked={selectedPrices.includes(range.id)}
                onChange={() =>
                  toggleMultiValue("price", range.id, selectedPrices)
                }
              />{" "}
              {range.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg">Star Category</h3>
        <div className="flex flex-col gap-2 mt-2">
          {STAR_OPTIONS.map((star) => (
            <label key={star.id} htmlFor={star.id}>
              <input
                type="checkbox"
                id={star.id}
                checked={selectedStars.includes(star.value)}
                onChange={() =>
                  toggleMultiValue("stars", star.value, selectedStars)
                }
              />{" "}
              {star.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg">Amenities</h3>
        <div className="flex flex-col gap-2 mt-2">
          {amenityOptions.length === 0 && (
            <p className="text-sm text-gray-400">No amenities found</p>
          )}
          {amenityOptions.map((amenity) => (
            <label key={amenity.id} htmlFor={amenity.id}>
              <input
                type="checkbox"
                id={amenity.id}
                checked={selectedAmenities.includes(amenity.id)}
                onChange={() =>
                  toggleMultiValue("amenities", amenity.id, selectedAmenities)
                }
              />{" "}
              {amenity.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
