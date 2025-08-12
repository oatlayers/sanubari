import React from "react";
import PropertyCard from "./PropertyCard";
import connectDB from "@/lib/database";
import Property from "@/models/Property";

// Make the component asynchronous to allow for data fetching
const RecentProperties = async () => {
  // Establish a connection to the database
  await connectDB();

  // Query the database for the 4 most recent properties
  // .sort({ createdAt: -1 }) orders them from newest to oldest
  // .limit(4) retrieves only the top four results
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 md:flex-row">
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
