import Accordion from "@/app/ui/Accordion";
import Button from "@/app/ui/Button";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import IconBox from "@/app/ui/IconBox";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import TestimonialSlider from "@/app/ui/Slider/TestimonialSlider";
import Spacing from "@/app/ui/Spacing";
import Image from "next/image";
import { FeatureSteps } from "@/app/ui/FeatureSteps";

export const metadata = {
  title: 'FUE Saphir Haartransplantation - Präzise Technik | Medical Inn Hair',
  description: 'FUE Saphir Haartransplantation ✓ Saphir-Klingen ✓ Minimale Narbenbildung ✓ Natürliche Ergebnisse ✓ Jetzt Beratung buchen in Düsseldorf',
  keywords: 'FUE Saphir Haartransplantation, Saphir-Klingen, FUE Technik, Haartransplantation Düsseldorf, Augenbrauentransplantation, Barttransplantation, Body Hair Extraction, minimale Narben',
  openGraph: {
    title: 'FUE Saphir Haartransplantation - Präzise Technik | Medical Inn Hair',
    description: 'FUE Saphir Haartransplantation ✓ Saphir-Klingen ✓ Minimale Narbenbildung ✓ Natürliche Ergebnisse ✓ Jetzt Beratung buchen in Düsseldorf',
    type: 'website',
    locale: 'de_DE',
    siteName: 'Medical Inn Hair',
    images: [{
      url: '/images/service_1.webp',
      width: 1200,
      height: 630,
      alt: 'FUE Saphir Haartransplantation Medical Inn Hair Düsseldorf'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FUE Saphir Haartransplantation - Präzise Technik | Medical Inn Hair',
    description: 'FUE Saphir Haartransplantation ✓ Saphir-Klingen ✓ Minimale Narbenbildung ✓ Natürliche Ergebnisse ✓ Jetzt Beratung buchen in Düsseldorf',
    images: ['/images/service_1.webp']
  },
  alternates: {
    canonical: 'https://medical-inn-hair.de/service/fue-saphir'
  }
};

export default function FueSaphirPage() {
  const extendedApplications = [
    {
      step: "Augenbrauentransplantation",
      title: "Augenbrauentransplantation",
      content: "Präzise Wiederherstellung der Augenbrauen mit FUE Saphir Technik für natürliche Wuchsrichtung und dichte Augenbrauen.",
      image: "/images/service_1.webp"
    },
    {
      step: "Barttransplantation", 
      title: "Barttransplantation",
      content: "Vollerer Bart durch FUE Saphir Transplantation aus dem Kopfhaar-Spenderbereich für natürliche Bartverdichtung.",
      image: "/images/service_2.webp"
    },
    {
      step: "Body Hair Extraction",
      title: "Body Hair Extraction", 
      content: "Verwendung von Körperhaar als Spenderbereich bei begrenztem Kopfhaar für optimale Graft-Ausbeute.",
      image: "/images/service_3.webp"
    }
  ];

  return (
    <>
      <PageHeading 
        title='FUE Saphir Haartransplantation'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='FUE SAPHIR'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='Modernste FUE Saphir Technologie' 
          subtitle='Präzise und schonende Haartransplantation' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_1.svg'
              title='Saphir-Klingen'
              subtitle='Verwendung von hochpräzisen Saphir-Klingen für minimale Traumatisierung des Gewebes. Bessere Heilung und natürlichere Ergebnisse durch präzise Schnitte.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_2.svg'
              title='Schonende Entnahme'
              subtitle='Einzelentnahme der Haarfollikel mit modernster FUE-Saphir-Technik. Minimale Narbenbildung und schnelle Heilung für optimale Ergebnisse.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_3.svg'
              title='Natürliche Implantation'
              subtitle='Präzise Implantation mit Saphir-Klingen für natürliche Wuchsrichtung und optimale Haardichte. Minimale Schwellungen und schnelle Erholung.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
        </Div>
      </Div>
      <Spacing lg='120' md='50'/>
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-radius_15 cs-shine_hover_1">
              <Image src="/images/service_1.webp" alt="FUE Saphir" width={800} height={600} className='cs-radius_15 w-100' />
            </Div>
            <Spacing lg='0' md='40'/>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <h2 className="cs-font_50 cs-m0">Vorteile der FUE Saphir Methode</h2>
            <Spacing lg='50' md='30'/>
            <Div className="row">
              <Div className="col-lg-6">
                <Button btnLink='/service/dhi' btnText='DHI Technik' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/service/prp' btnText='PRP Therapie' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/service/smp' btnText='SMP Mikropigmentierung' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/contact' btnText='Beratung buchen' variant='cs-type1'/>
                <Spacing lg='0' md='10'/>
              </Div>
              <Div className="col-lg-6">
                <ul className="cs-list cs-style1 cs-mp0">
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.54 0 4.83 1.05 6.5 2.75"/>
                    </svg>
                    Minimale Narbenbildung
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    Schnelle Heilung
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Natürliche Ergebnisse
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
                      <line x1="16" y1="8" x2="2" y2="22"/>
                      <line x1="17.5" y1="15" x2="9" y2="15"/>
                    </svg>
                    Geringere Schwellungen
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="6"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                    Präzise Implantation
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M3 3v18h18"/>
                      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                    </svg>
                    Höhere Anwuchsrate
                  </li>
                </ul>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      
      {/* Extended Applications Section */}
      <FeatureSteps 
        features={extendedApplications}
        title="Erweiterte Anwendungsbereiche"
        autoPlayInterval={4000}
      />
      <Spacing lg='50' md='30'/>
      
      <TestimonialSlider />
      <Spacing lg='145' md='80'/>
      <Div className="container cs-shape_wrap_4">
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-5 col-lg-6">
              <SectionHeading
                title='Häufig gestellte Fragen zur FUE Saphir' 
                subtitle='FAQ'
              />
              <Spacing lg='90' md='45'/>
            </Div>
            <Div className="col-lg-6 offset-xl-1">
              <Accordion/>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Cta 
          title='Bereit für Ihre <br />FUE Saphir <i>Transplantation</i>?' 
          btnText='Beratung buchen' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  )
}