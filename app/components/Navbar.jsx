import React from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" href={"/"}>
          Sanubari Property
        </Link>
      </div>

      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
