"use server";
import connectDB from "@/lib/database";
import Property from "@/models/Property";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function addProperty(formData) {
  await connectDB();

  const session = await auth();

  if (!session?.user) {
    throw new Error("Please sign in to add a property");
  }

  const userId = session.user.id || session.user._id;

  if (!userId) {
    throw new Error("User identification failed");
  }

  let savedPropertyId;

  try {
    const rawImages = formData.getAll("images") || [];
    const imageUrls = [];

    for (const item of rawImages) {
      if (typeof item === "string" && item.startsWith("http")) {
        imageUrls.push(item);
      }
    }

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

    const newProperty = new Property(propertyData);
    const savedProperty = await newProperty.save();
    savedPropertyId = savedProperty._id;
    console.log(savedPropertyId);
  } catch (error) {
    console.error("Error saving property:", error.message);
  }

  // redirect(`/properties/${savedPropertyId}`);
}

export default addProperty;
