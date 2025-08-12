// app/loading.js
"use client";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-base-100 flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="animate-spin text-pink-500" size={48} />
        <span className="text-sm text-gray-500">Memuat…</span>
      </div>
    </div>
  );
}
