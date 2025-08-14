import React from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link
          className="btn btn-ghost flex items-center gap-2 text-xl"
          href={"/"}
        >
          <Image
            src="/images/logo.jpg"
            alt="Sanubari Property Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <span>Sanubari Property</span>
        </Link>
      </div>

      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
