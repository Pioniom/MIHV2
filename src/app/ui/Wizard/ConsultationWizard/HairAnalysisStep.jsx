'use client'
import { useState } from 'react';
import Div from '../../Div';
import WizardStep from '../WizardStep';

const hairLossPatterns = [
  { id: 'male_pattern', name: 'Männlicher Haarausfall (Geheimratsecken/Tonsur)' },
  { id: 'female_pattern', name: 'Weiblicher Haarausfall (diffuser Haarausfall)' },
  { id: 'alopecia_areata', name: 'Kreisrunder Haarausfall' },
  { id: 'diffuse', name: 'Diffuser Haarausfall' },
  { id: 'frontal', name: 'Nur im Stirnbereich' },
  { id: 'crown', name: 'Nur am Oberkopf' },
  { id: 'total', name: 'Großflächiger Haarausfall' }
];

const norwood_scale = [
  { level: 'NW1', desc: 'Kein Haarausfall' },
  { level: 'NW2', name: 'Leichte Geheimratsecken' },
  { level: 'NW3', name: 'Deutliche Geheimratsecken' },
  { level: 'NW4', name: 'Geheimratsecken + beginnende Tonsur' },
  { level: 'NW5', name: 'Fortgeschrittener Haarausfall' },
  { level: 'NW6', name: 'Starker Haarausfall' },
  { level: 'NW7', name: 'Sehr starker Haarausfall' }
];

export default function HairAnalysisStep({ formData, updateFormData, onNext, onPrev }) {
  const [data, setData] = useState({
    hairLossPattern: formData.hairLossPattern || '',
    hairLossDuration: formData.hairLossDuration || '',
    hairLossProgression: formData.hairLossProgression || '',
    norwood_level: formData.norwood_level || '',
    currentHairDensity: formData.currentHairDensity || '',
    donorAreaQuality: formData.donorAreaQuality || '',
    hairCharacteristics: formData.hairCharacteristics || '',
    scalpCondition: formData.scalpCondition || '',
    expectations: formData.expectations || ''
  });

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
  };

  const validateStep = () => {
    const errors = {};
    
    if (!data.hairLossPattern) errors.hairLossPattern = 'Bitte beschreiben Sie Ihr Haarausfallmuster';
    if (!data.hairLossDuration) errors.hairLossDuration = 'Bitte geben Sie die Dauer des Haarausfalls an';

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return (
    <WizardStep
      title="Haaranalyse"
      subtitle="Diese Details helfen uns, Ihren Haarausfall zu verstehen und die optimale Behandlung zu empfehlen."
      onNext={onNext}
      onPrev={onPrev}
      validation={validateStep}
    >
      <Div className="cs-form_group">
        <label>Muster des Haarausfalls *</label>
        <Div className="cs-radio_group">
          {hairLossPatterns.map(pattern => (
            <Div key={pattern.id} className="cs-radio_item">
              <input
                type="radio"
                id={pattern.id}
                name="hairLossPattern"
                value={pattern.id}
                checked={data.hairLossPattern === pattern.id}
                onChange={(e) => handleChange('hairLossPattern', e.target.value)}
              />
              <label htmlFor={pattern.id}>{pattern.name}</label>
            </Div>
          ))}
        </Div>
      </Div>

      <Div className="cs-field_group">
        <Div className="cs-form_group">
          <label>Seit wann besteht der Haarausfall? *</label>
          <select
            className="cs-form_field"
            value={data.hairLossDuration}
            onChange={(e) => handleChange('hairLossDuration', e.target.value)}
          >
            <option value="">Bitte wählen</option>
            <option value="6months">Weniger als 6 Monate</option>
            <option value="1year">6 Monate - 1 Jahr</option>
            <option value="2years">1-2 Jahre</option>
            <option value="5years">2-5 Jahre</option>
            <option value="10years">5-10 Jahre</option>
            <option value="more10years">Mehr als 10 Jahre</option>
          </select>
        </Div>
        
        <Div className="cs-form_group">
          <label>Progression des Haarausfalls</label>
          <select
            className="cs-form_field"
            value={data.hairLossProgression}
            onChange={(e) => handleChange('hairLossProgression', e.target.value)}
          >
            <option value="">Bitte wählen</option>
            <option value="rapid">Schnell fortschreitend</option>
            <option value="moderate">Mäßig fortschreitend</option>
            <option value="slow">Langsam fortschreitend</option>
            <option value="stable">Derzeit stabil</option>
          </select>
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Norwood-Skala (Selbsteinschätzung)</label>
        <Div className="cs-radio_group">
          {norwood_scale.map(level => (
            <Div key={level.level} className="cs-radio_item">
              <input
                type="radio"
                id={level.level}
                name="norwood_level"
                value={level.level}
                checked={data.norwood_level === level.level}
                onChange={(e) => handleChange('norwood_level', e.target.value)}
              />
              <label htmlFor={level.level}>
                <strong>{level.level}</strong> - {level.name || level.desc}
              </label>
            </Div>
          ))}
        </Div>
      </Div>

      <Div className="cs-field_group">
        <Div className="cs-form_group">
          <label>Aktuelle Haardichte</label>
          <select
            className="cs-form_field"
            value={data.currentHairDensity}
            onChange={(e) => handleChange('currentHairDensity', e.target.value)}
          >
            <option value="">Bitte wählen</option>
            <option value="high">Hoch (dichte Bereiche vorhanden)</option>
            <option value="medium">Mittel (sichtbare Lichtung)</option>
            <option value="low">Niedrig (deutlich sichtbare Kopfhaut)</option>
            <option value="very_low">Sehr niedrig (fast kahl)</option>
          </select>
        </Div>
        
        <Div className="cs-form_group">
          <label>Spenderbereich (Hinterkopf)</label>
          <select
            className="cs-form_field"
            value={data.donorAreaQuality}
            onChange={(e) => handleChange('donorAreaQuality', e.target.value)}
          >
            <option value="">Bitte wählen</option>
            <option value="excellent">Ausgezeichnet (sehr dicht)</option>
            <option value="good">Gut (dicht)</option>
            <option value="fair">Ausreichend (mäßig dicht)</option>
            <option value="poor">Schlecht (dünn)</option>
          </select>
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Haarcharakteristika</label>
        <select
          className="cs-form_field"
          value={data.hairCharacteristics}
          onChange={(e) => handleChange('hairCharacteristics', e.target.value)}
        >
          <option value="">Bitte wählen</option>
          <option value="straight_fine">Glatt und fein</option>
          <option value="straight_thick">Glatt und kräftig</option>
          <option value="wavy_fine">Wellig und fein</option>
          <option value="wavy_thick">Wellig und kräftig</option>
          <option value="curly_fine">Lockig und fein</option>
          <option value="curly_thick">Lockig und kräftig</option>
        </select>
      </Div>

      <Div className="cs-form_group">
        <label>Zustand der Kopfhaut</label>
        <textarea
          className="cs-form_field"
          rows="3"
          value={data.scalpCondition}
          onChange={(e) => handleChange('scalpCondition', e.target.value)}
          placeholder="Beschreiben Sie Ihre Kopfhaut (z.B. ölig, trocken, schuppig, empfindlich)"
        />
      </Div>

      <Div className="cs-form_group">
        <label>Ihre Erwartungen und Wünsche</label>
        <textarea
          className="cs-form_field"
          rows="4"
          value={data.expectations}
          onChange={(e) => handleChange('expectations', e.target.value)}
          placeholder="Was erwarten Sie von der Behandlung? Welche Bereiche sind für Sie prioritär?"
        />
      </Div>
    </WizardStep>
  );
}