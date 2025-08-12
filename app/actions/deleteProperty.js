"use server";

import mongoose from "mongoose";
import connectDB from "@/lib/database";
import Property from "@/models/Property";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

/**
 * Delete a property and its Cloudinary images.
 * @param {string} propertyId
 */
export default async function deleteProperty(propertyId) {
  await connectDB();

  // Validate
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    throw new Error("Invalid Property ID");
  }

  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property Not Found");

  // Collect image URLs from main image and gallery
  const urls = [];
  if (property.image) urls.push(property.image);
  if (Array.isArray(property.gallery)) urls.push(...property.gallery);

  // Helper to extract public_id (supports folder 'propertypulse' if present,
  // otherwise falls back to last path segment without extension)
  const extractPublicId = (url) => {
    if (!url || typeof url !== "string") return null;
    try {
      const folder = "/propertypulse/";
      const idx = url.indexOf(folder);
      if (idx !== -1) {
        const after = url.slice(idx + folder.length);
        return after.split(".")[0].split("/")[0];
      }
      // fallback: last segment without extension
      const parts = url.split("/");
      const last = parts.at(-1);
      return last ? last.split(".")[0] : null;
    } catch (err) {
      return null;
    }
  };

  const publicIds = Array.from(
    new Set(urls.map((u) => extractPublicId(u)).filter(Boolean)),
  );

  // Destroy images on Cloudinary if they look like Cloudinary uploads
  for (const id of publicIds) {
    try {
      // If you used a folder name, include it; here we assume folder 'propertypulse'
      await cloudinary.uploader.destroy(`propertypulse/${id}`, {
        invalidate: true,
        resource_type: "image",
      });
    } catch (err) {
      // don't fail entire operation for one destroy; log and continue
      console.error("Cloudinary destroy failed for", id, err);
    }
  }

  // Remove property from DB
  await property.deleteOne();

  // Revalidate the main listing page (adjust path if needed)
  try {
    revalidatePath("/");
  } catch (err) {
    // revalidation failure should not crash the delete flow
    console.error("revalidatePath failed:", err);
  }

  return { success: true };
}
