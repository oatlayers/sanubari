// /components/FeaturedProperties.js
"use client";
import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Accept session as a prop
const FeaturedProperties = ({ properties, session }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const PROPERTIES_PER_PAGE = 3;

  // ... rest of the component logic is the same ...
  if (!properties || properties.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>Saat ini tidak ada properti unggulan.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(properties.length / PROPERTIES_PER_PAGE);
  const startIndex = currentPage * PROPERTIES_PER_PAGE;
  const endIndex = startIndex + PROPERTIES_PER_PAGE;
  const currentProperties = properties.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="flex w-full items-center justify-center gap-4 p-6">
      {properties.length > PROPERTIES_PER_PAGE && (
        <button onClick={handlePrev} className="btn btn-circle btn-ghost">
          <ChevronLeft />
        </button>
      )}

      <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
        {currentProperties.map((property) => (
          <PropertyCard
            key={property._id}
            {...property} // Spread all property details
            session={session} // Pass the session down
          />
        ))}
      </div>

      {properties.length > PROPERTIES_PER_PAGE && (
        <button onClick={handleNext} className="btn btn-circle btn-ghost">
          <ChevronRight />
        </button>
      )}
    </div>
  );
};

export default FeaturedProperties;
