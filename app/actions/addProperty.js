"use server";

import connectDB from "@/lib/database";
import Property from "@/models/Property";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";

const CLOUDINARY_UPLOAD_FOLDER =
  process.env.CLOUDINARY_UPLOAD_FOLDER || "sanubari";

/**
 * Upload a File from FormData to Cloudinary.
 * Returns the Cloudinary upload result (secure_url, public_id, etc).
 * @param {File} file
 * @returns {Promise<any>}
 */
async function uploadFileToCloudinary(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: CLOUDINARY_UPLOAD_FOLDER,
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
 * Collect image URLs from FormData. Accepts:
 * - Already uploaded http(s) URLs (strings), OR
 * - File objects to be uploaded to Cloudinary here.
 * Returns ordered array of secure URLs.
 * @param {FormData} formData
 * @returns {Promise<string[]>}
 */
async function collectImageUrls(formData) {
  const entries = formData.getAll("images") || [];
  const urls = [];

  for (const entry of entries) {
    if (!entry) continue;

    // If string URL
    if (typeof entry === "string") {
      if (entry.startsWith("http")) {
        urls.push(entry);
      }
      continue;
    }

    // If File object (from input type="file")
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

export default async function addProperty(formData) {
  await connectDB();

  const session = await auth();
  if (!session?.user) {
    throw new Error("Please sign in to add a property");
  }

  const userId = session.user.id || session.user._id;
  if (!userId) {
    throw new Error("User identification failed");
  }

  // Gather images (URLs or Files)
  const imageUrls = await collectImageUrls(formData);

  // Gather amenities
  const amenities = formData.getAll("fasilitas") || [];

  const propertyData = {
    namaProperti: formData.get("namaProperti") || "",
    image: imageUrls[0] || "",
    gallery: imageUrls.slice(1),
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

  const newProperty = new Property(propertyData);
  const savedProperty = await newProperty.save();

  // Revalidate listings and redirect to detail page
  try {
    revalidatePath("/");
    revalidatePath("/properties");
    revalidatePath(`/properties/${savedProperty._id}`);
  } catch (err) {
    // Non-fatal
    console.error("revalidatePath failed:", err);
  }

  redirect(`/properties/${savedProperty._id}`);
}
