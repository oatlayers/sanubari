import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    // --- Core Property Details ---
    namaProperti: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    gallery: {
      type: [String], // Array of strings
      default: undefined, // This ensures an empty array is not saved as default
    },
    video: {
      type: String,
    },
    lokasi: {
      area: { type: String, required: true },
      kota: { type: String, required: true },
      provinsi: { type: String, required: true },
      alamatLengkap: { type: String, required: true },
    },
    jumlahKamar: {
      type: Number,
      required: true,
    },
    jumlahKamarMandi: {
      type: Number,
      required: true,
    },
    jumlahLantai: {
      type: Number,
      required: true,
    },
    luasTanah: {
      type: Number, // in square meters
      required: true,
    },
    luasBangunan: {
      type: Number, // in square meters
      required: true,
    },
    tahunDibangun: {
      type: Number,
      required: true,
    },
    sertifikat: {
      type: String,
      required: true,
    },
    furnished: {
      type: String,
      required: true,
      enum: ["Unfurnished", "Semi Furnished", "Fully Furnished"],
    },
    arahBangunan: {
      type: String,
      required: true,
    },
    listrik: {
      type: String, // e.g., "6600 VA"
      required: true,
    },
    air: {
      type: String, // e.g., "PAM", "Sumur Bor"
      required: true,
    },
    harga: {
      type: Number, // Stored as a number (e.g., 25000000000)
      required: true,
    },
    mataUang: {
      type: String,
      required: true,
      default: "IDR",
    },
    tipeProperti: {
      type: String,
      required: true,
    },
    tipeListing: {
      type: String,
      required: true,
      enum: ["Dijual", "Disewa"],
    },
    deskripsi: {
      type: String,
      required: true,
    },
    fasilitas: {
      type: [String], // Array of strings
      default: undefined,
    },
    status: {
      type: String,
      required: true,
      enum: ["Tersedia", "Terjual", "Disewa"],
      default: "Tersedia",
    },

    // --- Featured Property Flag ---
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    // --- Timestamps Configuration ---
    timestamps: true,
  },
);

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
