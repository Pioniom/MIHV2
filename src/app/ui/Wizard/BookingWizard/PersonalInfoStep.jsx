'use client'
import { useState } from 'react';
import Div from '../../Div';
import WizardStep from '../WizardStep';

export default function PersonalInfoStep({ formData, updateFormData, onNext, onPrev, isFirstStep }) {
  const [data, setData] = useState({
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    email: formData.email || '',
    phone: formData.phone || '',
    birthDate: formData.birthDate || '',
    gender: formData.gender || ''
  });

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
  };

  const validateStep = () => {
    const errors = {};
    
    if (!data.firstName.trim()) errors.firstName = 'Vorname ist erforderlich';
    if (!data.lastName.trim()) errors.lastName = 'Nachname ist erforderlich';
    if (!data.email.trim()) errors.email = 'E-Mail ist erforderlich';
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Ungültige E-Mail-Adresse';
    if (!data.phone.trim()) errors.phone = 'Telefonnummer ist erforderlich';
    if (!data.birthDate) errors.birthDate = 'Geburtsdatum ist erforderlich';
    if (!data.gender) errors.gender = 'Geschlecht ist erforderlich';

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  return (
    <WizardStep
      title="Persönliche Angaben"
      subtitle="Bitte teilen Sie uns Ihre Kontaktdaten mit, damit wir Sie optimal betreuen können."
      onNext={onNext}
      onPrev={onPrev}
      isFirstStep={isFirstStep}
      validation={validateStep}
    >
      <Div className="cs-field_group">
        <Div className="cs-form_group">
          <label>Vorname *</label>
          <input
            type="text"
            className="cs-form_field"
            value={data.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Ihr Vorname"
          />
        </Div>
        
        <Div className="cs-form_group">
          <label>Nachname *</label>
          <input
            type="text"
            className="cs-form_field"
            value={data.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Ihr Nachname"
          />
        </Div>
      </Div>

      <Div className="cs-field_group">
        <Div className="cs-form_group">
          <label>E-Mail-Adresse *</label>
          <input
            type="email"
            className="cs-form_field"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="ihre@email.de"
          />
        </Div>
        
        <Div className="cs-form_group">
          <label>Telefonnummer *</label>
          <input
            type="tel"
            className="cs-form_field"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+49 123 456789"
          />
        </Div>
      </Div>

      <Div className="cs-field_group">
        <Div className="cs-form_group">
          <label>Geburtsdatum *</label>
          <input
            type="date"
            className="cs-form_field"
            value={data.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
          />
        </Div>
        
        <Div className="cs-form_group">
          <label>Geschlecht *</label>
          <select
            className="cs-form_field"
            value={data.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="">Bitte wählen</option>
            <option value="male">Männlich</option>
            <option value="female">Weiblich</option>
            <option value="diverse">Divers</option>
          </select>
        </Div>
      </Div>
    </WizardStep>
  );
}