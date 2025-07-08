'use client'
import { useState } from 'react';
import Div from '../../Div';
import WizardStep from '../WizardStep';

const medicalConditions = [
  'Diabetes mellitus',
  'Bluthochdruck',
  'Herzerkrankungen',
  'Schilddrüsenerkrankungen',
  'Autoimmunerkrankungen',
  'Hauterkrankungen',
  'Allergien',
  'Blutgerinnungsstörungen'
];

const medications = [
  'Blutverdünner (Aspirin, Marcumar)',
  'Blutdrucksenker',
  'Diabetes-Medikamente',
  'Schilddrüsen-Medikamente',
  'Antibiotika',
  'Schmerzmittel',
  'Vitaminpräparate',
  'Nahrungsergänzungsmittel'
];

export default function MedicalHistoryStep({ formData, updateFormData, onNext, onPrev }) {
  const [data, setData] = useState({
    medicalConditions: formData.medicalConditions || [],
    currentMedications: formData.currentMedications || [],
    allergies: formData.allergies || '',
    smoking: formData.smoking || '',
    alcohol: formData.alcohol || '',
    previousSurgeries: formData.previousSurgeries || '',
    familyHistory: formData.familyHistory || ''
  });

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

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
  };

  return (
    <WizardStep
      title="Medizinische Anamnese"
      subtitle="Diese Informationen helfen uns, die beste und sicherste Behandlung für Sie zu planen."
      onNext={onNext}
      onPrev={onPrev}
    >
      <Div className="cs-form_group">
        <label>Bestehende Erkrankungen</label>
        <Div className="cs-checkbox_group">
          {medicalConditions.map(condition => (
            <Div key={condition} className="cs-checkbox_item">
              <input
                type="checkbox"
                id={condition}
                checked={data.medicalConditions?.includes(condition) || false}
                onChange={(e) => handleArrayChange('medicalConditions', condition, e.target.checked)}
              />
              <label htmlFor={condition}>{condition}</label>
            </Div>
          ))}
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Aktuelle Medikamente</label>
        <Div className="cs-checkbox_group">
          {medications.map(medication => (
            <Div key={medication} className="cs-checkbox_item">
              <input
                type="checkbox"
                id={medication}
                checked={data.currentMedications?.includes(medication) || false}
                onChange={(e) => handleArrayChange('currentMedications', medication, e.target.checked)}
              />
              <label htmlFor={medication}>{medication}</label>
            </Div>
          ))}
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Bekannte Allergien</label>
        <textarea
          className="cs-form_field"
          rows="3"
          value={data.allergies}
          onChange={(e) => handleChange('allergies', e.target.value)}
          placeholder="Bitte nennen Sie alle bekannten Allergien oder Unverträglichkeiten"
        />
      </Div>

      <Div className="cs-field_group">
        <Div className="cs-form_group">
          <label>Rauchen Sie?</label>
          <select
            className="cs-form_field"
            value={data.smoking}
            onChange={(e) => handleChange('smoking', e.target.value)}
          >
            <option value="">Bitte wählen</option>
            <option value="never">Nein, noch nie</option>
            <option value="former">Früher, aber nicht mehr</option>
            <option value="occasional">Gelegentlich</option>
            <option value="regular">Regelmäßig</option>
          </select>
        </Div>
        
        <Div className="cs-form_group">
          <label>Alkoholkonsum</label>
          <select
            className="cs-form_field"
            value={data.alcohol}
            onChange={(e) => handleChange('alcohol', e.target.value)}
          >
            <option value="">Bitte wählen</option>
            <option value="never">Nie</option>
            <option value="rare">Selten</option>
            <option value="moderate">Mäßig</option>
            <option value="regular">Regelmäßig</option>
          </select>
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Frühere Operationen</label>
        <textarea
          className="cs-form_field"
          rows="3"
          value={data.previousSurgeries}
          onChange={(e) => handleChange('previousSurgeries', e.target.value)}
          placeholder="Bitte nennen Sie alle früheren Operationen mit ungefährem Datum"
        />
      </Div>

      <Div className="cs-form_group">
        <label>Familiäre Vorgeschichte Haarausfall</label>
        <textarea
          className="cs-form_field"
          rows="3"
          value={data.familyHistory}
          onChange={(e) => handleChange('familyHistory', e.target.value)}
          placeholder="Gab es in Ihrer Familie bereits Fälle von Haarausfall? (Eltern, Geschwister, Großeltern)"
        />
      </Div>
    </WizardStep>
  );
}