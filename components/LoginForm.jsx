"use client";

import { signIn } from "next-auth/react";

const LoginForm = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Login sebagai pemilik</h2>
        <p>Silakan login menggunakan akun Google melalui tombol dibawah.</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary mt-4 w-xs rounded-full"
            onClick={() => signIn("google", { redirectTo: "/owner" })}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
