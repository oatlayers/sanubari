/* PropertyAddForm.jsx */
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function PropertyAddForm() {
  const formRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);

    // Grab file entries for images
    const fileEntries = formData.getAll("images").filter((f) => f && f.name);

    try {
      setUploading(true);

      const uploadedUrls = [];

      if (fileEntries.length > 0) {
        // Get signature from your server (same as you had)
        const sigRes = await fetch("/api/cloudinary-signature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder: "sanubari" }),
        });

        if (!sigRes.ok) {
          throw new Error("Failed to get upload signature");
        }

        const sigJson = await sigRes.json();
        const { signature, timestamp, folder, api_key } = sigJson;

        if (!signature || !timestamp) {
          throw new Error("Invalid signature response");
        }

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        if (!cloudName) throw new Error("Missing Cloudinary cloud name");

        for (const file of fileEntries) {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("api_key", api_key);
          fd.append("timestamp", timestamp);
          fd.append("signature", signature);
          fd.append("folder", folder);

          const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
            {
              method: "POST",
              body: fd,
            },
          );

          if (!uploadRes.ok) {
            const txt = await uploadRes.text().catch(() => "");
            throw new Error("Cloudinary upload failed: " + txt);
          }

          const uploadJson = await uploadRes.json();
          if (!uploadJson.secure_url)
            throw new Error("No secure_url from Cloudinary");

          uploadedUrls.push(uploadJson.secure_url);
        }
      }

      // Build a plain object payload from the form fields
      const payload = {
        namaProperti: formData.get("namaProperti") || "",
        images: uploadedUrls, // first is main image, rest are gallery
        video: formData.get("video") || "",
        lokasi: {
          area: formData.get("area") || "",
          kota: formData.get("kota") || "",
          provinsi: formData.get("provinsi") || "",
          alamatLengkap: formData.get("alamatLengkap") || "",
        },
        jumlahKamar: Number(formData.get("jumlahKamar") || 1),
        jumlahKamarMandi: Number(formData.get("jumlahKamarMandi") || 1),
        jumlahLantai: Number(formData.get("jumlahLantai") || 1),
        luasTanah: Number(formData.get("luasTanah") || 1),
        luasBangunan: Number(formData.get("luasBangunan") || 1),
        tahunDibangun: Number(
          formData.get("tahunDibangun") || new Date().getFullYear(),
        ),
        sertifikat: formData.get("sertifikat") || "",
        arahBangunan: formData.get("arahBangunan") || "",
        listrik: formData.get("listrik") || "",
        air: formData.get("air") || "",
        harga: Number(formData.get("harga") || 1),
        mataUang: "IDR",
        tipeProperti: formData.get("tipeProperti") || "",
        tipeListing: formData.get("tipeListing") || "",
        status: formData.get("status") || "Tersedia",
        furnished: formData.get("furnished") || "",
        deskripsi: formData.get("deskripsi") || "",
        fasilitas: formData.getAll("fasilitas") || [],
      };

      // POST JSON to your API route
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error("Save failed: " + txt);
      }

      const json = await res.json();
      if (!json?.id) {
        throw new Error("Missing response id");
      }

      // Go to property page
      router.push(`/properties/${json.id}`);
    } catch (error) {
      console.error("❌ Upload/save failed:", error);
      alert("Upload/save failed: " + (error.message || error));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Tambah Properti Baru</h1>

      <form
        ref={formRef}
        className="space-y-6"
        onSubmit={handleSubmit}
        aria-busy={uploading}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="namaProperti"
              className="mb-1 block text-sm font-medium"
            >
              Nama Properti *
            </label>
            <input
              id="namaProperti"
              name="namaProperti"
              required
              disabled={uploading}
              className="input input-bordered w-full"
              placeholder="Contoh: Rumah Mewah di Jakarta"
            />
          </div>

          <div>
            <label
              htmlFor="mainImages"
              className="mb-1 block text-sm font-medium"
            >
              Gambar Utama *
            </label>
            <input
              id="mainImages"
              type="file"
              name="images"
              accept="image/*"
              multiple
              required
              disabled={uploading}
              className="file-input file-input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="galleryImages"
            className="mb-1 block text-sm font-medium"
          >
            Galeri Foto
          </label>
          <div
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500 ${uploading ? "pointer-events-none opacity-60" : ""}`}
          >
            <p className="mb-2 text-sm text-gray-500">
              Silakan klik untuk memilih gambar
            </p>
            <input
              id="galleryImages"
              type="file"
              name="images"
              accept="image/*"
              multiple
              disabled={uploading}
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        <div>
          <label htmlFor="video" className="mb-1 block text-sm font-medium">
            URL Video YouTube
          </label>
          <input
            id="video"
            name="video"
            type="url"
            pattern="https?://(www\.)?(youtube\.com|youtu\.be)/.+"
            disabled={uploading}
            className="input input-bordered w-full"
            placeholder="https://youtube.com/watch?v=xxxx"
          />
        </div>

        <fieldset
          className="rounded-md border border-gray-300 p-4"
          disabled={uploading}
        >
          <legend className="text-lg font-medium">Lokasi</legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              id="area"
              name="area"
              required
              placeholder="Area"
              className="input input-bordered w-full"
            />
            <input
              id="kota"
              name="kota"
              required
              placeholder="Kota"
              className="input input-bordered w-full"
            />
            <input
              id="provinsi"
              name="provinsi"
              required
              placeholder="Provinsi"
              className="input input-bordered w-full"
            />
            <input
              id="alamatLengkap"
              name="alamatLengkap"
              required
              placeholder="Alamat Lengkap"
              className="input input-bordered w-full md:col-span-2"
            />
          </div>
        </fieldset>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            id="jumlahKamar"
            name="jumlahKamar"
            type="number"
            required
            min="1"
            placeholder="Jumlah Kamar"
            disabled={uploading}
            className="input input-bordered w-full"
          />
          <input
            id="jumlahKamarMandi"
            name="jumlahKamarMandi"
            type="number"
            required
            min="1"
            placeholder="Jumlah Kamar Mandi"
            disabled={uploading}
            className="input input-bordered w-full"
          />
          <input
            id="jumlahLantai"
            name="jumlahLantai"
            type="number"
            required
            min="1"
            placeholder="Jumlah Lantai"
            disabled={uploading}
            className="input input-bordered w-full"
          />
          <input
            id="luasTanah"
            name="luasTanah"
            type="number"
            min="1"
            required
            placeholder="Luas Tanah (m²)"
            disabled={uploading}
            className="input input-bordered w-full"
          />
          <input
            id="luasBangunan"
            name="luasBangunan"
            type="number"
            required
            min="1"
            placeholder="Luas Bangunan (m²)"
            disabled={uploading}
            className="input input-bordered w-full"
          />
          <input
            id="tahunDibangun"
            name="tahunDibangun"
            type="number"
            required
            min="1"
            placeholder="Tahun Dibangun"
            disabled={uploading}
            className="input input-bordered w-full"
          />
          <input
            id="sertifikat"
            name="sertifikat"
            required
            placeholder="Sertifikat"
            disabled={uploading}
            className="input input-bordered w-full"
          />
          <input
            id="arahBangunan"
            name="arahBangunan"
            required
            placeholder="Arah Bangunan"
            disabled={uploading}
            className="input input-bordered w-full"
          />
          <input
            id="listrik"
            name="listrik"
            required
            min="1"
            placeholder="Listrik"
            disabled={uploading}
            className="input input-bordered w-full"
          />
          <input
            id="air"
            name="air"
            required
            placeholder="Air"
            disabled={uploading}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="harga" className="mb-1 block text-sm font-medium">
            Harga (IDR) *
          </label>
          <input
            id="harga"
            name="harga"
            type="number"
            min="1"
            required
            disabled={uploading}
            className="input input-bordered w-full"
            placeholder="Contoh: 2500000000"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <select
            id="tipeProperti"
            name="tipeProperti"
            required
            disabled={uploading}
            className="select select-bordered w-full"
          >
            <option value="">Pilih Tipe Properti</option>
            <option value="Rumah">Rumah</option>
            <option value="Rumah Mewah">Rumah Mewah</option>
            <option value="Apartemen">Apartemen</option>
            <option value="Villa">Villa</option>
            <option value="Ruko">Ruko</option>
          </select>
          <select
            id="tipeListing"
            name="tipeListing"
            required
            disabled={uploading}
            className="select select-bordered w-full"
          >
            <option value="">Pilih Tipe Listing</option>
            <option value="Dijual">Dijual</option>
            <option value="Disewa">Disewa</option>
          </select>
          <select
            id="status"
            name="status"
            defaultValue="Tersedia"
            disabled={uploading}
            className="select select-bordered w-full"
          >
            <option value="Tersedia">Tersedia</option>
            <option value="Terjual">Terjual</option>
            <option value="Disewa">Disewa</option>
          </select>
        </div>

        <select
          id="furnished"
          name="furnished"
          required
          disabled={uploading}
          className="select select-bordered w-full"
        >
          <option value="">Pilih Furnishing</option>
          <option value="Unfurnished">Unfurnished</option>
          <option value="Semi Furnished">Semi Furnished</option>
          <option value="Fully Furnished">Fully Furnished</option>
        </select>

        <textarea
          id="deskripsi"
          name="deskripsi"
          required
          rows="4"
          placeholder="Deskripsi Properti"
          disabled={uploading}
          className="textarea textarea-bordered w-full"
        />

        <div>
          <label className="mb-1 block text-sm font-medium">Fasilitas</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {[
              "Kolam Renang",
              "WiFi",
              "Hot Tub",
              "AC",
              "Dishwasher",
              "Microwave",
              "Lift",
              "TV",
              "Garasi Luas",
              "Keamanan 24 Jam",
              "Taman Pribadi",
              "Gym",
              "Ruang Home Theater",
              "Taman Belakang",
              "Rooftop Garden",
              "Garasi 4 Mobil",
              "Garasi",
              "Taman",
            ].map((facility) => (
              <label key={facility} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="fasilitas"
                  value={facility}
                  disabled={uploading}
                  className="checkbox"
                />
                <span className="text-sm">{facility}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`btn btn-primary rounded-full ${uploading ? "opacity-80" : ""}`}
            disabled={uploading}
            aria-disabled={uploading}
          >
            {uploading ? "⏳ Menambah Properti..." : "Tambah Properti"}
          </button>
        </div>
      </form>
    </div>
  );
}
