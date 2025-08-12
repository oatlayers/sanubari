import React from "react";
import FeaturedProperties from "./FeaturedProperties";
import RecentProperties from "./RecentProperties";
import Link from "next/link";

// Accept session as a prop
const Homepage = ({ featuredProperties, session }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="text-base-content text-center text-3xl">
        Properti Unggulan
      </div>
      {/* Pass both properties and session down */}
      <FeaturedProperties properties={featuredProperties} session={session} />
      <div className="text-base-content text-center text-3xl">
        Properti Terbaru
      </div>
      <RecentProperties />
      <Link
        href="/properties"
        className="btn btn-primary btn-wide mb-8 self-center rounded-full"
      >
        Lihat Semua Properti
      </Link>
    </div>
  );
};

export default Homepage;
