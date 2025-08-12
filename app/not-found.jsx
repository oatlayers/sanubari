// app/not-found.js
"use client";
import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-base-100 flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="card bg-base-200 shadow-md">
          <div className="card-body p-8 text-center">
            <div
              className="bg-primary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <Home className="text-primary" size={28} />
            </div>

            <h1 className="text-base-content mb-2 text-2xl font-semibold">
              Halaman tidak ditemukan
            </h1>

            <p className="text-muted mb-6 text-sm">
              Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            </p>

            <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/" className="btn btn-primary btn-md rounded-full">
                <Home className="mr-2" /> Beranda
              </Link>

              <Link
                href="/properties"
                className="btn btn-ghost btn-md rounded-full"
              >
                <Search className="mr-2" /> Lihat properti
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
