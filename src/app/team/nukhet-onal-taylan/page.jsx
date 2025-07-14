'use client'
import Cta from "@/app/ui/Cta"
import Div from "@/app/ui/Div"
import PageHeading from "@/app/ui/PageHeading"
import Spacing from "@/app/ui/Spacing"
import SocialWidget from "@/app/ui/Widget/SocialWidget"
import imgUrl from '../../../../public/images/member_1.webp'
import Image from "next/image"

export default function NukhetOnalTaylan() {
  return (
    <>
      <PageHeading
        title='Nükhet Önal Taylan'
        bgSrc='/images/team_hero_bg.jpeg'
        pageLinkText='Team Details'
      />
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-radius_15 cs-shine_hover_1">
              <Image src={imgUrl} alt="Nükhet Önal Taylan" className="w-100" placeholder="blur" />
            </Div>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <Spacing lg='0' md='45'/>
            <Div className="cs-section_heading cs-style1">
              <h2 className="cs-section_title">Nükhet Önal Taylan</h2>
              <Div className="cs-height_10 cs-height_lg_10" />
              <h3 className="cs-section_subtitle">CEO Medical Inn Hair</h3>
              <Div className="cs-height_5 cs-height_lg_5" />
              <Div className="cs-separator cs-accent_bg" />
              <Div className="cs-height_45 cs-height_lg_25" />
              <p className="cs-m0">Als CEO von Medical Inn Hair bringe ich über 15 Jahre Erfahrung in der Gesundheitsbranche mit. Meine Leidenschaft gilt der innovativen Haartransplantation und der kontinuierlichen Weiterentwicklung unserer Behandlungsmethoden. Ich sorge dafür, dass jeder Patient die bestmögliche Betreuung und natürliche Ergebnisse erhält.</p>
              <Div className="cs-height_25 cs-height_lg_20" />
              <p className="cs-m0">Mein Fokus liegt auf der Qualitätssicherung und der Implementierung modernster Technologien wie FUE und DHI. Durch meine Führung hat sich Medical Inn Hair zu einer der führenden Privatkliniken für Haartransplantationen in Düsseldorf entwickelt.</p>
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