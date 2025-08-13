import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  LandPlot,
  Building,
  Bath,
  DoorClosed,
  ShieldCheck,
  Banknote,
  Droplet,
  Pointer,
  MapPinHouse,
  NotebookPen,
  Calendar,
} from "lucide-react";
import DeleteButton from "./DeleteButton";
import FeatureButton from "./FeatureButton";

const PropertyCard = (props) => {
  const {
    namaProperti = "Unnamed Property",
    deskripsi = "No description available",
    image,
    lokasi = {},
    jumlahKamar = 0,
    jumlahKamarMandi = 0,
    luasTanah = 0,
    tahunDibangun,
    luasBangunan = 0,
    sertifikat = "N/A",
    listrik = "N/A",
    air = "N/A",
    harga = 0,
    featured = false,
    _id = "unknown",
    session,
  } = props;

  const formatRupiahUnit = (value) => {
    if (value == null || Number.isNaN(Number(value))) return "-";
    const n = Number(value);

    const juta = 1_000_000;
    const miliar = 1_000_000_000;

    // < 1 juta: show with regular grouping
    if (n < juta) {
      return n.toLocaleString("id-ID");
    }

    // >= 1 miliar: show in miliar with up to 1 decimal (no trailing .0)
    if (n >= miliar) {
      const v = +(n / miliar).toFixed(1);
      return `${v % 1 === 0 ? v.toFixed(0) : v} miliar`;
    }

    // >= 1 juta and < 1 miliar: show in juta
    const v = +(n / juta).toFixed(1);
    return `${v % 1 === 0 ? v.toFixed(0) : v} juta`;
  };

  return (
    <div className="card bg-base-100 w-auto shadow-sm">
      <figure className="flex max-h-64 w-full items-center justify-center overflow-hidden">
        <Image
          src={
            image ||
            "https://i.pinimg.com/736x/88/a7/c2/88a7c2bfb9494ff7d6c3484be52da172.jpg"
          }
          alt={namaProperti}
          width={500}
          height={500}
          sizes="100vw"
          className="h-auto max-h-64 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <MapPinHouse className="flex-shrink-0" />
          {`${lokasi.area || "-"}, ${lokasi.kota || "-"}`}
        </div>

        <h1 className="card-title">{namaProperti}</h1>
        <p className="text-muted-foreground text-sm">{deskripsi}</p>

        <div className="divider my-0" />

        {/* Responsive grid: 2 cols on small, 3 on md and up */}
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <LandPlot size={18} className="flex-shrink-0" />
            <span>LT {luasTanah} m²</span>
          </div>

          <div className="flex items-center gap-2">
            <Building size={18} className="flex-shrink-0" />
            <span>LB {luasBangunan} m²</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} className="flex-shrink-0" />
            <span>Tahun {tahunDibangun}</span>
          </div>

          <div className="flex items-center gap-2">
            <DoorClosed size={18} className="flex-shrink-0" />
            <span>{jumlahKamar} Kamar Tidur</span>
          </div>

          <div className="flex items-center gap-2">
            <Bath size={18} className="flex-shrink-0" />
            <span>{jumlahKamarMandi} Kamar Mandi</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="flex-shrink-0" />
            <span>{sertifikat}</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap size={18} className="flex-shrink-0" />
            <span>{listrik}</span>
          </div>

          <div className="flex items-center gap-2">
            <Droplet size={18} className="flex-shrink-0" />
            <span>{air}</span>
          </div>

          <div className="flex items-center gap-2">
            <Banknote size={18} className="flex-shrink-0" />
            <span className="break-words">Rp {formatRupiahUnit(harga)}</span>
          </div>
        </div>

        <div className="card-actions mt-4 justify-center">
          {!session && (
            <Link
              href={`/properties/${_id}`}
              className="btn btn-secondary items-center rounded-xl"
            >
              <Pointer />
              Lihat
            </Link>
          )}

          {session && (
            <>
              <Link
                href={`/properties/${_id}`}
                className="btn btn-secondary items-center rounded-xl"
              >
                <Pointer />
                Lihat
              </Link>
              <Link
                href={`/properties/edit/${_id}`}
                className="btn btn-primary items-center rounded-xl"
              >
                <NotebookPen />
                Edit
              </Link>

              <FeatureButton
                propertyId={_id.toString()}
                isFeatured={featured}
              />

              <DeleteButton
                propertyId={_id.toString()}
                propertyName={namaProperti}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
