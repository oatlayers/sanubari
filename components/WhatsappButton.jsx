import { MessageCircleHeart } from "lucide-react";

export default function WhatsAppButton({ fullUrl, form, type = "direct" }) {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;

  let urlMessage = "";

  if (type === "form" && form) {
    const name = form?.name || "";
    const message = form?.message || "";
    urlMessage = encodeURIComponent(
      `Nama: ${name}. ${message ? message : ""} Link Properti: ${fullUrl}`,
    );
  } else {
    urlMessage = encodeURIComponent(
      `Halo, saya tertarik dengan properti ini. Link Properti: ${fullUrl}`,
    );
  }

  const sendUrl = `https://wa.me/${phone}?text=${urlMessage}`;

  return (
    <div className="flex flex-row items-center justify-center">
      <a
        href={sendUrl}
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
        <MessageCircleHeart className="mr-2 mb-1 inline" />
        {type == "direct" ? "Hubungi lewat WA" : "Kirim pesan lewat WA"}
      </a>
    </div>
  );
}
