"use client";
import Header from "@/app/ui/Header";
import CustomCursor from "@/app/ui/CustomCursor";
import Footer from "@/app/ui/Footer";
// import ColorEngineProvider from "@/app/ui/ColorEngineProvider"; // Disabled for performance
import "swiper/css";
import "swiper/css/pagination";
import "./scss/index.scss";
import { Poppins, Open_Sans } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--primary-font",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--secondary-font",
});

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <meta name="author" content="Medical Inn Hair" />
        <meta name="description" content="Medical Inn Hair - Ihr Spezialist für Haartransplantationen in Düsseldorf. Modernste FUE & DHI Techniken für natürliche Ergebnisse. Professionelle Beratung und Nachsorge." />
        <meta name="keywords" content="Haartransplantation, FUE, DHI, PRP, Düsseldorf, Medical Inn Hair, Haarausfall, Haarverpflanzung" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#69cce6" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <title>Medical Inn Hair - Haartransplantation Düsseldorf</title>
      </head>
      <body className={`${openSans.variable} ${poppins.variable}`}>
        {/* ColorEngineProvider disabled for performance optimization */}
        <Header />
        <CustomCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
