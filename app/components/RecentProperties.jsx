import React from "react";
import PropertyCard from "./PropertyCard";

const RecentProperties = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 md:flex-row">
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
    </div>
  );
};

export default RecentProperties;
