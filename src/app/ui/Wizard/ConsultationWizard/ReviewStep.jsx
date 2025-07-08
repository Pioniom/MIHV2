'use client'
import { useState } from 'react';
import Div from '../../Div';
import WizardStep from '../WizardStep';

export default function ReviewStep({ formData, updateFormData, onNext, onPrev, onComplete, isSubmitting }) {
  const [data, setData] = useState({
    finalComments: formData.finalComments || ''
  });

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
  };

  const handleSubmit = () => {
    if (onComplete) {
      onComplete({ ...formData, ...data });
    }
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'boolean') {
      return value ? 'Ja' : 'Nein';
    }
    return value || 'Nicht angegeben';
  };

  const getGenderLabel = (gender) => {
    const labels = {
      'male': 'Männlich',
      'female': 'Weiblich',
      'diverse': 'Divers'
    };
    return labels[gender] || gender;
  };

  const getPatternLabel = (pattern) => {
    const patterns = {
      'norwood1': 'Norwood I (minimaler Haarausfall)',
      'norwood2': 'Norwood II (Geheimratsecken)',
      'norwood3': 'Norwood III (verstärkte Geheimratsecken)',
      'norwood4': 'Norwood IV (Tonsur beginnt)',
      'norwood5': 'Norwood V (Tonsur vergrößert)',
      'norwood6': 'Norwood VI (großflächiger Ausfall)',
      'norwood7': 'Norwood VII (extremer Haarausfall)',
      'ludwig1': 'Ludwig I (leichte Ausdünnung am Scheitel)',
      'ludwig2': 'Ludwig II (mittlere Ausdünnung am Scheitel)',
      'ludwig3': 'Ludwig III (starke Ausdünnung am Scheitel)',
      'diffuse': 'Diffuser Haarausfall (gleichmäßig)',
      'frontal': 'Frontaler Haarausfall'
    };
    return patterns[pattern] || pattern;
  };

  const getDensityLabel = (density) => {
    const densities = {
      'natural': 'Natürliche Dichte',
      'medium': 'Mittlere Dichte',
      'high': 'Hohe Dichte'
    };
    return densities[density] || density;
  };

  const getBudgetLabel = (budget) => {
    const budgets = {
      'budget-3000': 'Bis 3.000 €',
      'budget-5000': '3.000 - 5.000 €',
      'budget-8000': '5.000 - 8.000 €',
      'budget-10000': '8.000 - 10.000 €',
      'budget-more': 'Über 10.000 €',
      'budget-consult': 'Beratung erwünscht'
    };
    return budgets[budget] || budget;
  };

  return (
    <WizardStep
      title="Übersicht Ihrer Angaben"
      subtitle="Bitte prüfen Sie Ihre Angaben vor dem Absenden. Sie können jederzeit zurückgehen und Änderungen vornehmen."
      onPrev={onPrev}
      showNextButton={false}
    >
      <Div className="cs-review_section">
        <h4>Persönliche Daten</h4>
        <Div className="cs-review_grid">
          <Div className="cs-review_item">
            <label>Name:</label>
            <span>{formData.firstName} {formData.lastName}</span>
          </Div>
          <Div className="cs-review_item">
            <label>E-Mail:</label>
            <span>{formData.email}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Telefon:</label>
            <span>{formData.phone}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Geburtsdatum:</label>
            <span>{formData.birthDate}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Geschlecht:</label>
            <span>{getGenderLabel(formData.gender)}</span>
          </Div>
        </Div>
      </Div>

      <Div className="cs-review_section">
        <h4>Medizinische Anamnese</h4>
        <Div className="cs-review_grid">
          <Div className="cs-review_item">
            <label>Erkrankungen:</label>
            <span>{formatValue(formData.medicalConditions)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Medikamente:</label>
            <span>{formatValue(formData.currentMedications)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Allergien:</label>
            <span>{formatValue(formData.allergies)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Rauchen:</label>
            <span>{formatValue(formData.smoking)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Alkohol:</label>
            <span>{formatValue(formData.alcohol)}</span>
          </Div>
        </Div>
      </Div>

      <Div className="cs-review_section">
        <h4>Haarausfall-Analyse</h4>
        <Div className="cs-review_grid">
          <Div className="cs-review_item">
            <label>Alter bei Beginn:</label>
            <span>{formatValue(formData.ageAtOnset)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Muster:</label>
            <span>{getPatternLabel(formData.pattern)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Geschwindigkeit:</label>
            <span>{formatValue(formData.progressionRate)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Familiäre Vorgeschichte:</label>
            <span>{formatValue(formData.familyHistory)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Mögliche Ursachen:</label>
            <span>{formatValue(formData.causes)}</span>
          </Div>
        </Div>
      </Div>

      {formData.photos && formData.photos.length > 0 && (
        <Div className="cs-review_section">
          <h4>Hochgeladene Fotos</h4>
          <p>{formData.photos.length} Foto(s) hochgeladen</p>
        </Div>
      )}

      <Div className="cs-review_section">
        <h4>Erwartungen & Wünsche</h4>
        <Div className="cs-review_grid">
          <Div className="cs-review_item">
            <label>Gewünschte Dichte:</label>
            <span>{getDensityLabel(formData.desiredDensity)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Budget:</label>
            <span>{getBudgetLabel(formData.budgetRange)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Zeitrahmen:</label>
            <span>{formatValue(formData.treatmentTimeframe)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Kontaktzeit:</label>
            <span>{formatValue(formData.preferredContactTime)}</span>
          </Div>
          <Div className="cs-review_item">
            <label>Kontaktart:</label>
            <span>{formatValue(formData.preferredContactMethod)}</span>
          </Div>
        </Div>
        
        {formData.specificConcerns && (
          <Div className="cs-review_item">
            <label>Spezielle Bedenken:</label>
            <p>{formData.specificConcerns}</p>
          </Div>
        )}
      </Div>

      <Div className="cs-review_section">
        <h4>Einverständniserklärungen</h4>
        <Div className="cs-review_grid">
          <Div className="cs-review_item">
            <label>Datenverarbeitung:</label>
            <span className={formData.dataProcessingConsent ? 'cs-consent_yes' : 'cs-consent_no'}>
              {formatValue(formData.dataProcessingConsent)}
            </span>
          </Div>
          <Div className="cs-review_item">
            <label>Beratung:</label>
            <span className={formData.consultationConsent ? 'cs-consent_yes' : 'cs-consent_no'}>
              {formatValue(formData.consultationConsent)}
            </span>
          </Div>
          <Div className="cs-review_item">
            <label>Marketing:</label>
            <span className={formData.marketingConsent ? 'cs-consent_yes' : 'cs-consent_no'}>
              {formatValue(formData.marketingConsent)}
            </span>
          </Div>
          <Div className="cs-review_item">
            <label>Nutzungsbedingungen:</label>
            <span className={formData.termsAccepted ? 'cs-consent_yes' : 'cs-consent_no'}>
              {formatValue(formData.termsAccepted)}
            </span>
          </Div>
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Abschließende Bemerkungen (Optional)</label>
        <textarea
          className="cs-form_field"
          rows="4"
          value={data.finalComments}
          onChange={(e) => handleChange('finalComments', e.target.value)}
          placeholder="Haben Sie noch etwas hinzuzufügen?"
        />
      </Div>

      <Div className="cs-submit_section">
        <Div className="cs-info_box">
          <p>
            <strong>Nächste Schritte:</strong><br />
            Nach dem Absenden erhalten Sie eine Bestätigungs-E-Mail. 
            Unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden, 
            um einen Beratungstermin zu vereinbaren.
          </p>
        </Div>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="cs-btn cs-style1 cs-submit_btn"
        >
          {isSubmitting ? (
            <>
              <span>Wird gesendet...</span>
              <Div className="cs-loading_spinner"></Div>
            </>
          ) : (
            <span>Beratungsbogen absenden</span>
          )}
        </button>
      </Div>
    </WizardStep>
  );
}