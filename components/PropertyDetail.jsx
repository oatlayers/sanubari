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
  Calendar,
} from "lucide-react";
import WhatsAppButton from "./WhatsappButton";
import PropertyGallery from "./PropertyGallery";

export default function PropertyDetail({ property }) {
  if (!property) return null;
  const getLink = useParams().id;
  const fullUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${getLink}`;
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
    tahunDibangun,
    air,
  } = property;

  const galleryItems =
    gallery && gallery.length ? gallery : image ? [image] : [];
  const [form, setForm] = useState({ name: "", message: "" });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const formatRupiahUnit = (value) => {
    if (value == null || Number.isNaN(Number(value))) return "-";
    const n = Number(value);

    const juta = 1_000_000;
    const miliar = 1_000_000_000;

    if (n < juta) {
      return n.toLocaleString("id-ID");
    }

    if (n >= miliar) {
      const v = +(n / miliar).toFixed(1);
      return `${v % 1 === 0 ? v.toFixed(0) : v} miliar`;
    }

    const v = +(n / juta).toFixed(1);
    return `${v % 1 === 0 ? v.toFixed(0) : v} juta`;
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-base-content text-3xl font-bold">{namaProperti}</h1>
        <p className="text-base-content/70 text-sm">
          {lokasi.alamatLengkap || "-"}, {lokasi.area || "-"},{" "}
          {lokasi.kota || "-"}, {lokasi.provinsi || "-"}
        </p>
      </div>

      {/* Gallery with PhotoSwipe */}
      <div className="mb-8">
        <PropertyGallery images={galleryItems} />
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {/* Description */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="text-base-content mb-3 text-lg font-semibold">
                Deskripsi
              </h2>
              <p className="text-base-content/80 whitespace-pre-line">
                {deskripsi}
              </p>
            </div>
          </div>

          {/* Specs & Amenities */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
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
                  <Calendar size={18} /> Tahun {tahunDibangun}
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
                  <Banknote size={18} className="flex-shrink-0" />
                  <span className="break-words">
                    Rp {formatRupiahUnit(harga)}
                  </span>
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
          </div>

          {/* Map */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="text-base-content mb-3 text-lg font-semibold">
                Lokasi
              </h2>
              <div className="border-base-300 bg-base-200 h-64 w-full overflow-hidden rounded border">
                <PropertyMap address={lokasi.alamatLengkap} />
              </div>
            </div>
          </div>
        </div>

        {/* Contact card */}
        <aside className="space-y-4">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="text-base-content mb-2 text-lg font-semibold">
                Hubungi Pemilik
              </h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
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
                <WhatsAppButton type="form" form={form} fullUrl={fullUrl} />
              </form>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body text-center">
              <p className="text-base-content/70 text-sm">
                Atau hubungi langsung:
              </p>
              <WhatsAppButton type="direct" fullUrl={fullUrl} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
