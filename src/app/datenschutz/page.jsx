'use client'
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";

export default function DatenschutzPage() {
  return (
    <>
      <PageHeading 
        title='Datenschutzerklärung'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='DATENSCHUTZ'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='Datenschutzerklärung' 
          subtitle='Schutz Ihrer persönlichen Daten' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row justify-content-center">
          <Div className="col-lg-8">
            <Div className="cs-legal-content">
              <h3 className="cs-font_30 cs-m0">1. Datenschutz auf einen Blick</h3>
              <Spacing lg='30' md='20'/>
              
              <h4 className="cs-font_24 cs-m0">Allgemeine Hinweise</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Datenerfassung auf dieser Website</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0"><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
              <Spacing lg='10' md='5'/>
              <p className="cs-m0">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>
              <Spacing lg='15' md='10'/>
              
              <p className="cs-m0"><strong>Wie erfassen wir Ihre Daten?</strong></p>
              <Spacing lg='10' md='5'/>
              <p className="cs-m0">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>
              <Spacing lg='25' md='15'/>

              <h3 className="cs-font_30 cs-m0">2. Hosting</h3>
              <Spacing lg='30' md='20'/>
              
              <p className="cs-m0">
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              <Spacing lg='15' md='10'/>
              
              <h4 className="cs-font_24 cs-m0">Externes Hosting</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
              <Spacing lg='25' md='15'/>

              <h3 className="cs-font_30 cs-m0">3. Allgemeine Hinweise und Pflichtinformationen</h3>
              <Spacing lg='30' md='20'/>
              
              <h4 className="cs-font_24 cs-m0">Datenschutz</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzbestimmungen sowie dieser Datenschutzerklärung.
              </p>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Hinweis zur verantwortlichen Stelle</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                <strong>Medical Inn Hair</strong><br/>
                Musterstraße 123<br/>
                40210 Düsseldorf<br/>
                Deutschland<br/><br/>
                <strong>Telefon:</strong> +49 (0) 211 123456<br/>
                <strong>E-Mail:</strong> info@medicalinnhair.de
              </p>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Speicherdauer</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
              </p>
              <Spacing lg='25' md='15'/>

              <h3 className="cs-font_30 cs-m0">4. Datenerfassung auf dieser Website</h3>
              <Spacing lg='30' md='20'/>
              
              <h4 className="cs-font_24 cs-m0">Kontaktformular</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
              </p>
              <Spacing lg='25' md='15'/>

              <h3 className="cs-font_30 cs-m0">5. Ihre Rechte</h3>
              <Spacing lg='30' md='20'/>
              
              <p className="cs-m0">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              </p>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Recht auf Datenübertragbarkeit</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
              </p>
              <Spacing lg='25' md='15'/>

              <h4 className="cs-font_24 cs-m0">Auskunft, Löschung und Berichtigung</h4>
              <Spacing lg='15' md='10'/>
              <p className="cs-m0">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
              </p>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Cta 
          title='Fragen zum <br /><i>Datenschutz</i>?' 
          btnText='Kontakt aufnehmen' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  )
}