"use client";

import { useActionState } from "react";
import { addProperty } from "@/app/actions/propertyActions";

const initialState = {
  message: "",
};

export default function PropertyAddForm() {
  const [state, formAction, isPending] = useActionState(
    addProperty,
    initialState,
  );

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Add New Property</h1>

      <form action={formAction} className="space-y-6">
        {/* Core Property Details */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="namaProperti"
              className="mb-1 block text-sm font-medium"
            >
              Property Name *
            </label>
            <input
              id="namaProperti"
              name="namaProperti"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="image" className="mb-1 block text-sm font-medium">
              Main Image URL *
            </label>
            <input
              id="image"
              name="image"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Gallery Images
          </label>
          <div id="gallery-container">
            <input
              name="gallery"
              className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="https://example.com/gallery1.jpg"
            />
          </div>
          <button
            type="button"
            id="add-gallery"
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            + Add another image
          </button>
        </div>

        <div>
          <label htmlFor="video" className="mb-1 block text-sm font-medium">
            Video URL
          </label>
          <input
            id="video"
            name="video"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="https://example.com/video.mp4"
          />
        </div>

        {/* Location Section */}
        <fieldset className="rounded-md border border-gray-300 p-4">
          <legend className="text-lg font-medium">Location</legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="area" className="mb-1 block text-sm font-medium">
                Area *
              </label>
              <input
                id="area"
                name="area"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="kota" className="mb-1 block text-sm font-medium">
                City *
              </label>
              <input
                id="kota"
                name="kota"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="provinsi"
                className="mb-1 block text-sm font-medium"
              >
                Province *
              </label>
              <input
                id="provinsi"
                name="provinsi"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="alamatLengkap"
                className="mb-1 block text-sm font-medium"
              >
                Full Address *
              </label>
              <input
                id="alamatLengkap"
                name="alamatLengkap"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        </fieldset>

        {/* Property Details */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="jumlahKamar"
              className="mb-1 block text-sm font-medium"
            >
              Bedrooms *
            </label>
            <input
              id="jumlahKamar"
              name="jumlahKamar"
              type="number"
              min="1"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="jumlahKamarMandi"
              className="mb-1 block text-sm font-medium"
            >
              Bathrooms *
            </label>
            <input
              id="jumlahKamarMandi"
              name="jumlahKamarMandi"
              type="number"
              min="1"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="jumlahLantai"
              className="mb-1 block text-sm font-medium"
            >
              Floors *
            </label>
            <input
              id="jumlahLantai"
              name="jumlahLantai"
              type="number"
              min="1"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="luasTanah"
              className="mb-1 block text-sm font-medium"
            >
              Land Area (m²) *
            </label>
            <input
              id="luasTanah"
              name="luasTanah"
              type="number"
              min="1"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="luasBangunan"
              className="mb-1 block text-sm font-medium"
            >
              Building Area (m²) *
            </label>
            <input
              id="luasBangunan"
              name="luasBangunan"
              type="number"
              min="1"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="tahunDibangun"
              className="mb-1 block text-sm font-medium"
            >
              Year Built *
            </label>
            <input
              id="tahunDibangun"
              name="tahunDibangun"
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="sertifikat"
              className="mb-1 block text-sm font-medium"
            >
              Certificate *
            </label>
            <input
              id="sertifikat"
              name="sertifikat"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="arahBangunan"
              className="mb-1 block text-sm font-medium"
            >
              Building Orientation *
            </label>
            <input
              id="arahBangunan"
              name="arahBangunan"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="listrik" className="mb-1 block text-sm font-medium">
              Electricity *
            </label>
            <input
              id="listrik"
              name="listrik"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="e.g., 6600 VA"
            />
          </div>
          <div>
            <label htmlFor="air" className="mb-1 block text-sm font-medium">
              Water Source *
            </label>
            <input
              id="air"
              name="air"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="e.g., PAM"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="harga" className="mb-1 block text-sm font-medium">
              Price *
            </label>
            <input
              id="harga"
              name="harga"
              type="number"
              min="1"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="mataUang"
              className="mb-1 block text-sm font-medium"
            >
              Currency
            </label>
            <select
              id="mataUang"
              name="mataUang"
              defaultValue="IDR"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="IDR">IDR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>

        {/* Property Type and Listing */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="tipeProperti"
              className="mb-1 block text-sm font-medium"
            >
              Property Type *
            </label>
            <select
              id="tipeProperti"
              name="tipeProperti"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">Select Type</option>
              <option value="Rumah Mewah">Luxury House</option>
              <option value="Apartemen">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Ruko">Shophouse</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="tipeListing"
              className="mb-1 block text-sm font-medium"
            >
              Listing Type *
            </label>
            <select
              id="tipeListing"
              name="tipeListing"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">Select Listing</option>
              <option value="Dijual">For Sale</option>
              <option value="Disewa">For Rent</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="mb-1 block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue="Tersedia"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="Tersedia">Available</option>
              <option value="Terjual">Sold</option>
              <option value="Disewa">Rented</option>
            </select>
          </div>
        </div>

        {/* Furnishing */}
        <div>
          <label htmlFor="furnished" className="mb-1 block text-sm font-medium">
            Furnishing *
          </label>
          <select
            id="furnished"
            name="furnished"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Select Furnishing</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="deskripsi" className="mb-1 block text-sm font-medium">
            Description *
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            required
            rows="4"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          ></textarea>
        </div>

        {/* Facilities */}
        <div>
          <label className="mb-1 block text-sm font-medium">Facilities</label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {[
              "Kolam Renang",
              "Garasi Luas",
              "Keamanan 24 Jam",
              "Taman Pribadi",
              "Gym",
              "Ruang Home Theater",
              "Taman Belakang",
              "Sauna",
              "Rooftop Garden",
              "Garasi 4 Mobil",
              "Garasi",
              "Taman",
            ].map((facility) => (
              <div key={facility} className="flex items-center">
                <input
                  id={`fasilitas-${facility}`}
                  name="fasilitas"
                  type="checkbox"
                  value={facility}
                  className="mr-2"
                />
                <label htmlFor={`fasilitas-${facility}`} className="text-sm">
                  {facility}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {state?.message && (
          <div className="rounded-md bg-red-50 p-3 text-red-600">
            {state.message}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Add Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
