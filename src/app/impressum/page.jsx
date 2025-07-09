'use client'
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";

export default function ImpressumPage() {
  return (
    <>
      <PageHeading 
        title='Impressum'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='IMPRESSUM'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='Impressum' 
          subtitle='Gesetzliche Angaben' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row justify-content-center">
          <Div className="col-lg-8">
            <Div className="cs-legal-content">
              <h3 className="cs-font_30 cs-m0">Angaben gemäß § 5 TMG</h3>
              <Spacing lg='30' md='20'/>
              
              <p className="cs-m0"><strong>Medical Inn Hair GmbH</strong><br/>
              Georg-Glock-Straße 8<br/>
              40474 Düsseldorf<br/>
              Deutschland</p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Kontakt</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                <strong>Telefon:</strong> 0211 26159 299 oder +49 176 41696566<br/>
                <strong>Telefax:</strong> 0211 26159 767<br/>
                <strong>E-Mail:</strong> info@medical-inn-hair.com oder info@medicalinnhair.com
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Vertretungsberechtigte</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">Nükhet Taylan & Prof. CH. Dr.med Mehmet Atila</p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Registereintrag</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                <strong>Eintragung im Handelsregister.</strong><br/>
                <strong>Registergericht:</strong> Düsseldorf<br/>
                <strong>Registernummer:</strong> HRB 12345
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Umsatzsteuer-ID</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                <strong>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</strong><br/>
                DE123456789
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Aufsichtsbehörde</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">Gesundheitsamt Düsseldorf</p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Berufshaftpflichtversicherung</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                <strong>Name und Sitz des Versicherers:</strong><br/>
                Medical Insurance Company<br/>
                Insurance Street 1<br/>
                40474 Düsseldorf<br/>
                Deutschland
              </p>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                <strong>Geltungsbereich der Versicherung:</strong> Deutschland
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Berufsrechtliche Regelungen</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Die Ärzte von Medical Inn Hair unterliegen den berufsrechtlichen Regelungen der deutschen Ärztekammer und des deutschen Gesundheitsministeriums.
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">EU-Streitschlichtung</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="cs-text_color_1">https://ec.europa.eu/consumers/odr/</a>
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Haftung für Inhalte</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Haftung für Links</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Urheberrecht</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Cta 
          title='Haben Sie Fragen zu <br />unserem <i>Impressum</i>?' 
          btnText='Kontakt aufnehmen' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  )
}