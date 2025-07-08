'use client'
import Div from '../Div';

export default function WizardProgress({ steps, currentStep, titles }) {
  return (
    <Div className="cs-wizard_progress">
      <Div className="cs-progress_line">
        <Div 
          className="cs-progress_fill"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </Div>
      <Div className="cs-progress_steps">
        {steps.map((step, index) => (
          <Div 
            key={index}
            className={`cs-progress_step ${
              index <= currentStep ? 'cs-step_completed' : 'cs-step_pending'
            } ${index === currentStep ? 'cs-step_active' : ''}`}
          >
            <Div className="cs-step_circle">
              {index < currentStep ? (
                <Div className="cs-step_check">✓</Div>
              ) : (
                <span>{index + 1}</span>
              )}
            </Div>
            <Div className="cs-step_label">{titles[index]}</Div>
          </Div>
        ))}
      </Div>
    </Div>
  );
}