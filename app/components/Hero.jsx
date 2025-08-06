import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero mb-6">
      <div className="hero-content mt-14 text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Temukan Rumah Impian di Jogja 🏙️
          </h1>
          <p className="py-6">
            Banyak pilihan properti, proses mudah, dan terpercaya. Temukan rumah
            Anda hari ini!
          </p>
          <Link href={"/properties"} className="btn btn-primary rounded-full">
            Cari Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
