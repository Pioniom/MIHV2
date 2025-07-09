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
import serviceImage from '../../../../public/images/service_4.webp'

export default function SMPPage() {
  return (
    <>
      <PageHeading 
        title='SMP Mikropigmentierung'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='SMP MIKROPIGMENTIERUNG'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='Scalp Micro Pigmentation (SMP)' 
          subtitle='Optische Haarverdichtung durch Mikropigmentierung' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_1.svg'
              title='Mikropigmentierung'
              subtitle='Präzise Pigmentierung der Kopfhaut für die Illusion natürlicher Haarfollikel. Modernste Technologie für realistische Ergebnisse.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_2.svg'
              title='Sofortige Ergebnisse'
              subtitle='Sofort sichtbare Verdichtung ohne Ausfallzeit. Perfekte Lösung für dünnes Haar oder zur Ergänzung einer Haartransplantation.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_3.svg'
              title='Langanhaltend'
              subtitle='Dauerhafte Lösung mit natürlichem Aussehen. Pflegeleicht und wetterbeständig für optimale Ergebnisse im Alltag.'
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
              <Image src={serviceImage} alt="SMP Mikropigmentierung" className='cs-radius_15 w-100' placeholder="blur" />
            </Div>
            <Spacing lg='0' md='40'/>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <h2 className="cs-font_50 cs-m0">SMP - Die innovative Haarverdichtung</h2>
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
                  <li>Sofort sichtbare Ergebnisse</li>
                  <li>Keine Ausfallzeit</li>
                  <li>Natürliches Aussehen</li>
                  <li>Wetterbeständig</li>
                  <li>Pflegeleicht</li>
                  <li>Langanhaltend</li>
                </ul>
              </Div>
            </Div>
            <Spacing lg='40' md='30'/>
            <h3 className="cs-font_30 cs-m0">Vielseitige SMP Anwendungen</h3>
            <Spacing lg='30' md='20'/>
            <Div className="row">
              <Div className="col-lg-12">
                <p className="cs-m0"><strong>Glatze & Buzz Cut Look:</strong> Komplette Kopfhaut-Pigmentierung für den perfekten Glatze-Look mit Simulation von frisch rasierten Haaren.</p>
                <Spacing lg='15' md='15'/>
                <p className="cs-m0"><strong>Haardichte-Simulation:</strong> Verdichtung von dünnem Haar durch Mikropigmentierung zwischen vorhandenen Haarfollikeln für natürliche Fülle.</p>
                <Spacing lg='15' md='15'/>
                <p className="cs-m0"><strong>Narbenkaschierung:</strong> Kaschierung von Narben durch Haartransplantationen oder Unfälle mit Mikropigmentierung für einheitliche Kopfhaut-Optik.</p>
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
                title='Häufig gestellte Fragen zur SMP' 
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
          title='Perfekte Haardichte mit <br />SMP <i>Mikropigmentierung</i>' 
          btnText='Beratung buchen' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  )
}