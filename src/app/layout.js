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
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <title>Medical Inn Hair - Haartransplantation Düsseldorf</title>
        
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Medical Inn Hair",
              "image": "https://medical-inn-hair.de/images/logo.png",
              "description": "Spezialist für Haartransplantationen in Düsseldorf. Modernste FUE & DHI Techniken für natürliche Ergebnisse.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Musterstraße 123",
                "addressLocality": "Düsseldorf",
                "postalCode": "40210",
                "addressCountry": "DE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 51.2277,
                "longitude": 6.7735
              },
              "url": "https://medical-inn-hair.de",
              "telephone": "0211 26159 299",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "14:00"
                }
              ],
              "priceRange": "€€€",
              "medicalSpecialty": "Hair Transplantation",
              "availableService": [
                {
                  "@type": "MedicalProcedure",
                  "name": "FUE Saphir Haartransplantation",
                  "description": "Schonende Haartransplantation mit Saphir-Klingen"
                },
                {
                  "@type": "MedicalProcedure", 
                  "name": "DHI Haartransplantation",
                  "description": "Direct Hair Implantation mit Choi-Pen Technik"
                },
                {
                  "@type": "MedicalTherapy",
                  "name": "PRP Therapie",
                  "description": "Platelet Rich Plasma Behandlung zur Haarwuchsförderung"
                },
                {
                  "@type": "MedicalProcedure",
                  "name": "SMP Mikropigmentierung",
                  "description": "Scalp Micro Pigmentation für optische Haarverdichtung"
                }
              ]
            })
          }}
        />
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
