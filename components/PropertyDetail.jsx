"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import PropertyMap from "./PropertyMap";
import {
  Zap,
  LandPlot,
  Building,
  Bath,
  DoorClosed,
  ShieldCheck,
  Banknote,
  Droplet,
} from "lucide-react";
import WhatsAppButton from "./WhatsappButton";

export default function PropertyDetail({ property }) {
  if (!property) return null;

  const getLink = useParams().id;
  const fullUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties${getLink}`;
  const {
    namaProperti,
    lokasi = {},
    deskripsi,
    image,
    gallery = [],
    fasilitas = [],
    jumlahKamar,
    jumlahKamarMandi,
    luasBangunan,
    luasTanah,
    harga,
    sertifikat,
    listrik,
    air,
  } = property;

  const galleryItems =
    gallery && gallery.length ? gallery : image ? [image] : [];
  const [active, setActive] = useState(0);
  const [form, setForm] = useState({ name: "", message: "" });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-base-content text-3xl font-bold">{namaProperti}</h1>
        <p className="text-base-content/70">
          {lokasi.alamatLengkap || "-"}, {lokasi.area || "-"},{" "}
          {lokasi.kota || "-"}, {lokasi.provinsi || "-"}
        </p>
      </div>

      {/* Gallery */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2">
          <div className="bg-base-200 relative h-80 overflow-hidden rounded-lg">
            {galleryItems[active] ? (
              <img
                src={galleryItems[active]}
                alt={`Image ${active + 1}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-base-content/50 flex h-full w-full items-center justify-center">
                No image
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {galleryItems.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`overflow-hidden rounded-md border ${
                i === active ? "border-primary" : "border-base-300"
              }`}
            >
              <img
                src={src}
                alt={`thumb ${i + 1}`}
                className="h-20 w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {/* Description */}
          <div className="bg-base-100 rounded-lg p-6 shadow">
            <h2 className="text-base-content mb-3 text-lg font-semibold">
              Deskripsi
            </h2>
            <p className="text-base-content/80 whitespace-pre-line">
              {deskripsi}
            </p>
          </div>

          {/* Specs & Amenities */}
          <div className="bg-base-100 rounded-lg p-6 shadow">
            <h2 className="text-base-content mb-3 text-lg font-semibold">
              Detail Properti
            </h2>
            <div className="text-base-content/80 grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="flex items-center gap-2">
                <LandPlot size={18} /> LT {luasTanah} m²
              </div>
              <div className="flex items-center gap-2">
                <Building size={18} /> LB {luasBangunan} m²
              </div>
              <div className="flex items-center gap-2">
                <DoorClosed size={18} /> {jumlahKamar} Kamar Tidur
              </div>
              <div className="flex items-center gap-2">
                <Bath size={18} /> {jumlahKamarMandi} Kamar Mandi
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} /> {sertifikat}
              </div>
              <div className="flex items-center gap-2">
                <Zap size={18} /> {listrik}
              </div>
              <div className="flex items-center gap-2">
                <Droplet size={18} /> {air}
              </div>
              <div className="flex items-center gap-2">
                <Banknote size={18} /> Rp {harga.toLocaleString()}
              </div>
            </div>

            {fasilitas && fasilitas.length > 0 && (
              <>
                <h3 className="text-base-content mt-4 mb-2 text-lg font-semibold">
                  Fasilitas
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {fasilitas.map((f, i) => (
                    <li
                      key={i}
                      className="bg-base-200 text-base-content/80 rounded px-3 py-1 text-sm"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Map */}
          <div className="bg-base-100 rounded-lg p-6 shadow">
            <h2 className="text-base-content mb-3 text-lg font-semibold">
              Lokasi
            </h2>
            <div className="bg-base-200 text-base-content/50 h-64 w-full rounded text-center">
              <PropertyMap address={lokasi.alamatLengkap} />
            </div>
          </div>
        </div>

        {/* Contact card */}
        <aside className="space-y-4">
          <div className="bg-base-100 rounded-lg p-6 shadow">
            <h3 className="text-base-content mb-2 text-lg font-semibold">
              Hubungi Pemilik
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-3"
            >
              <input
                type="text"
                name="name"
                placeholder="Nama Anda"
                value={form.name}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
              <textarea
                name="message"
                placeholder="Pesan Anda"
                value={form.message}
                onChange={handleChange}
                required
                rows={3}
                className="textarea textarea-bordered w-full"
              />
              <WhatsAppButton />
            </form>
          </div>
          <div className="bg-base-100 rounded-lg p-6 text-center shadow">
            <p className="text-base-content/70 text-sm">
              Atau hubungi langsung:
            </p>
            <WhatsAppButton fullUrl={fullUrl} />
          </div>
        </aside>
      </div>
    </div>
  );
}
