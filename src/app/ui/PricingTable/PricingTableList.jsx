import React from 'react'
import { useState } from 'react'
import PricingTable from '.'
import Section from '../Div'
import Spacing from '../Spacing'

export default function PricingTableList() {
  const [tab, setTab] = useState('fue')
  return (
    <Section className="position-relative">
      <ul className="cs-tab_links cs-style1 cs-mp0 cs-primary_font">
        <li className={tab === 'fue' ? "active" : ""} onClick={()=>setTab('fue')}>FUE Saphir</li>
        <li className={tab === 'dhi' ? "active" : ""} onClick={()=>setTab('dhi')}>DHI Technik</li>
        <li className={tab === 'prp' ? "active" : ""} onClick={()=>setTab('prp')}>PRP Therapie</li>
        <li className={tab === 'special' ? "active" : ""} onClick={()=>setTab('special')}>Spezialbehandlungen</li>
      </ul>
      
      {/* FUE Saphir Tab */}
      {tab === 'fue' && (
        <Section className="row">
          <Section className="col-lg-4 col-md-6">
            <PricingTable 
              title='Geheimratsecken'
              price='3.500 - 4.500'
              currency='€'
              timeline='500 - 1.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'FUE Saphir Technik', 'Lokale Anästhesie', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
          <Section className="col-lg-4 col-md-6">
            <PricingTable 
              title='Rezedierende Haarlinie'
              price='3.800 - 4.800'
              currency='€'
              timeline='1.500 - 2.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'FUE Saphir Technik', 'Lokale Anästhesie', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
          <Section className="col-lg-4 col-md-6">
            <PricingTable 
              title='Tonsur'
              price='3.800 - 5.500'
              currency='€'
              timeline='1.500 - 4.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'FUE Saphir Technik', 'Lokale Anästhesie', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
          <Section className="col-lg-4 col-md-6">
            <PricingTable 
              title='Halbglatze'
              price='4.200 - 5.500'
              currency='€'
              timeline='2.500 - 4.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'FUE Saphir Technik', 'Lokale Anästhesie', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
          <Section className="col-lg-4 col-md-6">
            <PricingTable 
              title='Weit fortgeschrittener Haarausfall'
              price='6.000 - 8.500'
              currency='€'
              timeline='> 4.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'FUE Saphir Technik', 'Meist 2 Operationen nötig', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
        </Section>
      )}

      {/* DHI Tab */}
      {tab === 'dhi' && (
        <Section className="row">
          <Section className="col-lg-4 col-md-6">
            <PricingTable 
              title='Geheimratsecken'
              price='4.000 - 5.000'
              currency='€'
              timeline='500 - 1.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'DHI Technik (Non-shaved möglich)', '+500€ Aufpreis zur FUE', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
          <Section className="col-lg-4 col-md-6">
            <PricingTable 
              title='Rezedierende Haarlinie'
              price='4.300 - 5.300'
              currency='€'
              timeline='1.500 - 2.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'DHI Technik (Non-shaved möglich)', '+500€ Aufpreis zur FUE', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
          <Section className="col-lg-4 col-md-6">
            <PricingTable 
              title='Tonsur'
              price='4.300 - 6.000'
              currency='€'
              timeline='1.500 - 3.000 Grafts'
              features={['Ausführliche Voruntersuchung', 'DHI Technik (Non-shaved möglich)', '+500€ Aufpreis bis max. 3.000 Grafts', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
          <Section className="col-lg-4 col-md-6">
            <PricingTable 
              title='Halbglatze'
              price='4.700 - 6.000'
              currency='€'
              timeline='2.500 - 3.000 Grafts'
              features={['Ausführliche Voruntersuchung', 'DHI Technik (Non-shaved möglich)', '+500€ Aufpreis bis max. 3.000 Grafts', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
        </Section>
      )}

      {/* PRP Tab */}
      {tab === 'prp' && (
        <Section className="row">
          <Section className="col-lg-3 col-md-6">
            <PricingTable 
              title='Einzelsitzung'
              price='250'
              currency='€'
              timeline='pro Sitzung'
              features={['Eigenblutbehandlung', 'Wachstumsfaktoren', 'Minimal-invasiv', 'Keine Ausfallzeiten', 'Natürliche Behandlung', 'Sofort anwendbar']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
          <Section className="col-lg-3 col-md-6">
            <PricingTable 
              title='3er Paket'
              price='220'
              currency='€'
              timeline='pro Sitzung'
              features={['Eigenblutbehandlung', 'Wachstumsfaktoren', 'Minimal-invasiv', 'Keine Ausfallzeiten', 'Natürliche Behandlung', 'Paketpreis-Vorteil']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
          <Section className="col-lg-3 col-md-6">
            <PricingTable 
              title='6er Paket'
              price='200'
              currency='€'
              timeline='pro Sitzung'
              features={['Eigenblutbehandlung', 'Wachstumsfaktoren', 'Minimal-invasiv', 'Keine Ausfallzeiten', 'Natürliche Behandlung', 'Bester Preis-Vorteil']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
          <Section className="col-lg-3 col-md-6">
            <PricingTable 
              title='Nach Haartransplantation'
              price='180'
              currency='€'
              timeline='pro Sitzung'
              features={['Eigenblutbehandlung', 'Wachstumsfaktoren', 'Unterstützt Heilung', 'Optimiert Ergebnisse', 'Spezialpreis für HT-Patienten', 'Nachsorge-Paket']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
        </Section>
      )}

      {/* Spezialbehandlungen Tab */}
      {tab === 'special' && (
        <Section className="row">
          <Section className="col-lg-4 col-md-6">
            <PricingTable 
              title='Barttransplantation'
              price='4.500'
              currency='€'
              timeline='Komplettbehandlung'
              features={['Ausführliche Voruntersuchung', 'FUE Saphir Technik', 'Individuelles Design', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
          <Section className="col-lg-4 col-md-6">
            <PricingTable 
              title={<>Augenbrauen-<br />transplantation</>}
              price='3.000'
              currency='€'
              timeline='300 - 800 Grafts'
              features={['Ausführliche Voruntersuchung', 'FUE Saphir Technik', 'Präzise Technik', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
            <Spacing lg='25' md='25'/>
          </Section>
        </Section>
      )}
    </Section>
  )
}
