// app/api/properties/route.js
import connectDB from "@/lib/database";
import Property from "@/models/Property";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "Please sign in to add a property" },
      { status: 401 },
    );
  }

  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const userId = session.user.id || session.user._id;
  if (!userId) {
    return NextResponse.json(
      { error: "User identification failed" },
      { status: 400 },
    );
  }

  const images = Array.isArray(payload.images) ? payload.images : [];

  const propertyData = {
    namaProperti: payload.namaProperti || "",
    image: images[0] || "",
    gallery: images.slice(1),
    video: payload.video || "",
    lokasi: {
      area: payload.lokasi?.area || "",
      kota: payload.lokasi?.kota || "",
      provinsi: payload.lokasi?.provinsi || "",
      alamatLengkap: payload.lokasi?.alamatLengkap || "",
    },
    jumlahKamar: Number(payload.jumlahKamar) || 1,
    jumlahKamarMandi: Number(payload.jumlahKamarMandi) || 1,
    jumlahLantai: Number(payload.jumlahLantai) || 1,
    luasTanah: Number(payload.luasTanah) || 1,
    luasBangunan: Number(payload.luasBangunan) || 1,
    tahunDibangun: Number(payload.tahunDibangun) || new Date().getFullYear(),
    sertifikat: payload.sertifikat || "",
    arahBangunan: payload.arahBangunan || "",
    listrik: payload.listrik || "",
    air: payload.air || "",
    harga: Number(payload.harga) || 1,
    mataUang: "IDR",
    tipeProperti: payload.tipeProperti || "",
    tipeListing: payload.tipeListing || "",
    status: payload.status || "Tersedia",
    furnished: payload.furnished || "",
    deskripsi: payload.deskripsi || "",
    fasilitas: Array.isArray(payload.fasilitas) ? payload.fasilitas : [],
  };

  try {
    const newProperty = new Property(propertyData);
    const savedProperty = await newProperty.save();

    // Attempt to revalidate relevant pages (non-fatal)
    try {
      revalidatePath("/");
      revalidatePath("/properties");
      revalidatePath(`/properties/${savedProperty._id}`);
    } catch (err) {
      console.error("revalidatePath failed:", err);
    }

    return NextResponse.json({ id: savedProperty._id }, { status: 201 });
  } catch (err) {
    console.error("Property save error:", err);
    return NextResponse.json(
      { error: "Property save failed", details: err.message },
      { status: 500 },
    );
  }
}
