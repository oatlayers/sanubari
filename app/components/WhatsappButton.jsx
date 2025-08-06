import { MessageCircleHeart } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "1234567890";
  const message = encodeURIComponent(
    "Halo, saya tertarik dengan properti ini.",
  );
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="flex flex-row items-center justify-center">
      {" "}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          background: "#25D366",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "24px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        <MessageCircleHeart className="mr-2 inline" />
        Kirim pesan lewat WA
      </a>
    </div>
  );
}
