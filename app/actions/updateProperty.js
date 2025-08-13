// app/actions/updateProperty.js
"use server";

import connectDB from "@/lib/database";
import Property from "@/models/Property";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";

/**
 * Upload a File from FormData to Cloudinary.
 * @param {File} file
 * @returns {Promise<any>}
 */
async function uploadFileToCloudinary(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "sanubari",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    stream.end(buffer);
  });
}

/**
 * Collect new image URLs from FormData (strings or Files).
 * @param {FormData} formData
 * @returns {Promise<string[]>}
 */
async function collectNewImageUrls(formData) {
  const entries = formData.getAll("images") || [];
  const urls = [];

  for (const entry of entries) {
    if (!entry) continue;

    if (typeof entry === "string") {
      if (entry.startsWith("http")) {
        urls.push(entry);
      }
      continue;
    }

    if (typeof entry === "object" && typeof entry.arrayBuffer === "function") {
      if (entry.size && entry.size > 0) {
        const uploaded = await uploadFileToCloudinary(entry);
        if (uploaded?.secure_url) {
          urls.push(uploaded.secure_url);
        }
      }
    }
  }

  return urls;
}

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

  const existing = await Property.findById(propertyId).lean();
  if (!existing) {
    throw new Error("Property not found");
  }

  const amenities = formData.getAll("fasilitas") || [];

  const propertyData = {
    namaProperti: formData.get("namaProperti") || "",
    video: formData.get("video") || "",
    lokasi: {
      area: formData.get("area") || "",
      kota: formData.get("kota") || "",
      provinsi: formData.get("provinsi") || "",
      alamatLengkap: formData.get("alamatLengkap") || "",
    },
    jumlahKamar: parseInt(formData.get("jumlahKamar") || "1", 10) || 1,
    jumlahKamarMandi:
      parseInt(formData.get("jumlahKamarMandi") || "1", 10) || 1,
    jumlahLantai: parseInt(formData.get("jumlahLantai") || "1", 10) || 1,
    luasTanah: parseInt(formData.get("luasTanah") || "1", 10) || 1,
    luasBangunan: parseInt(formData.get("luasBangunan") || "1", 10) || 1,
    tahunDibangun:
      parseInt(formData.get("tahunDibangun") || "", 10) ||
      new Date().getFullYear(),
    sertifikat: formData.get("sertifikat") || "",
    arahBangunan: formData.get("arahBangunan") || "",
    listrik: formData.get("listrik") || "",
    air: formData.get("air") || "",
    harga: parseInt(formData.get("harga") || "1", 10) || 1,
    mataUang: "IDR",
    tipeProperti: formData.get("tipeProperti") || "",
    tipeListing: formData.get("tipeListing") || "",
    status: formData.get("status") || "Tersedia",
    furnished: formData.get("furnished") || "",
    deskripsi: formData.get("deskripsi") || "",
    fasilitas: amenities,
  };

  // New images (URLs or Files)
  const newUrls = await collectNewImageUrls(formData);
  const replaceMain = formData.get("replaceMain") === "1";

  if (newUrls.length === 0) {
    // No new images: preserve existing
    propertyData.image = existing.image || "";
    propertyData.gallery = Array.isArray(existing.gallery)
      ? existing.gallery
      : [];
  } else {
    if (replaceMain) {
      // Replace main with the first new, append rest to gallery
      const first = newUrls[0] || "";
      const rest = newUrls.slice(1);
      propertyData.image = first || existing.image || "";
      propertyData.gallery = [
        ...(Array.isArray(existing.gallery) ? existing.gallery : []),
        ...rest,
      ];
    } else {
      // Only add to gallery; keep main unchanged
      propertyData.image = existing.image || "";
      propertyData.gallery = [
        ...(Array.isArray(existing.gallery) ? existing.gallery : []),
        ...newUrls,
      ];
    }
  }

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    { $set: propertyData },
    { new: true },
  );

  if (!updatedProperty) {
    throw new Error("Failed to update property");
  }

  try {
    revalidatePath("/");
    revalidatePath("/properties");
    revalidatePath(`/properties/${updatedProperty._id}`);
  } catch (err) {
    console.error("revalidatePath failed:", err);
  }

  redirect(`/properties/${updatedProperty._id}`);
}
