'use client'
import { useState } from 'react';
import Div from '../Div';
import WizardProgress from './WizardProgress';
import WizardNavigation from './WizardNavigation';

export default function WizardContainer({ 
  steps, 
  onComplete, 
  title, 
  subtitle,
  className = '' 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async (finalData) => {
    setIsSubmitting(true);
    try {
      const completeData = { ...formData, ...finalData };
      await onComplete(completeData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepComponent = steps[currentStep];

  return (
    <Div className={`cs-wizard_container ${className}`}>
      <Div className="cs-wizard_header">
        {title && <h2 className="cs-wizard_title cs-font_50 cs-m0 text-center">{title}</h2>}
        {subtitle && <p className="cs-wizard_subtitle text-center cs-m0">{subtitle}</p>}
        <WizardProgress 
          steps={steps} 
          currentStep={currentStep}
          titles={steps.map(step => step.title || `Schritt ${step.id}`)}
        />
      </Div>
      
      <Div className="cs-wizard_content">
        {currentStepComponent && currentStepComponent.component && 
          currentStepComponent.component({
            formData,
            updateFormData,
            nextStep,
            prevStep,
            isFirstStep: currentStep === 0,
            isLastStep: currentStep === steps.length - 1,
            onComplete: handleComplete,
            isSubmitting
          })
        }
      </Div>

      <WizardNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={nextStep}
        onPrev={prevStep}
        isSubmitting={isSubmitting}
        showPrev={currentStep > 0}
        showNext={currentStep < steps.length - 1}
      />
    </Div>
  );
}