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
    <div className="card bg-base-100 flex h-full w-full flex-col shadow-sm">
      {/* Image container with fixed height and enforced fill */}
      <figure className="bg-base-200 h-56 min-h-[14rem] w-full overflow-hidden">
        <Image
          src={
            image ||
            "https://i.pinimg.com/736x/88/a7/c2/88a7c2bfb9494ff7d6c3484be52da172.jpg"
          }
          alt={namaProperti}
          width={500}
          height={500}
          sizes="100vw"
          className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </figure>

      {/* Card body fills remaining space */}
      <div className="card-body flex flex-grow flex-col">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <MapPinHouse className="flex-shrink-0" />
          {`${lokasi.area || "-"}, ${lokasi.kota || "-"}`}
        </div>

        <h1 className="card-title">{namaProperti}</h1>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {deskripsi}
        </p>

        <div className="divider my-0" />

        {/* Property details */}
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
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
            <Banknote size={18} /> Rp {formatRupiahUnit(harga)}
          </div>
        </div>

        {/* Push buttons to bottom */}
        <div className="card-actions mt-auto justify-center">
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
