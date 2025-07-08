'use client'
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import Image from "next/image";
import imgUrl from '../../../../public/images/case_study_img_1.jpeg'

export default function CaseStudyDetailsPage() {
  return (
    <>
      <PageHeading
        title="Fallstudien Details"
        bgSrc="/images/contact_hero_bg.jpeg"
        pageLinkText="Fallstudien Details"
      />
      <Spacing lg="145" md="80" />
      <Div className="container">
        <SectionHeading
          title="Erfolgreiche Haartransplantation - Ein komplexer Fall mit außergewöhnlichen Ergebnissen"
          subtitle="Fallstudie"
          variant="cs-style1 text-center"
        />
        <Spacing lg="90" md="45" />
        <Image
          src={imgUrl}
          alt="Haartransplantation Ergebnis"
          className="w-100 cs-radius_15"
          placeholder="blur"
        />
        <Spacing lg="140" md="80" />
        <h2 className="cs-font_38 text-center">Fallstudie Übersicht</h2>
        <Spacing lg="60" md="45" />
        <p className="cs-m0">
          Diese Fallstudie zeigt die erfolgreiche Behandlung eines 34-jährigen Patienten mit fortgeschrittenem Haarausfall (Norwood-Skala VII). 
          Der Patient litt unter einem extremen Haarverlust, der sowohl die Frontlinie als auch den gesamten Oberkopf betraf. 
          Nach einer detaillierten Analyse entschieden wir uns für eine Kombinationsbehandlung aus FUE und DHI Methoden, um optimale Ergebnisse zu erzielen.
          <br /><br />
          Die Herausforderung lag in der großflächigen Abdeckung bei begrenztem Spenderbereich. Durch innovative Techniken und präzise Planung 
          konnten wir 4.200 hochqualitative Grafts transplantieren und eine natürliche, dichte Haarpracht wiederherstellen.
        </p>
        <Spacing lg="65" md="45" />
        <Div className="row">
          <Div className="col-sm-6">
            <img
              src="/images/case_study_img_2.jpeg"
              alt="Vorher Zustand"
              className="w-100 cs-radius_5"
            />
            <Spacing lg="25" md="25" />
          </Div>
          <Div className="col-sm-6">
            <img
              src="/images/case_study_img_3.jpeg"
              alt="Nachher Ergebnis"
              className="w-100 cs-radius_5"
            />
            <Spacing lg="25" md="25" />
          </Div>
        </Div>
        <Spacing lg="125" md="55" />
      </Div>
      <Div className="cs-gradient_bg_1 cs-shape_wrap_6">
        <Div className="cs-shape_2"></Div>
        <Div className="cs-shape_2"></Div>
        <Div className="container">
          <Spacing lg="145" md="80" />
          <h2 className="cs-font_38 text-center">Behandlungsanalyse</h2>
          <Spacing lg="90" md="45" />
          <Div className="row align-items-center cs-column_reverse_lg">
            <Div className="col-lg-5">
              <h3 className="cs-font_30 cs-m0">Behandlungsstrategie</h3>
              <Spacing lg="45" md="30" />
              <p className="cs-m0">
                Unser Ansatz basierte auf einer gründlichen Analyse der Spenderzone und der zu behandelnden Bereiche. 
                Wir entwickelten eine maßgeschneiderte Strategie, die FUE-Saphir-Technologie für die Hauptbereiche und 
                DHI-Choi-Pen-Technik für die präzise Haarlinienerstellung kombinierte.
                <br />
                <br />
                Die Behandlung erfolgte in einer Session über 8 Stunden mit unserem erfahrenen Team unter Leitung von 
                Dr. med. Mehmet Atila. Besonderes Augenmerk lag auf der natürlichen Haarrichtung und der optimalen 
                Graftverteilung für maximale Dichte.
              </p>
            </Div>
            <Div className="col-lg-6 offset-lg-1 text-center">
              <Div className="cs-portfolio_img_in cs-shine_hover_1 rounded-circle">
                <img
                  src="/images/case_study_img_4.png"
                  alt="Behandlungsprozess"
                  className="w-100"
                />
              </Div>
              <Spacing lg="0" md="40" />
            </Div>
          </Div>
          <Spacing lg="100" md="80" />
          <Div className="row align-items-center">
            <Div className="col-lg-6 text-center">
              <Div className="cs-portfolio_img_in cs-shine_hover_1 rounded-circle">
                <img
                  src="/images/case_study_img_5.png"
                  alt="Nachsorge Konzept"
                  className="w-100"
                />
              </Div>
              <Spacing lg="0" md="40" />
            </Div>
            <Div className="col-lg-5 offset-lg-1">
              <h3 className="cs-font_30 cs-m0">Nachsorge Konzept</h3>
              <Spacing lg="45" md="30" />
              <p className="cs-m0">
                Ein umfassendes Nachsorge-Programm war entscheidend für den Erfolg dieser komplexen Behandlung. 
                Der Patient erhielt detaillierte Pflegeanweisungen und wurde regelmäßig in unserem Düsseldorfer 
                Zentrum betreut. PRP-Therapie-Sitzungen unterstützten die Heilung und das Haarwachstum.
                <br />
                <br />
                Nach 12 Monaten zeigten sich die finalen Ergebnisse: eine vollständige Transformation mit 
                natürlicher Haardichte und perfekter Integration der transplantierten Bereiche. Die Patientenzufriedenheit 
                war außergewöhnlich hoch.
              </p>
            </Div>
          </Div>
          <Spacing lg="150" md="80" />
        </Div>
      </Div>
      <Spacing lg="140" md="80" />
      <Div className="container text-center">
        <Div className="row col-lg-10 offset-lg-1">
          <h2 className="cs-font_38 cs-m0">Ergebnis der Fallstudie</h2>
          <Spacing lg="60" md="45" />
          <p className="cs-m0">
            Das Endergebnis nach 12 Monaten übertraf alle Erwartungen. Der Patient erzielte eine natürliche 
            Haardichte von 85-90 Grafts pro cm² in den transplantierten Bereichen. Die Anwuchsrate betrug 
            beeindruckende 96%, was deutlich über dem Branchendurchschnitt liegt.
            <br /><br />
            Diese Fallstudie demonstriert die Expertise von Medical Inn Hair bei der Behandlung komplexer 
            Haarausfälle. Durch die Kombination modernster Techniken, individueller Behandlungsplanung und 
            umfassender Nachsorge erzielen wir auch bei schwierigsten Ausgangssituationen hervorragende Ergebnisse.
            <br /><br />
            Der Patient berichtete von einem deutlich gestärkten Selbstbewusstsein und einer verbesserten 
            Lebensqualität. Seine Zufriedenheit mit dem Ergebnis und unserem Service spiegelt unseren 
            Anspruch an höchste Qualität in der Haartransplantation wider.
          </p>
        </Div>
      </Div>
      <Spacing lg="145" md="80" />
      {/* Start CTA Section */}
      <Div className="container">
        <Cta
          title="Lassen Sie uns Ihren <br />Fall <i>analysieren</i>"
          btnText="Beratung buchen"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}