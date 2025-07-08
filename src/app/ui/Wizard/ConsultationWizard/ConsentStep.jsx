'use client'
import { useState } from 'react';
import Div from '../../Div';
import WizardStep from '../WizardStep';

export default function ConsentStep({ formData, updateFormData, onNext, onPrev }) {
  const [data, setData] = useState({
    dataProcessingConsent: formData.dataProcessingConsent || false,
    marketingConsent: formData.marketingConsent || false,
    photoConsent: formData.photoConsent || false,
    consultationConsent: formData.consultationConsent || false,
    termsAccepted: formData.termsAccepted || false
  });

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
  };

  const validateStep = () => {
    const errors = {};
    
    if (!data.dataProcessingConsent) {
      errors.dataProcessingConsent = 'Die Einwilligung zur Datenverarbeitung ist erforderlich';
    }
    if (!data.consultationConsent) {
      errors.consultationConsent = 'Die Einwilligung zur Beratung ist erforderlich';
    }
    if (!data.termsAccepted) {
      errors.termsAccepted = 'Die Zustimmung zu den Nutzungsbedingungen ist erforderlich';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return (
    <WizardStep
      title="Einverständniserklärungen"
      subtitle="Bitte bestätigen Sie die folgenden Punkte für eine rechtskonforme Bearbeitung Ihrer Anfrage."
      onNext={onNext}
      onPrev={onPrev}
      validation={validateStep}
    >
      <Div className="cs-consent_section">
        <h4>Datenschutz & Datenverarbeitung</h4>
        
        <Div className="cs-form_group">
          <Div className="cs-checkbox_item cs-consent_item">
            <input
              type="checkbox"
              id="dataProcessingConsent"
              checked={data.dataProcessingConsent}
              onChange={(e) => handleChange('dataProcessingConsent', e.target.checked)}
            />
            <label htmlFor="dataProcessingConsent">
              <strong>Datenverarbeitung (Pflicht) *</strong><br />
              Ich willige ein, dass meine persönlichen Daten und Gesundheitsdaten zum Zweck 
              der Beratung und Behandlungsplanung verarbeitet werden. Diese Einwilligung umfasst 
              die Speicherung, Verarbeitung und interne Nutzung meiner Daten durch Medical Inn Hair.
            </label>
          </Div>
        </Div>

        <Div className="cs-form_group">
          <Div className="cs-checkbox_item cs-consent_item">
            <input
              type="checkbox"
              id="consultationConsent"
              checked={data.consultationConsent}
              onChange={(e) => handleChange('consultationConsent', e.target.checked)}
            />
            <label htmlFor="consultationConsent">
              <strong>Beratung & Kontaktaufnahme (Pflicht) *</strong><br />
              Ich stimme zu, dass Medical Inn Hair mich telefonisch, per E-Mail oder WhatsApp 
              kontaktiert, um einen Beratungstermin zu vereinbaren und meine Anfrage zu bearbeiten.
            </label>
          </Div>
        </Div>

        <Div className="cs-form_group">
          <Div className="cs-checkbox_item cs-consent_item">
            <input
              type="checkbox"
              id="photoConsent"
              checked={data.photoConsent}
              onChange={(e) => handleChange('photoConsent', e.target.checked)}
            />
            <label htmlFor="photoConsent">
              <strong>Foto-Nutzung (Optional)</strong><br />
              Ich erlaube die Verwendung meiner hochgeladenen Fotos für die medizinische 
              Beurteilung und interne Dokumentation. Die Fotos werden vertraulich behandelt 
              und nicht ohne meine ausdrückliche Zustimmung an Dritte weitergegeben.
            </label>
          </Div>
        </Div>
      </Div>

      <Div className="cs-consent_section">
        <h4>Marketing & Kommunikation</h4>
        
        <Div className="cs-form_group">
          <Div className="cs-checkbox_item cs-consent_item">
            <input
              type="checkbox"
              id="marketingConsent"
              checked={data.marketingConsent}
              onChange={(e) => handleChange('marketingConsent', e.target.checked)}
            />
            <label htmlFor="marketingConsent">
              <strong>Marketing-Kommunikation (Optional)</strong><br />
              Ich möchte über neue Behandlungsmethoden, Angebote und Informationen 
              rund um Haartransplantationen informiert werden. Diese Einwilligung 
              kann jederzeit widerrufen werden.
            </label>
          </Div>
        </Div>
      </Div>

      <Div className="cs-consent_section">
        <h4>Nutzungsbedingungen</h4>
        
        <Div className="cs-form_group">
          <Div className="cs-checkbox_item cs-consent_item">
            <input
              type="checkbox"
              id="termsAccepted"
              checked={data.termsAccepted}
              onChange={(e) => handleChange('termsAccepted', e.target.checked)}
            />
            <label htmlFor="termsAccepted">
              <strong>Nutzungsbedingungen (Pflicht) *</strong><br />
              Ich habe die{' '}
              <a href="/datenschutz" target="_blank" rel="noopener noreferrer">
                Datenschutzerklärung
              </a>{' '}
              und die{' '}
              <a href="/agb" target="_blank" rel="noopener noreferrer">
                Allgemeinen Geschäftsbedingungen
              </a>{' '}
              gelesen und stimme diesen zu.
            </label>
          </Div>
        </Div>
      </Div>

      <Div className="cs-info_box">
        <h5>Ihre Rechte</h5>
        <p>
          Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung oder 
          Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Darüber hinaus 
          steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
        </p>
        <p>
          <strong>Widerruf:</strong> Sie können Ihre Einwilligung jederzeit per E-Mail an 
          datenschutz@medicaliinnhair.de oder telefonisch unter +49 211 123456 widerrufen.
        </p>
      </Div>

      <Div className="cs-legal_notice">
        <small>
          * Pflichtfelder sind für die Bearbeitung Ihrer Anfrage erforderlich. 
          Ohne diese Angaben können wir Ihnen keine Beratung anbieten.
        </small>
      </Div>
    </WizardStep>
  );
}