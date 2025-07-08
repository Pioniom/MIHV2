'use client'
import { useState } from 'react';
import Div from '../../Div';
import WizardStep from '../WizardStep';

const densityOptions = [
  { id: 'natural', label: 'Natürliche Dichte', description: 'Unauffälliges, natürliches Ergebnis' },
  { id: 'medium', label: 'Mittlere Dichte', description: 'Gute Abdeckung mit vollerem Aussehen' },
  { id: 'high', label: 'Hohe Dichte', description: 'Maximale Fülle für dichtes Haar' }
];

const budgetRanges = [
  { id: 'budget-3000', label: 'Bis 3.000 €', description: 'Grundbehandlung für kleinere Bereiche' },
  { id: 'budget-5000', label: '3.000 - 5.000 €', description: 'Umfassende Behandlung mittlerer Bereiche' },
  { id: 'budget-8000', label: '5.000 - 8.000 €', description: 'Extensive Behandlung großer Bereiche' },
  { id: 'budget-10000', label: '8.000 - 10.000 €', description: 'Premium-Behandlung mit höchster Dichte' },
  { id: 'budget-more', label: 'Über 10.000 €', description: 'Vollumfängliche Behandlung ohne Kompromisse' },
  { id: 'budget-consult', label: 'Beratung erwünscht', description: 'Lassen Sie sich über Optionen beraten' }
];

const timeframes = [
  { id: 'asap', label: 'So schnell wie möglich' },
  { id: '1month', label: 'Innerhalb eines Monats' },
  { id: '3months', label: 'In den nächsten 3 Monaten' },
  { id: '6months', label: 'In den nächsten 6 Monaten' },
  { id: 'nextyear', label: 'Im nächsten Jahr' },
  { id: 'planning', label: 'Nur Planung/Information' }
];

const contactTimes = [
  { id: 'morning', label: 'Vormittags (8-12 Uhr)' },
  { id: 'afternoon', label: 'Nachmittags (12-17 Uhr)' },
  { id: 'evening', label: 'Abends (17-20 Uhr)' },
  { id: 'flexible', label: 'Flexibel' }
];

const contactMethods = [
  { id: 'phone', label: 'Telefonisch' },
  { id: 'email', label: 'Per E-Mail' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'video', label: 'Videoanruf' }
];

export default function ExpectationsStep({ formData, updateFormData, onNext, onPrev }) {
  const [data, setData] = useState({
    desiredDensity: formData.desiredDensity || '',
    budgetRange: formData.budgetRange || '',
    treatmentTimeframe: formData.treatmentTimeframe || '',
    specificConcerns: formData.specificConcerns || '',
    previousConsultations: formData.previousConsultations || '',
    preferredContactTime: formData.preferredContactTime || '',
    preferredContactMethod: formData.preferredContactMethod || '',
    additionalQuestions: formData.additionalQuestions || ''
  });

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
  };

  return (
    <WizardStep
      title="Ihre Erwartungen & Wünsche"
      subtitle="Teilen Sie uns Ihre Vorstellungen mit, damit wir die beste Lösung für Sie finden."
      onNext={onNext}
      onPrev={onPrev}
    >
      <Div className="cs-form_group">
        <label>Welche Haardichte wünschen Sie sich? *</label>
        <Div className="cs-radio_group cs-density_options">
          {densityOptions.map(option => (
            <Div key={option.id} className="cs-radio_item cs-density_card">
              <input
                type="radio"
                id={option.id}
                name="desiredDensity"
                value={option.id}
                checked={data.desiredDensity === option.id}
                onChange={(e) => handleChange('desiredDensity', e.target.value)}
              />
              <label htmlFor={option.id}>
                <Div className="cs-option_header">{option.label}</Div>
                <Div className="cs-option_desc">{option.description}</Div>
              </label>
            </Div>
          ))}
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>In welchem Budgetrahmen planen Sie? *</label>
        <Div className="cs-radio_group cs-budget_options">
          {budgetRanges.map(option => (
            <Div key={option.id} className="cs-radio_item cs-budget_card">
              <input
                type="radio"
                id={option.id}
                name="budgetRange"
                value={option.id}
                checked={data.budgetRange === option.id}
                onChange={(e) => handleChange('budgetRange', e.target.value)}
              />
              <label htmlFor={option.id}>
                <Div className="cs-option_header">{option.label}</Div>
                <Div className="cs-option_desc">{option.description}</Div>
              </label>
            </Div>
          ))}
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Wann möchten Sie die Behandlung durchführen lassen? *</label>
        <Div className="cs-radio_group">
          {timeframes.map(option => (
            <Div key={option.id} className="cs-radio_item">
              <input
                type="radio"
                id={option.id}
                name="treatmentTimeframe"
                value={option.id}
                checked={data.treatmentTimeframe === option.id}
                onChange={(e) => handleChange('treatmentTimeframe', e.target.value)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </Div>
          ))}
        </Div>
      </Div>

      <Div className="cs-field_group">
        <Div className="cs-form_group">
          <label>Wann können wir Sie am besten erreichen?</label>
          <Div className="cs-radio_group">
            {contactTimes.map(option => (
              <Div key={option.id} className="cs-radio_item">
                <input
                  type="radio"
                  id={`time-${option.id}`}
                  name="preferredContactTime"
                  value={option.id}
                  checked={data.preferredContactTime === option.id}
                  onChange={(e) => handleChange('preferredContactTime', e.target.value)}
                />
                <label htmlFor={`time-${option.id}`}>{option.label}</label>
              </Div>
            ))}
          </Div>
        </Div>

        <Div className="cs-form_group">
          <label>Wie möchten Sie kontaktiert werden?</label>
          <Div className="cs-radio_group">
            {contactMethods.map(option => (
              <Div key={option.id} className="cs-radio_item">
                <input
                  type="radio"
                  id={`method-${option.id}`}
                  name="preferredContactMethod"
                  value={option.id}
                  checked={data.preferredContactMethod === option.id}
                  onChange={(e) => handleChange('preferredContactMethod', e.target.value)}
                />
                <label htmlFor={`method-${option.id}`}>{option.label}</label>
              </Div>
            ))}
          </Div>
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Haben Sie spezielle Bedenken oder Anforderungen?</label>
        <textarea
          className="cs-form_field"
          rows="4"
          value={data.specificConcerns}
          onChange={(e) => handleChange('specificConcerns', e.target.value)}
          placeholder="z.B. Allergien, besondere Wünsche zur Haarlinie, Bedenken zu Narbenbildung, etc."
        />
      </Div>

      <Div className="cs-form_group">
        <label>Waren Sie bereits bei anderen Kliniken zur Beratung?</label>
        <textarea
          className="cs-form_field"
          rows="3"
          value={data.previousConsultations}
          onChange={(e) => handleChange('previousConsultations', e.target.value)}
          placeholder="Falls ja, welche Empfehlungen haben Sie erhalten?"
        />
      </Div>

      <Div className="cs-form_group">
        <label>Haben Sie weitere Fragen?</label>
        <textarea
          className="cs-form_field"
          rows="3"
          value={data.additionalQuestions}
          onChange={(e) => handleChange('additionalQuestions', e.target.value)}
          placeholder="Stellen Sie hier gerne alle Fragen, die Sie beschäftigen"
        />
      </Div>
    </WizardStep>
  );
}