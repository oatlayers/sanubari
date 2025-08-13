"use server";

import mongoose from "mongoose";
import connectDB from "@/lib/database";
import Property from "@/models/Property";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

/**
 * Extract Cloudinary public_id (including folder path) from a secure URL.
 * Works for URLs like:
 * https://res.cloudinary.com/<cloud>/image/upload/v123/folder/name.jpg
 * https://res.cloudinary.com/<cloud>/image/upload/c_fill,w_600/v123/folder/name.png
 * @param {string} url
 * @returns {string|null}
 */
function extractPublicIdFromCloudinaryUrl(url) {
  if (typeof url !== "string") return null;
  try {
    const u = new URL(url);
    if (!u.hostname.includes("res.cloudinary.com")) return null;

    // Try to match after /upload/.../v123/ until extension
    const regex = /\/upload\/(?:[^/]+\/)*v\d+\/(.+)\.[a-zA-Z0-9]+(?:\?.*)?$/;
    const match = u.pathname.match(regex);
    if (match && match[1]) return match[1];

    // Fallback: no version segment
    const regexNoVersion = /\/upload\/(.+)\.[a-zA-Z0-9]+(?:\?.*)?$/;
    const match2 = u.pathname.match(regexNoVersion);
    if (match2 && match2[1]) return match2[1];

    return null;
  } catch {
    return null;
  }
}

/**
 * Delete a property and its Cloudinary images.
 * @param {string} propertyId
 */
export default async function deleteProperty(propertyId) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    throw new Error("Invalid Property ID");
  }

  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property Not Found");

  const urls = [];
  if (property.image) urls.push(property.image);
  if (Array.isArray(property.gallery)) urls.push(...property.gallery);

  const publicIds = Array.from(
    new Set(
      urls
        .map((u) => extractPublicIdFromCloudinaryUrl(u))
        .filter((v) => Boolean(v)),
    ),
  );

  for (const id of publicIds) {
    try {
      await cloudinary.uploader.destroy(id, {
        invalidate: true,
        resource_type: "image",
      });
    } catch (err) {
      console.error("Cloudinary destroy failed for", id, err);
    }
  }

  await property.deleteOne();

  try {
    revalidatePath("/");
    revalidatePath("/properties");
  } catch (err) {
    console.error("revalidatePath failed:", err);
  }

  return { success: true };
}
