"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/" })}
      className="btn btn-neutral w-64 rounded-full"
    >
      <LogOut />
      Sign Out
    </button>
  );
};

export default SignOutButton;
