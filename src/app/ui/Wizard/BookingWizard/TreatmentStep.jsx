'use client'
import { useState } from 'react';
import Div from '../../Div';
import WizardStep from '../WizardStep';

const treatmentOptions = [
  { id: 'fue', name: 'FUE Haartransplantation', desc: 'Modernste Einzelfollikel-Entnahme' },
  { id: 'dhi', name: 'DHI Technik', desc: 'Direkte Haarimplantation mit Choi-Pen' },
  { id: 'prp', name: 'PRP Therapie', desc: 'Natürliche Haarwachstumsförderung' },
  { id: 'consultation', name: 'Beratungsgespräch', desc: 'Unverbindliche Erstberatung' },
  { id: 'revision', name: 'Revision/Korrektur', desc: 'Nachbesserung vorheriger Behandlung' },
  { id: 'eyebrow', name: 'Augenbrauen Transplantation', desc: 'Natürliche Augenbrauen-Rekonstruktion' }
];

export default function TreatmentStep({ formData, updateFormData, onNext, onPrev }) {
  const [data, setData] = useState({
    treatment: formData.treatment || '',
    urgency: formData.urgency || '',
    previousTreatment: formData.previousTreatment || '',
    notes: formData.notes || ''
  });

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
  };

  const validateStep = () => {
    const errors = {};
    
    if (!data.treatment) errors.treatment = 'Bitte wählen Sie eine gewünschte Behandlung';
    if (!data.urgency) errors.urgency = 'Bitte geben Sie die Dringlichkeit an';

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return (
    <WizardStep
      title="Gewünschte Behandlung"
      subtitle="Welche Behandlung interessiert Sie? Diese Angabe hilft uns, den passenden Spezialisten für Sie zu reservieren."
      onNext={onNext}
      onPrev={onPrev}
      validation={validateStep}
    >
      <Div className="cs-form_group">
        <label>Gewünschte Behandlung *</label>
        <Div className="cs-radio_group">
          {treatmentOptions.map(option => (
            <Div key={option.id} className="cs-radio_item">
              <input
                type="radio"
                id={option.id}
                name="treatment"
                value={option.id}
                checked={data.treatment === option.id}
                onChange={(e) => handleChange('treatment', e.target.value)}
              />
              <label htmlFor={option.id}>
                <Div>
                  <strong>{option.name}</strong>
                  <small style={{ display: 'block', color: '#666', marginTop: '4px' }}>
                    {option.desc}
                  </small>
                </Div>
              </label>
            </Div>
          ))}
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Wie dringend ist Ihr Anliegen? *</label>
        <Div className="cs-radio_group">
          <Div className="cs-radio_item">
            <input
              type="radio"
              id="urgent"
              name="urgency"
              value="urgent"
              checked={data.urgency === 'urgent'}
              onChange={(e) => handleChange('urgency', e.target.value)}
            />
            <label htmlFor="urgent">Sehr dringend (nächste 2 Wochen)</label>
          </Div>
          
          <Div className="cs-radio_item">
            <input
              type="radio"
              id="normal"
              name="urgency"
              value="normal"
              checked={data.urgency === 'normal'}
              onChange={(e) => handleChange('urgency', e.target.value)}
            />
            <label htmlFor="normal">Normal (4-6 Wochen)</label>
          </Div>
          
          <Div className="cs-radio_item">
            <input
              type="radio"
              id="flexible"
              name="urgency"
              value="flexible"
              checked={data.urgency === 'flexible'}
              onChange={(e) => handleChange('urgency', e.target.value)}
            />
            <label htmlFor="flexible">Flexibel (bis 3 Monate)</label>
          </Div>
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Hatten Sie bereits eine Haartransplantation?</label>
        <Div className="cs-radio_group">
          <Div className="cs-radio_item">
            <input
              type="radio"
              id="prev_yes"
              name="previousTreatment"
              value="yes"
              checked={data.previousTreatment === 'yes'}
              onChange={(e) => handleChange('previousTreatment', e.target.value)}
            />
            <label htmlFor="prev_yes">Ja, bereits behandelt</label>
          </Div>
          
          <Div className="cs-radio_item">
            <input
              type="radio"
              id="prev_no"
              name="previousTreatment"
              value="no"
              checked={data.previousTreatment === 'no'}
              onChange={(e) => handleChange('previousTreatment', e.target.value)}
            />
            <label htmlFor="prev_no">Nein, erstmalig</label>
          </Div>
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Zusätzliche Anmerkungen</label>
        <textarea
          className="cs-form_field"
          rows="4"
          value={data.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Haben Sie spezielle Wünsche oder Fragen? (optional)"
        />
      </Div>
    </WizardStep>
  );
}