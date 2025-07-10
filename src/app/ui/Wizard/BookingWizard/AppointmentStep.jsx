'use client'
import { useState } from 'react';
import Div from '../../Div';
import WizardStep from '../WizardStep';
import DatePicker from '../../DatePicker/DatePicker';

export default function AppointmentStep({ formData, updateFormData, onNext, onPrev }) {
  const [data, setData] = useState({
    preferredDate: formData.preferredDate || '',
    preferredTime: formData.preferredTime || '',
    alternativeDate: formData.alternativeDate || '',
    appointmentType: formData.appointmentType || 'inperson',
    dataConsent: formData.dataConsent || false,
    newsletterConsent: formData.newsletterConsent || false
  });

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
  };

  const validateStep = () => {
    const errors = {};
    
    if (!data.preferredDate) errors.preferredDate = 'Bitte wählen Sie einen Wunschtermin';
    if (!data.preferredTime) errors.preferredTime = 'Bitte wählen Sie eine Uhrzeit';
    if (!data.dataConsent) errors.dataConsent = 'Datenschutz-Einverständnis ist erforderlich';

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  // Generate available times
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  return (
    <WizardStep
      title="Terminwunsch"
      subtitle="Wann können wir Sie am besten beraten? Wir melden uns zur Bestätigung bei Ihnen."
      onNext={onNext}
      onPrev={onPrev}
      validation={validateStep}
    >
      <Div className="cs-form_group">
        <label>Art des Termins</label>
        <Div className="cs-radio_group">
          <Div className="cs-radio_item">
            <input
              type="radio"
              id="inperson"
              name="appointmentType"
              value="inperson"
              checked={data.appointmentType === 'inperson'}
              onChange={(e) => handleChange('appointmentType', e.target.value)}
            />
            <label htmlFor="inperson">
              <Div>
                <strong>Vor-Ort Termin</strong>
                <small style={{ display: 'block', color: '#666' }}>
                  Persönliche Beratung in unserer Klinik
                </small>
              </Div>
            </label>
          </Div>
          
          <Div className="cs-radio_item">
            <input
              type="radio"
              id="video"
              name="appointmentType"
              value="video"
              checked={data.appointmentType === 'video'}
              onChange={(e) => handleChange('appointmentType', e.target.value)}
            />
            <label htmlFor="video">
              <Div>
                <strong>Video-Beratung</strong>
                <small style={{ display: 'block', color: '#666' }}>
                  Online-Beratung per Videocall
                </small>
              </Div>
            </label>
          </Div>
        </Div>
      </Div>

      <Div className="cs-field_group">
        <Div className="cs-form_group">
          <label>Wunschtermin *</label>
          <DatePicker
            value={data.preferredDate}
            onChange={(value) => handleChange('preferredDate', value)}
            placeholder="Wunschtermin wählen"
            minDate={new Date().toISOString().split('T')[0]}
          />
        </Div>
        
        <Div className="cs-form_group">
          <label>Wunschzeit *</label>
          <select
            className="cs-form_field"
            value={data.preferredTime}
            onChange={(e) => handleChange('preferredTime', e.target.value)}
          >
            <option value="">Bitte wählen</option>
            {timeSlots.map(time => (
              <option key={time} value={time}>{time} Uhr</option>
            ))}
          </select>
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Alternativtermin (optional)</label>
        <DatePicker
          value={data.alternativeDate}
          onChange={(value) => handleChange('alternativeDate', value)}
          placeholder="Alternativtermin wählen"
          minDate={new Date().toISOString().split('T')[0]}
        />
      </Div>

      <Div className="cs-form_group">
        <Div className="cs-checkbox_group">
          <Div className="cs-checkbox_item">
            <input
              type="checkbox"
              id="dataConsent"
              checked={data.dataConsent}
              onChange={(e) => handleChange('dataConsent', e.target.checked)}
            />
            <label htmlFor="dataConsent">
              Ich bin mit der Verarbeitung meiner Daten gemäß Datenschutzerklärung einverstanden *
            </label>
          </Div>
          
          <Div className="cs-checkbox_item">
            <input
              type="checkbox"
              id="newsletterConsent"
              checked={data.newsletterConsent}
              onChange={(e) => handleChange('newsletterConsent', e.target.checked)}
            />
            <label htmlFor="newsletterConsent">
              Ich möchte über Neuigkeiten und Angebote informiert werden (optional)
            </label>
          </Div>
        </Div>
      </Div>
    </WizardStep>
  );
}