'use client'
import Cta from "@/app/ui/Cta"
import Div from "@/app/ui/Div"
import PageHeading from "@/app/ui/PageHeading"
import Spacing from "@/app/ui/Spacing"
import SocialWidget from "@/app/ui/Widget/SocialWidget"
import imgUrl from '../../../../public/images/member_3.webp'
import Image from "next/image"

export default function DrChristianJosephs() {
  return (
    <>
      <PageHeading
        title='Dr. med. Christian Josephs'
        bgSrc='/images/team_hero_bg.jpeg'
        pageLinkText='Team Details'
      />
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-radius_15 cs-shine_hover_1">
              <Image src={imgUrl} alt="Dr. med. Christian Josephs" className="w-100" placeholder="blur" />
            </Div>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <Spacing lg='0' md='45'/>
            <Div className="cs-section_heading cs-style1">
              <h2 className="cs-section_title">Dr. med. Christian Josephs</h2>
              <Div className="cs-height_10 cs-height_lg_10" />
              <h3 className="cs-section_subtitle">Spezialist FUE & DHI</h3>
              <Div className="cs-height_5 cs-height_lg_5" />
              <Div className="cs-separator cs-accent_bg" />
              <Div className="cs-height_45 cs-height_lg_25" />
              <p className="cs-m0">Als Facharzt für Dermatologie und spezialisiert auf moderne Haartransplantationstechniken führe ich täglich FUE- und DHI-Eingriffe durch. Meine 12-jährige Erfahrung in der Haarchirurgie ermöglicht es mir, auch komplexe Fälle erfolgreich zu behandeln und natürliche, dauerhafte Ergebnisse zu erzielen.</p>
              <Div className="cs-height_25 cs-height_lg_20" />
              <p className="cs-m0">Mein Schwerpunkt liegt auf der präzisen Gestaltung der Haarlinie und der optimalen Verteilung der transplantierten Follikel. Durch kontinuierliche Weiterbildung und den Einsatz modernster Technologien gewährleiste ich höchste Qualitätsstandards bei jedem Eingriff.</p>
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