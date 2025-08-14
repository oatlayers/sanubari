import React from "react";
import PropertyCard from "./PropertyCard";
import connectDB from "@/lib/database";
import Property from "@/models/Property";

const RecentProperties = async () => {
  await connectDB();

  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  return (
    <div className="grid grid-cols-1 items-stretch gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
      {recentProperties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        recentProperties.map((property) => (
          <PropertyCard key={property._id} {...property} />
        ))
      )}
    </div>
  );
};

export default RecentProperties;
