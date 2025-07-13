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

export default function AIAnalyzerPage() {
  return (
    <>
      <PageHeading 
        title='AI Haar-Analyzer'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='AI ANALYZER'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='Intelligente Haaranalyse mit KI-Technologie' 
          subtitle='Präzise Diagnose und Behandlungsempfehlungen' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_1.svg'
              title='KI-basierte Analyse'
              subtitle='Modernste Künstliche Intelligenz analysiert Ihr Haar und Ihre Kopfhaut mit höchster Präzision. Detaillierte Bewertung von Haarqualität, Dichte und Haarausfall-Muster.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_2.svg'
              title='Sofortige Ergebnisse'
              subtitle='Erhalten Sie innerhalb von Minuten eine ausführliche Analyse Ihrer Haarsituation. Sofortige Auswertung mit detaillierten Empfehlungen für optimale Behandlung.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_3.svg'
              title='Personalisierte Empfehlungen'
              subtitle='Individuelle Behandlungsvorschläge basierend auf Ihrer einzigartigen Haarsituation. Maßgeschneiderte Lösungen für optimale Ergebnisse.'
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
              <Image src="/images/service_1.webp" alt="AI Haar-Analyzer" className='cs-radius_15 w-100' width={600} height={400} />
            </Div>
            <Spacing lg='0' md='40'/>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <h2 className="cs-font_50 cs-m0">Vorteile der AI-Haaranalyse</h2>
            <Spacing lg='50' md='30'/>
            <Div className="row">
              <Div className="col-lg-6">
                <Button btnLink='/service/fue-saphir' btnText='FUE Saphir' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/service/dhi' btnText='DHI Technik' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/service/prp' btnText='PRP Therapie' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/contact' btnText='Beratung buchen' variant='cs-type1'/>
                <Spacing lg='0' md='10'/>
              </Div>
              <Div className="col-lg-6">
                <ul className="cs-list cs-style1 cs-mp0">
                  <li>Präzise KI-Analyse</li>
                  <li>Sofortige Ergebnisse</li>
                  <li>Personalisierte Empfehlungen</li>
                  <li>Kostenlose Erstanalyse</li>
                  <li>Detaillierte Berichte</li>
                  <li>Behandlungsplan-Erstellung</li>
                </ul>
              </Div>
            </Div>
            <Spacing lg='40' md='30'/>
            <h3 className="cs-font_30 cs-m0">AI-Analyzer Funktionen</h3>
            <Spacing lg='30' md='20'/>
            <Div className="row">
              <Div className="col-lg-12">
                <p className="cs-m0"><strong>Haarqualitäts-Bewertung:</strong> Detaillierte Analyse der Haarstruktur, Dicke und Gesundheit mit KI-Algorithmen für präzise Bewertung.</p>
                <Spacing lg='15' md='15'/>
                <p className="cs-m0"><strong>Haarausfall-Muster-Erkennung:</strong> Intelligente Erkennung von Haarausfall-Typen und -Stadien für optimale Behandlungsempfehlungen.</p>
                <Spacing lg='15' md='15'/>
                <p className="cs-m0"><strong>Prognose-Modellierung:</strong> Vorhersage der Haarentwicklung und des Behandlungserfolgs basierend auf fortschrittlichen AI-Modellen.</p>
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
                title='Häufig gestellte Fragen zum AI-Analyzer' 
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
          title='Entdecken Sie Ihren <br />AI <i>Haar-Analyzer</i>' 
          btnText='Analyse starten' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  )
}