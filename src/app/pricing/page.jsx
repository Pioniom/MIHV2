'use client'
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import PricingTableList from "@/app/ui/PricingTable/PricingTableList";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import { Icon } from "@iconify/react";

const includedFeatures = [
  {
    icon: "bi:arrow-right-circle",
    title: "Ausführliche Voruntersuchung",
    description: "Detaillierte Analyse Ihres Haarausfalls und Beratung"
  },
  {
    icon: "bi:arrow-right-circle",
    title: "Modernste Techniken",
    description: "FUE Saphir und DHI Technik für beste Ergebnisse"
  },
  {
    icon: "bi:arrow-right-circle",
    title: "Nachsorgeset",
    description: "Alle notwendigen Produkte für die Nachsorge"
  },
  {
    icon: "bi:arrow-right-circle",
    title: "Kontrolluntersuchungen",
    description: "Regelmäßige Nachkontrollen für optimale Heilung"
  },
  {
    icon: "bi:arrow-right-circle",
    title: "Persönliche Betreuung",
    description: "Betreuung während des gesamten Heilungsprozesses"
  },
  {
    icon: "bi:arrow-right-circle",
    title: "Anwachsgarantie",
    description: "Garantie auf das Anwachsen der Haarfollikel"
  }
];

export default function PricingPage() {
  return (
    <>
      <PageHeading 
        title='Preise & Kosten'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='Preise'
      />
      
      <Spacing lg='150' md='80'/>
      
      <Div className="container">
        <Div className="row">
          <Div className="col-xl-5 col-lg-7">
            <SectionHeading
              title="Transparente Preise für Ihre Haartransplantation"
              subtitle="Preisübersicht"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0">
                Die folgenden Preise dienen als Orientierung. Der genaue Preis für Ihre Haartransplantation 
                hängt von Ihrem individuellen Bedarf ab und wird nach einer ausführlichen Beratung festgelegt.
              </p>
              <Spacing lg="30" md="30" />
              <Div className="cs-separator cs-accent_bg"></Div>
              <Spacing lg="25" md="40" />
            </SectionHeading>
          </Div>
        </Div>
      </Div>
      
      <Spacing lg='75' md='55'/>
      
      <Div className="container">
        <PricingTableList/>
      </Div>
      
      <Spacing lg='120' md='80'/>
      
      {/* Inklusivleistungen */}
      <Div className="container">
        <SectionHeading
          title='Im Preis enthalten'
          subtitle='Inklusivleistungen'
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
          {includedFeatures.map((feature, index) => (
            <Div key={index} className="col-lg-4 col-md-6">
              <Div className="cs-iconbox cs-style7">
                <Div className="cs-iconbox_icon">
                  <Icon icon={feature.icon} style={{ color: '#69cce6' }} />
                </Div>
                <Div className="cs-iconbox_right">
                  <h3 className="cs-iconbox_title">{feature.title}</h3>
                  <Div className="cs-iconbox_subtitle">{feature.description}</Div>
                </Div>
              </Div>
              <Spacing lg='30' md='30'/>
            </Div>
          ))}
        </Div>
      </Div>
      
      <Spacing lg='100' md='60'/>
      
      {/* Finanzierung */}
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8 offset-lg-2 text-center">
            <h2 className="cs-font_50 cs-font_20_sm cs-m0" style={{ fontSize: 'clamp(18px, 4vw, 50px)' }}>Flexible Finanzierungsmöglichkeiten</h2>
            <Spacing lg='20' md='20'/>
            <p className="cs-m0">Wir bieten verschiedene Finanzierungsoptionen an, um die Behandlung Ihren finanziellen Möglichkeiten anzupassen. Sprechen Sie uns an, um mehr über unsere Ratenzahlungsmodelle zu erfahren.</p>
          </Div>
        </Div>
      </Div>
      
      <Spacing lg='150' md='80'/>
      
      {/* CTA */}
      <Div className="container">
        <Cta 
          title='Lassen Sie uns Ihre <br />Haar<i>transformation</i> besprechen' 
          btnText='Kostenlose Beratung' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  )
}