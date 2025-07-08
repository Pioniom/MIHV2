'use client'
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import Sidebar from "@/app/ui/Sidebar.jsx/index.jsx";
import Spacing from "@/app/ui/Spacing";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import imgUrl from '../../../../public/images/post_5.jpeg';

export default function BlogDetailsPage() {
  return (
    <>
    {/* Start Page Heading Section */}
      <PageHeading
        title='Ratgeber Details'
        bgSrc='/images/blog_details_hero_bg.jpeg'
        pageLinkText='ratgeber-details'
      />
      {/* End Page Heading Section */}

      {/* Start Blog Details */}
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">

            {/* Start Details Post Content */}
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <Image src={imgUrl} alt="Post" className="w-100 cs-radius_15" placeholder="blur" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">20 Februar 2024</span>
                  <Link href="/blog" className="cs-post_avatar">Nachsorge</Link>
                </Div>
                <h2 className="cs-post_title">Nachsorge bei Haartransplantation: 10 wichtige Tipps für optimale Ergebnisse</h2>
                <p>Die richtige Nachsorge nach einer Haartransplantation ist entscheidend für den langfristigen Erfolg des Eingriffs. Bei Medical Inn Hair in Düsseldorf begleiten wir Sie durch jeden Schritt der Heilungsphase und stellen sicher, dass Sie alle wichtigen Informationen für eine optimale Regeneration erhalten.</p>
                <blockquote className="cs-primary_font">
                  "Eine sorgfältige Nachsorge ist der Schlüssel zu natürlichen und dauerhaften Ergebnissen. Jeder Patient erhält bei uns einen individuellen Nachsorgeplan für optimale Heilung."
                  <small>Dr. med. Mehmet Atila, Medical Inn Hair</small>
                </blockquote>
                <p>In den ersten Wochen nach der Haartransplantation ist besondere Vorsicht geboten. Die transplantierten Haarfollikel sind in dieser Zeit besonders empfindlich und benötigen Zeit, um sich in ihrer neuen Position zu etablieren. Eine sachgemäße Pflege fördert nicht nur die Heilung, sondern minimiert auch das Risiko von Komplikationen und sorgt für das bestmögliche ästhetische Ergebnis.</p>
                <Div className="row">
                  <Div className="col-md-6">
                    <img src="/images/blog_details_img_1.jpeg" alt="Blog Details" className="cs-radius_15 w-100" />
                    <Div className="cs-height_45 cs-height_lg_45" />
                  </Div>
                  <Div className="col-md-6">
                    <img src="/images/blog_details_img_2.jpeg" alt="Blog Details" className="cs-radius_15 w-100" />
                    <Div className="cs-height_45 cs-height_lg_45" />
                  </Div>
                </Div>
                <h3>Die wichtigsten Nachsorge-Tipps im Detail</h3>
                <p>Die ersten 48 Stunden sind kritisch: Vermeiden Sie jeglichen Kontakt mit der behandelten Kopfhaut. Schlafen Sie mit erhöhtem Kopf und verwenden Sie die von uns empfohlenen Pflegeprodukte. Ab dem dritten Tag können Sie mit der sanften Reinigung beginnen, jedoch nur mit den speziell dafür vorgesehenen Lösungen.</p>
                <p>Sport und körperliche Anstrengung sollten für mindestens zwei Wochen vermieden werden. Direkte Sonneneinstrahlung und Saunabesuche sind in den ersten vier Wochen tabu. Die transplantierten Haare werden nach etwa zwei bis drei Wochen ausfallen - das ist völlig normal und Teil des natürlichen Heilungsprozesses.</p>
              </Div>
            </Div>
            {/* End Details Post Content */}

            {/* Start Comment Section */}
            <Spacing lg='30' md='30'/>
            <h2 className="cs-font_50 cs-m0">Kommentar hinterlassen</h2>
            <Spacing lg='5' md='5'/>
            <p className="cs-m0">Ihre E-Mail-Adresse wird nicht veröffentlicht. Erforderliche Felder sind markiert *</p>
            <Spacing lg='40' md='30'/>
            <form className="row">
              <Div className="col-lg-6">
                <label>Vollständiger Name*</label>
                <input type="text" className="cs-form_field" />
                <Div className="cs-height_20 cs-height_lg_20" />
                <Div data-lastpass-icon-root="true" style={{position: 'relative !important', height: '0px !important', width: '0px !important', float: 'left !important'}} />
              </Div>
              <Div className="col-lg-6">
                <label>E-Mail*</label>
                <input type="text" className="cs-form_field" />
                <Div className="cs-height_20 cs-height_lg_20" />
              </Div>
              <Div className="col-lg-12">
                <label>Website*</label>
                <input type="text" className="cs-form_field" />
                <Div className="cs-height_20 cs-height_lg_20" />
              </Div>
              <Div className="col-lg-12">
                <label>Ihr Kommentar*</label>
                <textarea cols={30} rows={7} className="cs-form_field" />
                <Div className="cs-height_25 cs-height_lg_25" />
              </Div>
              <Div className="col-lg-12">
                <button className="cs-btn cs-style1">
                  <span>Kommentar senden</span>
                  <Icon icon="bi:arrow-right" />               
                </button>
              </Div>
            </form>
            {/* End Comment Section */}
          </Div>
          <Div className="col-xl-3 col-lg-4 offset-xl-1">
            {/* Start Sidebar */}
            <Spacing lg='0' md='80'/>
            <Sidebar />
            {/* End Sidebar */}
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      {/* Start Blog Details */}

      {/* Start CTA Section */}
      <Div className="container">
        <Cta 
          title='Lassen Sie uns Ihre <br />Haar<i>transformation</i> besprechen' 
          btnText='Beratung buchen' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
      {/* End CTA Section */}
    </>
  )
}