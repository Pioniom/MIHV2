"use client";
import Header from "@/app/ui/Header";
import CustomCursor from "@/app/ui/CustomCursor";
import Footer from "@/app/ui/Footer";
import ColorEngineProvider from "@/app/ui/ColorEngineProvider";
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
    <html lang="en">
      <head>
        <meta name="author" content="Laralink" />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <title>Medical Inn Hair - Haartransplantation Düsseldorf</title>
      </head>
      <body className={`${openSans.variable} ${poppins.variable}`}>
        <ColorEngineProvider>
          <Header />
          <CustomCursor />
          {children}
          <Footer />
        </ColorEngineProvider>
      </body>
    </html>
  );
}
