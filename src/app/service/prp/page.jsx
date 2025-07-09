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
import serviceImage from '../../../../public/images/service_3.webp'

export default function PRPPage() {
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
              <Image src={serviceImage} alt="PRP Therapie" className='cs-radius_15 w-100' placeholder="blur" />
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
                  <li>100% natürliche Behandlung</li>
                  <li>Keine Nebenwirkungen</li>
                  <li>Ambulante Behandlung</li>
                  <li>Schnelle Regeneration</li>
                  <li>Haarwurzeln stärken</li>
                  <li>Haarausfall reduzieren</li>
                </ul>
              </Div>
            </Div>
            <Spacing lg='40' md='30'/>
            <h3 className="cs-font_30 cs-m0">Vielseitige PRP Anwendungen</h3>
            <Spacing lg='30' md='20'/>
            <Div className="row">
              <Div className="col-lg-12">
                <p className="cs-m0"><strong>Nachbehandlung Haartransplantation:</strong> PRP als optimale Nachbehandlung nach FUE/DHI Transplantationen für bessere Graft-Anwachsrate und schnellere Heilung.</p>
                <Spacing lg='15' md='15'/>
                <p className="cs-m0"><strong>Diffuser Haarausfall:</strong> Behandlung von dünner werdendem Haar durch Stärkung vorhandener Haarfollikel und natürliche Wachstumsförderung.</p>
                <Spacing lg='15' md='15'/>
                <p className="cs-m0"><strong>Bartbereich & Augenbrauen:</strong> PRP Therapie zur Verdichtung und Stärkung vorhandener Haare für vollere Augenbrauen und dichteren Bart.</p>
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