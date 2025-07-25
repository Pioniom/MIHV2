'use client'
import Button from "@/app/ui/Button";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import Image from "next/image";

export default function NatuerlicheHaarliniePage() {
  return (
    <>
      <PageHeading 
        title='Natürliche Haarlinie'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='NATÜRLICHE HAARLINIE'
      />
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Image src="/images/portfolio_details_3.webp" alt="Natürliche Haarlinie" width={800} height={600} className="cs-radius_15 w-100" />
        <Spacing lg='90' md='40'/>
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading 
              title='Kunstvolle Haarlinien-Rekonstruktion' 
              subtitle='Natürliche Haarlinie Ergebnis' 
            >
              <Spacing lg='40' md='20'/>
              <p>Diese Haarlinie zeigt die Kunstfertigkeit unserer Spezialisten bei der Rekonstruktion natürlicher Haarlinien. Mit 2.200 sorgfältig platzierten Grafts wurde eine altersgerechte, maskuline Haarlinie geschaffen, die perfekt zur Gesichtsform des Patienten passt.</p>
              <Spacing lg='10' md='10'/>
              <p>Die natürliche Haarlinie ist das Herzstück jeder erfolgreichen Haartransplantation. Unsere Experten berücksichtigen dabei Faktoren wie Alter, Gesichtsform und individuelle Wünsche, um ein harmonisches und authentisches Ergebnis zu erzielen.</p>
            </SectionHeading>
          </Div>
          <Div className="col-lg-5 offset-lg-1">
            <Spacing lg='60' md='40'/>
            <h2 className='cs-font_30 cs-font_26_sm cs-m0'>Behandlungsinfo -</h2>
            <Spacing lg='50' md='30'/>
            <Div className="row">
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Methode:</h3>
                <p className='cs-m0'>FUE Saphir</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Standort:</h3>
                <p className='cs-m0'>Düsseldorf</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Grafts:</h3>
                <p className='cs-m0'>2.200 Grafts</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Datum:</h3>
                <p className='cs-m0'>Januar 2024</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Spezialistin:</h3>
                <p className='cs-m0'>Nükhet Önal Taylan</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Fokus:</h3>
                <p className='cs-m0'>Haarlinie</p>
                <Spacing lg='30' md='30'/>
              </Div>
            </Div>
          </Div>
        </Div>
        <Spacing lg='65' md='10'/>
          <Div className="cs-page_navigation cs-center">
            <Div>
              <Button btnLink='/portfolio/dhi-ergebnis' btnText='DHI Ergebnis' variant='cs-type1'/>
            </Div>
            <Div>
              <Button btnLink='/portfolio/vollstaendige-abdeckung' btnText='Vollständige Abdeckung'/>
            </Div>
          </Div>
      </Div>
      <Spacing lg='145' md='80'/>
      <Cta 
        title='Ihre perfekte <br/>natürliche <i>Haarlinie</i>' 
        btnText='Beratung buchen'
        btnLink='/contact'
        bgSrc='/images/cta_bg_2.jpeg'
        variant='rounded-0'
      />
    </>
  )
}