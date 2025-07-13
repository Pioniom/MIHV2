'use client'
import Button from "@/app/ui/Button";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import Image from "next/image";

export default function VollstaendigeAbdeckungPage() {
  return (
    <>
      <PageHeading 
        title='Vollständige Abdeckung'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='VOLLSTÄNDIGE ABDECKUNG'
      />
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Image src="/images/portfolio_details_4.webp" alt="Vollständige Abdeckung" width={800} height={600} className="cs-radius_15 w-100" />
        <Spacing lg='90' md='40'/>
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading 
              title='Umfassende Haartransplantation' 
              subtitle='Vollständige Abdeckung Ergebnis' 
            >
              <Spacing lg='40' md='20'/>
              <p>Diese umfassende Haartransplantation zeigt eine vollständige Abdeckung großflächiger Haarausfallbereiche. Mit 4.500 Grafts konnten wir sowohl die Frontlinie als auch den Scheitel- und Kronenbereich vollständig restaurieren. Das Ergebnis nach 14 Monaten übertrifft alle Erwartungen.</p>
              <Spacing lg='10' md='10'/>
              <p>Bei großflächigen Haarausfällen ist eine sorgfältige Planung und Verteilung der Grafts entscheidend. Unsere Experten schaffen es, auch bei umfangreichen Eingriffen eine natürliche Haardichte und harmonische Proportionen zu erreichen.</p>
            </SectionHeading>
          </Div>
          <Div className="col-lg-5 offset-lg-1">
            <Spacing lg='60' md='40'/>
            <h2 className='cs-font_30 cs-font_26_sm cs-m0'>Behandlungsinfo -</h2>
            <Spacing lg='50' md='30'/>
            <Div className="row">
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Methode:</h3>
                <p className='cs-m0'>FUE + DHI</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Standort:</h3>
                <p className='cs-m0'>Düsseldorf</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Grafts:</h3>
                <p className='cs-m0'>4.500 Grafts</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Datum:</h3>
                <p className='cs-m0'>Dezember 2023</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Arzt:</h3>
                <p className='cs-m0'>Dr. med. Mehmet Atila</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Umfang:</h3>
                <p className='cs-m0'>Vollabdeckung</p>
                <Spacing lg='30' md='30'/>
              </Div>
            </Div>
          </Div>
        </Div>
        <Spacing lg='65' md='10'/>
          <Div className="cs-page_navigation cs-center">
            <Div>
              <Button btnLink='/portfolio/natuerliche-haarlinie' btnText='Natürliche Haarlinie' variant='cs-type1'/>
            </Div>
            <Div>
              <Button btnLink='/portfolio/vorher-nachher-fue' btnText='Vorher-Nachher FUE'/>
            </Div>
          </Div>
      </Div>
      <Spacing lg='145' md='80'/>
      <Cta 
        title='Komplette <br/>Haar<i>transformation</i>' 
        btnText='Beratung buchen'
        btnLink='/contact'
        bgSrc='/images/cta_bg_2.jpeg'
        variant='rounded-0'
      />
    </>
  )
}