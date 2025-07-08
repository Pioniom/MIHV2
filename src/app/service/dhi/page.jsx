'use client'
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
import serviceImage from '../../../../public/images/service_img_1.jpeg'

export default function DHIPage() {
  return (
    <>
      <PageHeading 
        title='DHI Haartransplantation'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='DHI TECHNIK'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='Direct Hair Implantation (DHI)' 
          subtitle='Innovative Haartransplantation ohne Vorinzision' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_1.svg'
              title='Choi-Pen Technik'
              subtitle='Verwendung des speziellen Choi-Pens für direkte Implantation. Keine Vorinzision erforderlich - Entnahme und Implantation in einem Schritt.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_2.svg'
              title='Präzise Kontrolle'
              subtitle='Vollständige Kontrolle über Tiefe, Richtung und Winkel der Implantation. Natürliche Wuchsrichtung und optimale Haardichte garantiert.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_3.svg'
              title='Minimale Ausfallzeit'
              subtitle='Schonende Behandlung mit minimaler Ausfallzeit. Schnelle Heilung und sofort sichtbare Ergebnisse durch innovative DHI-Technik.'
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
              <Image src={serviceImage} alt="DHI Technik" className='cs-radius_15 w-100' placeholder="blur" />
            </Div>
            <Spacing lg='0' md='40'/>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <h2 className="cs-font_50 cs-m0">DHI - Die Zukunft der Haartransplantation</h2>
            <Spacing lg='50' md='30'/>
            <Div className="row">
              <Div className="col-lg-6">
                <Button btnLink='/service/fue-saphir' btnText='FUE Saphir' variant='cs-type2'/>
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
                  <li>Keine Vorinzision nötig</li>
                  <li>Höhere Anwuchsrate</li>
                  <li>Präzise Winkelkontrolle</li>
                  <li>Schnellere Heilung</li>
                  <li>Natürlichere Ergebnisse</li>
                  <li>Geringere Blutungen</li>
                </ul>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      <TestimonialSlider />
      <Spacing lg='145' md='80'/>
      <Div className="container cs-shape_wrap_4">
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-5 col-lg-6">
              <SectionHeading
                title='Häufig gestellte Fragen zur DHI Technik' 
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
          title='Entdecken Sie die <br />DHI <i>Innovation</i>' 
          btnText='Beratung buchen' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  )
}