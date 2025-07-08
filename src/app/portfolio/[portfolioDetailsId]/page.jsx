'use client'
import Button from "@/app/ui/Button";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import Image from "next/image";
import imgUrl from '../../../../public/images/portfolio_details_1.jpeg'

export default function PortfolioDetailsPage() {
  return (
    <>
      <PageHeading 
        title='Galerie Details'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='GALERIE-DETAILS'
      />
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Image src={imgUrl} alt="Details" placeholder="blur" className="cs-radius_15 w-100" />
        <Spacing lg='90' md='40'/>
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading 
              title='FUE Haartransplantation Ergebnis' 
              subtitle='Vorher-Nachher' 
            >
              <Spacing lg='40' md='20'/>
              <p>Diese FUE Haartransplantation zeigt ein beeindruckendes Ergebnis nach 12 Monaten. Mit der modernsten Follicular Unit Extraction Technik konnten wir eine natürliche Haarlinie rekonstruieren und optimale Haardichte erreichen. Der Patient erhielt 3.200 Grafts für eine vollständige Abdeckung der Frontlinie und des Scheitelbereichs.</p>
              <Spacing lg='10' md='10'/>
              <p>Das Ergebnis spricht für sich: Natürliches Wachstum, unauffällige Übergänge und eine Haarlinie, die perfekt zur Gesichtsform passt. Medical Inn Hair setzt bei jeder Behandlung auf höchste Präzision und individuelle Betreuung für langanhaltende Zufriedenheit.</p>
            </SectionHeading>
          </Div>
          <Div className="col-lg-5 offset-lg-1">
            <Spacing lg='60' md='40'/>
            <h2 className='cs-font_30 cs-font_26_sm cs-m0'>Behandlungsinfo -</h2>
            <Spacing lg='50' md='30'/>
            <Div className="row">
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Methode:</h3>
                <p className='cs-m0'>FUE Technik</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Standort:</h3>
                <p className='cs-m0'>Düsseldorf</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Grafts:</h3>
                <p className='cs-m0'>3.200 Grafts</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Datum:</h3>
                <p className='cs-m0'>März 2024</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Arzt:</h3>
                <p className='cs-m0'>Dr. med. Mehmet Atila</p>
                <Spacing lg='30' md='30'/>
              </Div>
            </Div>
          </Div>
        </Div>
        <Spacing lg='65' md='10'/>
          <Div className="cs-page_navigation cs-center">
            <Div>
              <Button btnLink='/portfolio/portfolio-details' btnText='Vorheriges Ergebnis' variant='cs-type1'/>
            </Div>
            <Div>
              <Button btnLink='/portfolio/portfolio-details' btnText='Nächstes Ergebnis'/>
            </Div>
          </Div>
      </Div>
      <Spacing lg='145' md='80'/>
      <Cta 
        title='info@medicalinnhair.de' 
        bgSrc='/images/cta_bg_2.jpeg'
        variant='rounded-0'
      />
    </>
  )
}