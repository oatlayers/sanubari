import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToastProvider from "@/components/ToastProvider";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "Sanubari Property | Cari Properti di Jogja",
  description: "Situs mencari properti terbaik di Jogja",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body>
        <Navbar />
        {children}
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}
