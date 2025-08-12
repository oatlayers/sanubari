import SignOutButton from "@/components/SignOutButton";
import { SquarePen, FilePenLine } from "lucide-react";
import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PropertyActions() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <div className="bg-base-200 flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        <Link href="/properties/add" passHref>
          <button className="btn btn-primary w-64 rounded-full">
            <SquarePen />
            Tambah Properti
          </button>
        </Link>
        <Link href="/properties" passHref>
          <button className="btn btn-secondary w-64 rounded-full">
            <FilePenLine />
            Edit Properti
          </button>
        </Link>

        <SignOutButton />
      </div>
    </div>
  );
}
