// app/actions/updateProperty.js
"use server";

import connectDB from "@/lib/database";
import Property from "@/models/Property";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateProperty(propertyId, formData) {
  await connectDB();

  const session = await auth();
  if (!session?.user) {
    throw new Error("Please sign in to update a property");
  }

  const userId = session.user?.id || session.user?._id;
  if (!userId) {
    throw new Error("User identification failed");
  }

  // Gather image entries (string URLs). Client should upload files to Cloudinary
  // and then append the returned secure URLs as "images" fields.
  const rawImages = formData.getAll("images") || [];
  const imageUrls = [];

  for (const entry of rawImages) {
    if (!entry) continue;
    if (typeof entry === "string" && entry.startsWith("http")) {
      imageUrls.push(entry);
    }
    // ignore non-http strings or file objects; your client should send URLs
  }

  const amenities = formData.getAll("fasilitas") || [];

  // Build update object (fields to set)
  const propertyData = {
    namaProperti: formData.get("namaProperti") || "",
    video: formData.get("video") || "",
    lokasi: {
      area: formData.get("area") || "",
      kota: formData.get("kota") || "",
      provinsi: formData.get("provinsi") || "",
      alamatLengkap: formData.get("alamatLengkap") || "",
    },
    jumlahKamar: parseInt(formData.get("jumlahKamar")) || 1,
    jumlahKamarMandi: parseInt(formData.get("jumlahKamarMandi")) || 1,
    jumlahLantai: parseInt(formData.get("jumlahLantai")) || 1,
    luasTanah: parseInt(formData.get("luasTanah")) || 1,
    luasBangunan: parseInt(formData.get("luasBangunan")) || 1,
    tahunDibangun:
      parseInt(formData.get("tahunDibangun")) || new Date().getFullYear(),
    sertifikat: formData.get("sertifikat") || "",
    arahBangunan: formData.get("arahBangunan") || "",
    listrik: formData.get("listrik") || "",
    air: formData.get("air") || "",
    harga: parseInt(formData.get("harga")) || 1,
    mataUang: "IDR",
    tipeProperti: formData.get("tipeProperti") || "",
    tipeListing: formData.get("tipeListing") || "",
    status: formData.get("status") || "Tersedia",
    furnished: formData.get("furnished") || "",
    deskripsi: formData.get("deskripsi") || "",
    fasilitas: amenities,
  };

  // Find existing property to preserve images when client didn't send new ones
  const existing = await Property.findById(propertyId).lean();
  if (!existing) {
    throw new Error("Property not found");
  }

  if (imageUrls.length > 0) {
    // Replace images: first URL is main image, rest are gallery
    propertyData.image = imageUrls[0] || "";
    propertyData.gallery = imageUrls.slice(1);
  } else {
    // Preserve existing images if the client didn't submit new URLs
    propertyData.image = existing.image || "";
    propertyData.gallery = existing.gallery || [];
  }

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    { $set: propertyData },
    { new: true },
  );

  if (!updatedProperty) {
    throw new Error("Failed to update property");
  }

  // Revalidate homepage and redirect to updated property
  revalidatePath("/");
  redirect(`/properties/${updatedProperty._id}`);
}
