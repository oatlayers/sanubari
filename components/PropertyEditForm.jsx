"use client";

import React from "react";
import updateProperty from "@/app/actions/updateProperty";

const PropertyEditForm = ({ property }) => {
  const action = updateProperty.bind(null, property._id);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Edit Properti</h1>

      <form className="space-y-6" action={action}>
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
              className="input input-bordered w-full"
              placeholder="Contoh: Rumah Mewah di Jakarta"
              defaultValue={property.namaProperti}
            />
          </div>

          <div>
            <label
              htmlFor="mainImages"
              className="mb-1 block text-sm font-medium"
            >
              Gambar Utama (upload to replace)
            </label>
            <input
              id="mainImages"
              type="file"
              name="images"
              accept="image/*"
              multiple
              className="file-input file-input-bordered w-full"
            />
            <p className="mt-1 text-xs text-gray-500">
              Biarkan kosong untuk mempertahankan gambar yang ada.
            </p>
          </div>
        </div>

        {/* Gallery Upload */}
        <div>
          <label
            htmlFor="galleryImages"
            className="mb-1 block text-sm font-medium"
          >
            Galeri Foto (tambahkan untuk mengganti/menambah)
          </label>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500">
            <p className="mb-2 text-sm text-gray-500">
              Silakan klik untuk memilih gambar
            </p>
            <input
              id="galleryImages"
              type="file"
              name="images"
              accept="image/*"
              multiple
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        {/* Video */}
        <div>
          <label htmlFor="video" className="mb-1 block text-sm font-medium">
            URL Video YouTube
          </label>
          <input
            id="video"
            name="video"
            type="url"
            pattern="https?://(www\.)?(youtube\.com|youtu\.be)/.+"
            className="input input-bordered w-full"
            placeholder="https://youtube.com/watch?v=xxxx"
            defaultValue={property.video || ""}
          />
        </div>

        {/* Lokasi */}
        <fieldset className="rounded-md border border-gray-300 p-4">
          <legend className="text-lg font-medium">Lokasi</legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              id="area"
              name="area"
              required
              placeholder="Area"
              className="input input-bordered w-full"
              defaultValue={property.lokasi?.area || ""}
            />
            <input
              id="kota"
              name="kota"
              required
              placeholder="Kota"
              className="input input-bordered w-full"
              defaultValue={property.lokasi?.kota || ""}
            />
            <input
              id="provinsi"
              name="provinsi"
              required
              placeholder="Provinsi"
              className="input input-bordered w-full"
              defaultValue={property.lokasi?.provinsi || ""}
            />
            <input
              id="alamatLengkap"
              name="alamatLengkap"
              required
              placeholder="Alamat Lengkap"
              className="input input-bordered w-full md:col-span-2"
              defaultValue={property.lokasi?.alamatLengkap || ""}
            />
          </div>
        </fieldset>

        {/* Detail Properti */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            id="jumlahKamar"
            name="jumlahKamar"
            type="number"
            required
            min="1"
            placeholder="Jumlah Kamar"
            className="input input-bordered w-full"
            defaultValue={property.jumlahKamar || 1}
          />
          <input
            id="jumlahKamarMandi"
            name="jumlahKamarMandi"
            type="number"
            required
            min="1"
            placeholder="Jumlah Kamar Mandi"
            className="input input-bordered w-full"
            defaultValue={property.jumlahKamarMandi || 1}
          />
          <input
            id="jumlahLantai"
            name="jumlahLantai"
            type="number"
            required
            min="1"
            placeholder="Jumlah Lantai"
            className="input input-bordered w-full"
            defaultValue={property.jumlahLantai || 1}
          />
          <input
            id="luasTanah"
            name="luasTanah"
            type="number"
            min="1"
            required
            placeholder="Luas Tanah (m²)"
            className="input input-bordered w-full"
            defaultValue={property.luasTanah || 1}
          />
          <input
            id="luasBangunan"
            name="luasBangunan"
            type="number"
            required
            min="1"
            placeholder="Luas Bangunan (m²)"
            className="input input-bordered w-full"
            defaultValue={property.luasBangunan || 1}
          />
          <input
            id="tahunDibangun"
            name="tahunDibangun"
            type="number"
            required
            min="1"
            placeholder="Tahun Dibangun"
            className="input input-bordered w-full"
            defaultValue={property.tahunDibangun || ""}
          />
          <input
            id="sertifikat"
            name="sertifikat"
            required
            placeholder="Sertifikat"
            className="input input-bordered w-full"
            defaultValue={property.sertifikat || ""}
          />
          <input
            id="arahBangunan"
            name="arahBangunan"
            required
            placeholder="Arah Bangunan"
            className="input input-bordered w-full"
            defaultValue={property.arahBangunan || ""}
          />
          <input
            id="listrik"
            name="listrik"
            required
            min="1"
            placeholder="Listrik"
            className="input input-bordered w-full"
            defaultValue={property.listrik || ""}
          />
          <input
            id="air"
            name="air"
            required
            placeholder="Air"
            className="input input-bordered w-full"
            defaultValue={property.air || ""}
          />
        </div>

        {/* Harga */}
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
            className="input input-bordered w-full"
            placeholder="Contoh: 2500000000"
            defaultValue={property.harga || 0}
          />
        </div>

        {/* Tipe Properti & Listing */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <select
            id="tipeProperti"
            name="tipeProperti"
            required
            className="select select-bordered w-full"
            defaultValue={property.tipeProperti || ""}
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
            className="select select-bordered w-full"
            defaultValue={property.tipeListing || ""}
          >
            <option value="">Pilih Tipe Listing</option>
            <option value="Dijual">Dijual</option>
            <option value="Disewa">Disewa</option>
          </select>
          <select
            id="status"
            name="status"
            defaultValue={property.status || "Tersedia"}
            className="select select-bordered w-full"
          >
            <option value="Tersedia">Tersedia</option>
            <option value="Terjual">Terjual</option>
            <option value="Disewa">Disewa</option>
          </select>
        </div>

        {/* Furnished */}
        <select
          id="furnished"
          name="furnished"
          required
          className="select select-bordered w-full"
          defaultValue={property.furnished || ""}
        >
          <option value="">Pilih Furnishing</option>
          <option value="Unfurnished">Unfurnished</option>
          <option value="Semi Furnished">Semi Furnished</option>
          <option value="Fully Furnished">Fully Furnished</option>
        </select>

        {/* Deskripsi */}
        <textarea
          id="deskripsi"
          name="deskripsi"
          required
          rows="4"
          placeholder="Deskripsi Properti"
          className="textarea textarea-bordered w-full"
          defaultValue={property.deskripsi || ""}
        />

        {/* Fasilitas */}
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
            ].map((facility) => {
              const checked =
                Array.isArray(property.fasilitas) &&
                property.fasilitas.includes(facility);
              return (
                <label key={facility} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="fasilitas"
                    value={facility}
                    className="checkbox"
                    defaultChecked={checked}
                  />
                  <span className="text-sm">{facility}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary rounded-full">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyEditForm;
