'use client'
import Cta from "@/app/ui/Cta"
import Div from "@/app/ui/Div"
import PageHeading from "@/app/ui/PageHeading"
import Spacing from "@/app/ui/Spacing"
import SocialWidget from "@/app/ui/Widget/SocialWidget"
import imgUrl from '../../../../public/images/member_4.webp'
import Image from "next/image"

export default function FabianaCarvalho() {
  return (
    <>
      <PageHeading
        title='Fabiana Carvalho'
        bgSrc='/images/team_hero_bg.jpeg'
        pageLinkText='Team Details'
      />
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-radius_15 cs-shine_hover_1">
              <Image src={imgUrl} alt="Fabiana Carvalho" className="w-100" placeholder="blur" />
            </Div>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <Spacing lg='0' md='45'/>
            <Div className="cs-section_heading cs-style1">
              <h2 className="cs-section_title">Fabiana Carvalho</h2>
              <Div className="cs-height_10 cs-height_lg_10" />
              <h3 className="cs-section_subtitle">SMP Spezialistin</h3>
              <Div className="cs-height_5 cs-height_lg_5" />
              <Div className="cs-separator cs-accent_bg" />
              <Div className="cs-height_45 cs-height_lg_25" />
              <p className="cs-m0">Als zertifizierte SMP-Spezialistin (Scalp Micro Pigmentation) bringe ich 8 Jahre Erfahrung in der ästhetischen Pigmentierung mit. Meine Expertise liegt in der kunstfertigen Nachbildung natürlicher Haarfollikel durch präzise Mikropigmentierung. Ich helfe Patienten dabei, das Erscheinungsbild dichteren Haares zu erreichen - eine innovative Alternative zur klassischen Haartransplantation.</p>
              <Div className="cs-height_25 cs-height_lg_20" />
              <p className="cs-m0">Durch meine detailorientierte Arbeitsweise und das tiefe Verständnis für Haarmuster und Pigmentierung erstelle ich individuelle SMP-Behandlungen, die natürlich aussehen und langanhaltende Ergebnisse bieten. Jede Behandlung wird speziell auf Hautton, Haarfarbe und gewünschten Look abgestimmt.</p>
              <Div className="cs-height_45 cs-height_lg_30" />
              <SocialWidget/>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Cta 
          title='Lassen Sie uns Ihr <br />Haar<i>traum</i> verwirklichen' 
          btnText='Beratungstermin' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  )
}