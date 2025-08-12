"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import deleteProperty from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";
import { Delete } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

export default function DeleteButton({ propertyId }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleConfirm() {
    try {
      setLoading(true);
      await deleteProperty(propertyId);
      toast.success("Properti berhasil dihapus");
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Delete failed", err);
      toast.error(err?.message || "Gagal menghapus");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={loading}
        className="btn btn-warning items-center rounded-xl"
      >
        <Delete className="mr-2" />
        Hapus
      </button>

      <ConfirmModal
        open={open}
        title="Konfirmasi"
        message="Apakah Anda yakin ingin menghapus properti ini? Tindakan ini tidak dapat dibatalkan."
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
        loading={loading}
      />
    </>
  );
}
