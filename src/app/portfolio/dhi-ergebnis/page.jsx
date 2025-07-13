'use client'
import Button from "@/app/ui/Button";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import Image from "next/image";
import imgUrl from '../../../../public/images/portfolio_details_2.webp'

export default function DHIErgebnisPage() {
  return (
    <>
      <PageHeading 
        title='DHI Ergebnis'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='DHI ERGEBNIS'
      />
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Image src={imgUrl} alt="DHI Ergebnis" placeholder="blur" className="cs-radius_15 w-100" />
        <Spacing lg='90' md='40'/>
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading 
              title='Präzise DHI Implantation' 
              subtitle='Direct Hair Implantation Ergebnis' 
            >
              <Spacing lg='40' md='20'/>
              <p>Diese DHI Haartransplantation demonstriert die Präzision der Direct Hair Implantation Technik nach 10 Monaten. Mit dem innovativen Choi-Pen konnten wir 2.800 Grafts direkt implantieren, ohne vorherige Kanalöffnung. Das Ergebnis zeigt eine perfekte Haardichte und natürliche Wuchsrichtung.</p>
              <Spacing lg='10' md='10'/>
              <p>Die DHI-Methode ermöglicht es, Winkel, Tiefe und Richtung jedes einzelnen Haares präzise zu kontrollieren. Dies führt zu einem außergewöhnlich natürlichen Erscheinungsbild mit minimaler Ausfallzeit und schneller Heilung.</p>
            </SectionHeading>
          </Div>
          <Div className="col-lg-5 offset-lg-1">
            <Spacing lg='60' md='40'/>
            <h2 className='cs-font_30 cs-font_26_sm cs-m0'>Behandlungsinfo -</h2>
            <Spacing lg='50' md='30'/>
            <Div className="row">
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Methode:</h3>
                <p className='cs-m0'>DHI Technik</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Standort:</h3>
                <p className='cs-m0'>Düsseldorf</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Grafts:</h3>
                <p className='cs-m0'>2.800 Grafts</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Datum:</h3>
                <p className='cs-m0'>April 2024</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Arzt:</h3>
                <p className='cs-m0'>Dr. med. Mehmet Atila</p>
                <Spacing lg='30' md='30'/>
              </Div>
              <Div className="col-6">
                <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Technik:</h3>
                <p className='cs-m0'>Choi-Pen</p>
                <Spacing lg='30' md='30'/>
              </Div>
            </Div>
          </Div>
        </Div>
        <Spacing lg='65' md='10'/>
          <Div className="cs-page_navigation cs-center">
            <Div>
              <Button btnLink='/portfolio/vorher-nachher-fue' btnText='Vorher-Nachher FUE' variant='cs-type1'/>
            </Div>
            <Div>
              <Button btnLink='/portfolio/natuerliche-haarlinie' btnText='Natürliche Haarlinie'/>
            </Div>
          </Div>
      </Div>
      <Spacing lg='145' md='80'/>
      <Cta 
        title='Entdecken Sie die <br/>DHI <i>Präzision</i>' 
        btnText='Beratung buchen'
        btnLink='/contact'
        bgSrc='/images/cta_bg_2.jpeg'
        variant='rounded-0'
      />
    </>
  )
}