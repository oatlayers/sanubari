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
} from "lucide-react";

const PropertyCard = (props) => {
  const {
    namaProperti = "Unnamed Property",
    deskripsi = "No description available",
    image,
    lokasi = {},
    jumlahKamar = 0,
    jumlahKamarMandi = 0,
    luasTanah = 0,
    luasBangunan = 0,
    sertifikat = "N/A",
    listrik = "N/A",
    air = "N/A",
    harga = 0,
  } = props;

  return (
    <div className="card bg-base-100 w-auto shadow-sm">
      <figure className="flex max-h-64 w-full items-center justify-center overflow-hidden">
        <Image
          src="https://i.pinimg.com/736x/88/a7/c2/88a7c2bfb9494ff7d6c3484be52da172.jpg"
          alt={namaProperti}
          width={500}
          height={500}
          sizes="100vw"
          className="h-auto max-h-64 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex items-center gap-2">
          <MapPinHouse className="inline" /> {`${lokasi.area}, ${lokasi.kota}`}
        </div>
        <h1 className="card-title">{namaProperti}</h1>
        <p>{deskripsi}</p>

        <div className="divider my-0"></div>
        <div className="grid grid-cols-3 gap-2 text-sm">
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
        <div className="card-actions mt-4 justify-center">
          <Link
            href={`/properties/${props.id || "unknown"}`}
            className="btn btn-primary items-center rounded-xl"
          >
            <Pointer />
            Lihat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
