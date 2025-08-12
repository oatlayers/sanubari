import React from "react";
import Hero from "../components/Hero";
import Homepage from "../components/Homepage";
import connectDB from "@/lib/database";
import Property from "@/models/Property";
import { auth } from "@/auth"; // Import auth here

const fetchFeaturedProperties = async () => {
  await connectDB();
  const properties = await Property.find({ featured: true }).lean();
  const plainProperties = properties.map((property) => ({
    ...property,
    _id: property._id.toString(),
  }));
  return plainProperties;
};

const Home = async () => {
  // Fetch both data and session on the server
  const featuredProperties = await fetchFeaturedProperties();
  const session = await auth();

  return (
    <>
      <Hero />
      {/* Pass both down to the Homepage component */}
      <Homepage featuredProperties={featuredProperties} session={session} />
    </>
  );
};

export default Home;
