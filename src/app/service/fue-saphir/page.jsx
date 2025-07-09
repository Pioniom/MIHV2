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
import serviceImage from '../../../../public/images/service_1.webp'

export default function FueSaphirPage() {
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
              <Image src={serviceImage} alt="FUE Saphir" className='cs-radius_15 w-100' placeholder="blur" />
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
                  <li>Minimale Narbenbildung</li>
                  <li>Schnelle Heilung</li>
                  <li>Natürliche Ergebnisse</li>
                  <li>Geringere Schwellungen</li>
                  <li>Präzise Implantation</li>
                  <li>Höhere Anwuchsrate</li>
                </ul>
              </Div>
            </Div>
            <Spacing lg='40' md='30'/>
            <h3 className="cs-font_30 cs-m0">Erweiterte Anwendungsbereiche</h3>
            <Spacing lg='30' md='20'/>
            <Div className="row">
              <Div className="col-lg-12">
                <p className="cs-m0"><strong>Augenbrauentransplantation:</strong> Präzise Wiederherstellung der Augenbrauen mit FUE Saphir Technik für natürliche Wuchsrichtung und dichte Augenbrauen.</p>
                <Spacing lg='15' md='15'/>
                <p className="cs-m0"><strong>Barttransplantation:</strong> Vollerer Bart durch FUE Saphir Transplantation aus dem Kopfhaar-Spenderbereich für natürliche Bartverdichtung.</p>
                <Spacing lg='15' md='15'/>
                <p className="cs-m0"><strong>Body Hair Extraction:</strong> Verwendung von Körperhaar als Spenderbereich bei begrenztem Kopfhaar für optimale Graft-Ausbeute.</p>
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