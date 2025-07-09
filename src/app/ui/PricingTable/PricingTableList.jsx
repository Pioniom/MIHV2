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
      </ul>
      <Section className="row">
        <Section className="col-lg-4">
          {tab==='fue' && (
            <PricingTable 
              title='Geheimratsecken'
              price='3.500 - 4.000'
              currency='€'
              timeline='500 - 1.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'FUE Saphir Technik', 'Lokale Anästhesie', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
          )}
          {tab==='dhi' && (
            <PricingTable 
              title='Geheimratsecken'
              price='4.500 - 5.000'
              currency='€'
              timeline='500 - 1.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'DHI Technik', 'Lokale Anästhesie', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
          )}
          {tab==='prp' && (
            <PricingTable 
              title='Einzelsitzung'
              price='250'
              currency='€'
              timeline='pro Sitzung'
              features={['Eigenblutbehandlung', 'Wachstumsfaktoren', 'Minimal-invasiv', 'Keine Ausfallzeiten', 'Natürliche Behandlung', 'Sofort anwendbar']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
          )}
          <Spacing lg='25' md='25'/>
        </Section>
        <Section className="col-lg-4">
         {tab==='fue' && (
            <PricingTable 
              title='Halbglatze'
              price='4.500 - 7.000'
              currency='€'
              timeline='2.500 - 4.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'FUE Saphir Technik', 'Lokale Anästhesie', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
          )}
          {tab==='dhi' && (
            <PricingTable 
              title='Halbglatze'
              price='5.500 - 8.000'
              currency='€'
              timeline='2.500 - 4.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'DHI Technik', 'Lokale Anästhesie', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
          )}
          {tab==='prp' && (
            <PricingTable 
              title='3er Paket'
              price='220'
              currency='€'
              timeline='pro Sitzung'
              features={['Eigenblutbehandlung', 'Wachstumsfaktoren', 'Minimal-invasiv', 'Keine Ausfallzeiten', 'Natürliche Behandlung', 'Paketpreis-Vorteil']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
          )}
          <Spacing lg='25' md='25'/>
        </Section>
        <Section className="col-lg-4">
          {tab==='fue' && (
            <PricingTable 
              title='Weit fortgeschritten'
              price='7.000 - 8.000'
              currency='€'
              timeline='> 4.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'FUE Saphir Technik', 'Lokale Anästhesie', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
          )}
          {tab==='dhi' && (
            <PricingTable 
              title='Weit fortgeschritten'
              price='8.000 - 9.000'
              currency='€'
              timeline='> 4.500 Grafts'
              features={['Ausführliche Voruntersuchung', 'DHI Technik', 'Lokale Anästhesie', 'Nachsorgeset inklusive', 'Kontrolluntersuchungen', 'Persönliche Betreuung']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
          )}
          {tab==='prp' && (
            <PricingTable 
              title='6er Paket'
              price='200'
              currency='€'
              timeline='pro Sitzung'
              features={['Eigenblutbehandlung', 'Wachstumsfaktoren', 'Minimal-invasiv', 'Keine Ausfallzeiten', 'Natürliche Behandlung', 'Bester Preis-Vorteil']}
              btnText='Beratung buchen'
              btnLink='/contact'
            />
          )}
          <Spacing lg='25' md='25'/>
        </Section>
      </Section>
    </Section>
  )
}
