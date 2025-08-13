import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToastProvider from "@/components/ToastProvider";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "Sanubari Property | Cari Properti di Jogja",
  description: "Situs mencari properti terbaik di Jogja.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}
