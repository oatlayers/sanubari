"use client";

import { useEffect, useRef } from "react";
import { X, Trash } from "lucide-react";

export default function ConfirmModal({
  open,
  title,
  message,
  onCancel,
  onConfirm,
  loading,
}) {
  const closeBtnRef = useRef(null);

  // close on Escape for convenience
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  // focus the cancel button when modal opens
  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal modal-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="modal-box relative">
        <button
          className="btn btn-ghost btn-sm btn-circle absolute top-2 right-2"
          onClick={onCancel}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <h3 id="confirm-title" className="text-lg font-bold">
          {title}
        </h3>

        <p className="py-4">{message}</p>

        <div className="modal-action">
          <button
            ref={closeBtnRef}
            type="button"
            className="btn rounded-full"
            onClick={onCancel}
            disabled={loading}
          >
            Batal
          </button>

          <button
            type="button"
            className={`btn btn-error flex items-center rounded-full ${loading ? "loading" : ""}`}
            onClick={onConfirm}
            disabled={loading}
          >
            <Trash className="mr-2" />
            {loading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
