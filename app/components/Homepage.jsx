import React from "react";
import FeaturedProperties from "./FeaturedProperties";
import RecentProperties from "./RecentProperties";
import Link from "next/link";

const Homepage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="text-base-content text-center text-3xl">
        Properti Unggulan
      </div>
      <FeaturedProperties />
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
