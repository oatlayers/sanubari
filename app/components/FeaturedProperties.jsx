import React from "react";
import PropertyCard from "./PropertyCard";

const FeaturedProperties = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 md:flex-row">
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
    </div>
  );
};

export default FeaturedProperties;
