import React from "react";
import PropertyCard from "../../components/PropertyCard";
import connectDB from "@/lib/database";
import Property from "@/models/Property";
import PaginationClient from "@/components/PaginationClient";
import { auth } from "@/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

const toIntDefault = (v, d) => {
  const n = parseInt(v ?? String(d), 10);
  return Number.isNaN(n) || n < 1 ? d : n;
};

const Properties = async ({ searchParams }) => {
  await connectDB();

  const params = await searchParams;

  const page = toIntDefault(params?.page, 1);
  const limit = toIntDefault(params?.limit, 9);
  const skip = (page - 1) * limit;

  const total = await Property.countDocuments();
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const properties = await Property.find().skip(skip).limit(limit).lean();
  const props = properties.map((p) => ({ ...p, _id: p._id.toString() }));

  // fetch session so we can show admin controls client-side
  const session = await auth();

  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, start + 4);
  start = Math.max(1, end - 4);

  return (
    <div className="min-h-screen p-10">
      {session && (
        <div className="flex flex-row items-center justify-center">
          <Link className="btn btn-primary mb-6 rounded-full" href={"/owner"}>
            {" "}
            Kembali ke halaman pemilik
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {!props || props.length === 0 ? (
          <div>There are no properties</div>
        ) : (
          props.map((property) => (
            <PropertyCard key={property._id} {...property} session={session} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center">
          <PaginationClient
            page={page}
            limit={limit}
            totalPages={totalPages}
            start={start}
            end={end}
          />
        </div>
      )}
    </div>
  );
};

export default Properties;
