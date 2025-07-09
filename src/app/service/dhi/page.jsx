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
import serviceImage from '../../../../public/images/service_2.webp'

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
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                    Keine Vorinzision nötig
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M3 3v18h18"/>
                      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                    </svg>
                    Höhere Anwuchsrate
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="6"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                    Präzise Winkelkontrolle
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                    Schnellere Heilung
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <circle cx="12" cy="12" r="10"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                    Natürlichere Ergebnisse
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#69cce6" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                      <path d="M7 10v12"/>
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
                    </svg>
                    Geringere Blutungen
                  </li>
                </ul>
              </Div>
            </Div>
            <Spacing lg='40' md='30'/>
            <h3 className="cs-font_30 cs-m0">Erweiterte DHI Anwendungen</h3>
            <Spacing lg='30' md='20'/>
            <Div className="row">
              <Div className="col-lg-12">
                <p className="cs-m0"><strong>Augenbrauentransplantation:</strong> Präzise Augenbrauen-Rekonstruktion mit DHI Choi-Pen Technik für perfekte Kontrolle über Winkel und Richtung.</p>
                <Spacing lg='15' md='15'/>
                <p className="cs-m0"><strong>Barttransplantation:</strong> Dichterer Bart durch DHI Transplantation mit direkter Implantation ohne Vorinzision für optimale Barthaardichte.</p>
                <Spacing lg='15' md='15'/>
                <p className="cs-m0"><strong>Body Hair Extraction:</strong> Körperhaar-Entnahme mit DHI Technik bei begrenztem Kopfhaar-Spenderbereich für maximale Graft-Ausbeute.</p>
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