"use server";

import Property from "@/models/Property";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Helper function to convert FormData to property object
function formDataToProperty(formData) {
  const facilities = formData.getAll("fasilitas");
  const gallery = formData.getAll("gallery");

  return {
    namaProperti: formData.get("namaProperti"),
    image: formData.get("image"),
    gallery: gallery.filter((url) => url !== ""),
    video: formData.get("video") || undefined,
    lokasi: {
      area: formData.get("area"),
      kota: formData.get("kota"),
      provinsi: formData.get("provinsi"),
      alamatLengkap: formData.get("alamatLengkap"),
    },
    jumlahKamar: parseInt(formData.get("jumlahKamar")),
    jumlahKamarMandi: parseInt(formData.get("jumlahKamarMandi")),
    jumlahLantai: parseInt(formData.get("jumlahLantai")),
    luasTanah: parseInt(formData.get("luasTanah")),
    luasBangunan: parseInt(formData.get("luasBangunan")),
    tahunDibangun: parseInt(formData.get("tahunDibangun")),
    sertifikat: formData.get("sertifikat"),
    furnished: formData.get("furnished"),
    arahBangunan: formData.get("arahBangunan"),
    listrik: formData.get("listrik"),
    air: formData.get("air"),
    harga: parseInt(formData.get("harga")),
    mataUang: formData.get("mataUang") || "IDR",
    tipeProperti: formData.get("tipeProperti"),
    tipeListing: formData.get("tipeListing"),
    deskripsi: formData.get("deskripsi"),
    fasilitas: facilities.filter((f) => f !== ""),
    status: formData.get("status") || "Tersedia",
  };
}

export async function addProperty(prevState, formData) {
  try {
    // Convert form data to property object
    const propertyData = formDataToProperty(formData);

    // Here you would typically save to database
    // For this example, we'll just log the data
    console.log("Property to be saved:", propertyData);

    // In a real application, you would do:
    // await Property.create(propertyData);

    // Revalidate the properties page to show the new property
    revalidatePath("/properties");

    // Redirect to properties page after successful creation
    redirect("/properties");
  } catch (error) {
    console.error("Error creating property:", error);
    return {
      message: "Failed to create property",
      error: error.message,
    };
  }
}
