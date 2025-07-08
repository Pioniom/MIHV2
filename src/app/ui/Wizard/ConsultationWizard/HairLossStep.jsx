'use client'
import { useState } from 'react';
import Div from '../../Div';
import WizardStep from '../WizardStep';

const hairLossPatternsMale = [
  { id: 'norwood1', label: 'Norwood I (minimaler Haarausfall)' },
  { id: 'norwood2', label: 'Norwood II (Geheimratsecken)' },
  { id: 'norwood3', label: 'Norwood III (verstärkte Geheimratsecken)' },
  { id: 'norwood4', label: 'Norwood IV (Tonsur beginnt)' },
  { id: 'norwood5', label: 'Norwood V (Tonsur vergrößert)' },
  { id: 'norwood6', label: 'Norwood VI (großflächiger Ausfall)' },
  { id: 'norwood7', label: 'Norwood VII (extremer Haarausfall)' }
];

const hairLossPatternsFemale = [
  { id: 'ludwig1', label: 'Ludwig I (leichte Ausdünnung am Scheitel)' },
  { id: 'ludwig2', label: 'Ludwig II (mittlere Ausdünnung am Scheitel)' },
  { id: 'ludwig3', label: 'Ludwig III (starke Ausdünnung am Scheitel)' },
  { id: 'diffuse', label: 'Diffuser Haarausfall (gleichmäßig)' },
  { id: 'frontal', label: 'Frontaler Haarausfall' }
];

export default function HairLossStep({ formData, updateFormData, onNext, onPrev }) {
  const [data, setData] = useState({
    gender: formData.gender || '',
    ageAtOnset: formData.ageAtOnset || '',
    pattern: formData.pattern || '',
    currentStage: formData.currentStage || '',
    familyHistory: formData.familyHistory || '',
    causes: formData.causes || [],
    previousTreatments: formData.previousTreatments || '',
    progressionRate: formData.progressionRate || ''
  });

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
  };

  const handleArrayChange = (field, value, checked) => {
    const currentArray = data[field] || [];
    let newArray;
    
    if (checked) {
      newArray = [...currentArray, value];
    } else {
      newArray = currentArray.filter(item => item !== value);
    }
    
    const newData = { ...data, [field]: newArray };
    setData(newData);
    updateFormData(newData);
  };

  const patterns = data.gender === 'female' ? hairLossPatternsFemale : hairLossPatternsMale;

  const causes = [
    'Genetische Veranlagung',
    'Hormonelle Veränderungen',
    'Stress',
    'Medikamente',
    'Krankheit',
    'Mangelernährung',
    'Haarstyling/Chemische Behandlungen',
    'Unbekannt'
  ];

  return (
    <WizardStep
      title="Haarausfall-Analyse"
      subtitle="Helfen Sie uns, Ihr Haarausfall-Muster zu verstehen, um die beste Behandlung zu empfehlen."
      onNext={onNext}
      onPrev={onPrev}
    >
      <Div className="cs-form_group">
        <label>In welchem Alter begann Ihr Haarausfall? *</label>
        <select
          className="cs-form_field"
          value={data.ageAtOnset}
          onChange={(e) => handleChange('ageAtOnset', e.target.value)}
        >
          <option value="">Bitte wählen</option>
          <option value="under-20">Unter 20 Jahren</option>
          <option value="20-25">20-25 Jahre</option>
          <option value="26-30">26-30 Jahre</option>
          <option value="31-35">31-35 Jahre</option>
          <option value="36-40">36-40 Jahre</option>
          <option value="41-45">41-45 Jahre</option>
          <option value="46-50">46-50 Jahre</option>
          <option value="over-50">Über 50 Jahre</option>
        </select>
      </Div>

      {patterns && (
        <Div className="cs-form_group">
          <label>Welches Haarausfall-Muster beschreibt Ihre Situation am besten? *</label>
          <Div className="cs-radio_group">
            {patterns.map(pattern => (
              <Div key={pattern.id} className="cs-radio_item">
                <input
                  type="radio"
                  id={pattern.id}
                  name="pattern"
                  value={pattern.id}
                  checked={data.pattern === pattern.id}
                  onChange={(e) => handleChange('pattern', e.target.value)}
                />
                <label htmlFor={pattern.id}>{pattern.label}</label>
              </Div>
            ))}
          </Div>
        </Div>
      )}

      <Div className="cs-form_group">
        <label>Wie würden Sie die Geschwindigkeit des Haarausfalls beschreiben?</label>
        <select
          className="cs-form_field"
          value={data.progressionRate}
          onChange={(e) => handleChange('progressionRate', e.target.value)}
        >
          <option value="">Bitte wählen</option>
          <option value="very-slow">Sehr langsam (über mehrere Jahre)</option>
          <option value="slow">Langsam (innerhalb von 2-3 Jahren)</option>
          <option value="moderate">Mäßig (innerhalb eines Jahres)</option>
          <option value="fast">Schnell (innerhalb weniger Monate)</option>
          <option value="very-fast">Sehr schnell (innerhalb weniger Wochen)</option>
        </select>
      </Div>

      <Div className="cs-form_group">
        <label>Gibt es Haarausfall in Ihrer Familie?</label>
        <Div className="cs-radio_group">
          <Div className="cs-radio_item">
            <input
              type="radio"
              id="family-yes"
              name="familyHistory"
              value="yes"
              checked={data.familyHistory === 'yes'}
              onChange={(e) => handleChange('familyHistory', e.target.value)}
            />
            <label htmlFor="family-yes">Ja</label>
          </Div>
          <Div className="cs-radio_item">
            <input
              type="radio"
              id="family-no"
              name="familyHistory"
              value="no"
              checked={data.familyHistory === 'no'}
              onChange={(e) => handleChange('familyHistory', e.target.value)}
            />
            <label htmlFor="family-no">Nein</label>
          </Div>
          <Div className="cs-radio_item">
            <input
              type="radio"
              id="family-unknown"
              name="familyHistory"
              value="unknown"
              checked={data.familyHistory === 'unknown'}
              onChange={(e) => handleChange('familyHistory', e.target.value)}
            />
            <label htmlFor="family-unknown">Unbekannt</label>
          </Div>
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Was könnte Ihrer Meinung nach die Ursache für Ihren Haarausfall sein? (Mehrfachauswahl möglich)</label>
        <Div className="cs-checkbox_group">
          {causes.map(cause => (
            <Div key={cause} className="cs-checkbox_item">
              <input
                type="checkbox"
                id={cause}
                checked={data.causes?.includes(cause) || false}
                onChange={(e) => handleArrayChange('causes', cause, e.target.checked)}
              />
              <label htmlFor={cause}>{cause}</label>
            </Div>
          ))}
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Haben Sie bereits Behandlungen gegen Haarausfall ausprobiert?</label>
        <textarea
          className="cs-form_field"
          rows="4"
          value={data.previousTreatments}
          onChange={(e) => handleChange('previousTreatments', e.target.value)}
          placeholder="Beschreiben Sie bisherige Behandlungen (Medikamente, Shampoos, andere Methoden) und deren Wirkung"
        />
      </Div>
    </WizardStep>
  );
}