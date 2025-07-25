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
  title: 'PRP Therapie - Platelet Rich Plasma Behandlung | Medical Inn Hair',
  description: 'PRP Therapie ✓ 100% natürlich ✓ Eigenblut-Behandlung ✓ Haarwurzeln stärken ✓ Haarausfall stoppen ✓ Jetzt Beratung buchen in Düsseldorf',
  keywords: 'PRP Therapie, Platelet Rich Plasma, Eigenblut-Behandlung, Haarwurzeln stärken, Haarausfall Düsseldorf, natürliche Haarwuchsförderung, diffuser Haarausfall, Nachbehandlung Haartransplantation',
  openGraph: {
    title: 'PRP Therapie - Platelet Rich Plasma Behandlung | Medical Inn Hair',
    description: 'PRP Therapie ✓ 100% natürlich ✓ Eigenblut-Behandlung ✓ Haarwurzeln stärken ✓ Haarausfall stoppen ✓ Jetzt Beratung buchen in Düsseldorf',
    type: 'website',
    locale: 'de_DE',
    siteName: 'Medical Inn Hair',
    images: [{
      url: '/images/service_3.webp',
      width: 1200,
      height: 630,
      alt: 'PRP Therapie Medical Inn Hair Düsseldorf'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRP Therapie - Platelet Rich Plasma Behandlung | Medical Inn Hair',
    description: 'PRP Therapie ✓ 100% natürlich ✓ Eigenblut-Behandlung ✓ Haarwurzeln stärken ✓ Haarausfall stoppen ✓ Jetzt Beratung buchen in Düsseldorf',
    images: ['/images/service_3.webp']
  },
  alternates: {
    canonical: 'https://medical-inn-hair.de/service/prp'
  }
};

export default function PRPPage() {
  const prpApplications = [
    {
      step: "Nachbehandlung Haartransplantation",
      title: "Nachbehandlung Haartransplantation",
      content: "PRP als optimale Nachbehandlung nach FUE/DHI Transplantationen für bessere Graft-Anwachsrate und schnellere Heilung.",
      image: "/images/service_3.webp"
    },
    {
      step: "Diffuser Haarausfall", 
      title: "Diffuser Haarausfall",
      content: "Behandlung von dünner werdendem Haar durch Stärkung vorhandener Haarfollikel und natürliche Wachstumsförderung.",
      image: "/images/service_1.webp"
    },
    {
      step: "Vielseitige Anwendungsbereiche",
      title: "Vielseitige Anwendungsbereiche", 
      content: "PRP findet erfolgreich Anwendung in vielen Bereichen - von Bartbereich und Augenbrauen bis hin zu Anti-Aging und anderen medizinischen Behandlungsfeldern.",
      image: "/images/portfolio_3.webp"
    }
  ];

  return (
    <>
      <PageHeading 
        title='PRP Therapie'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='PRP THERAPIE'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='PRP - Platelet Rich Plasma Therapie' 
          subtitle='Natürliche Haarwuchsförderung ohne Operation' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_1.svg'
              title='Eigenblut-Behandlung'
              subtitle='Verwendung Ihres eigenen Blutes zur Gewinnung von plättchenreichem Plasma. Natürliche und sichere Methode zur Haarwuchsförderung.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_2.svg'
              title='Haarwurzeln stärken'
              subtitle='Stimulation der Haarfollikel durch Wachstumsfaktoren. Verbesserte Durchblutung und Nährstoffversorgung für gesünderes Haarwachstum.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_3.svg'
              title='Haarausfall stoppen'
              subtitle='Verlangsamung des Haarausfalls und Förderung neuen Haarwachstums. Ideale Ergänzung zur Haartransplantation oder als eigenständige Therapie.'
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
              <Image src="/images/service_3.webp" alt="PRP Therapie" className='cs-radius_15 w-100' width={600} height={400} />
            </Div>
            <Spacing lg='0' md='40'/>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <h2 className="cs-font_50 cs-m0">Natürliche Haarwuchsförderung mit PRP</h2>
            <Spacing lg='50' md='30'/>
            <Div className="row">
              <Div className="col-lg-6">
                <Button btnLink='/service/fue-saphir' btnText='FUE Saphir' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/service/dhi' btnText='DHI Technik' variant='cs-type2'/>
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
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    100% natürliche Behandlung
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.54 0 4.83 1.05 6.5 2.75"/>
                    </svg>
                    Keine Nebenwirkungen
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9,22 9,12 15,12 15,22"/>
                    </svg>
                    Ambulante Behandlung
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                    Schnelle Regeneration
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    Haarwurzeln stärken
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M18 6L6 18"/>
                      <path d="M6 6l12 12"/>
                    </svg>
                    Haarausfall reduzieren
                  </li>
                </ul>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      
      {/* PRP Applications Section */}
      <FeatureSteps 
        features={prpApplications}
        title="Vielseitige PRP Anwendungen"
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
                title='Häufig gestellte Fragen zur PRP Therapie' 
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
          title='Starten Sie Ihre <br />natürliche <i>PRP Therapie</i>' 
          btnText='Beratung buchen' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  )
}