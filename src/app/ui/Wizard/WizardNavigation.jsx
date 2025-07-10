'use client'
import Button from '../Button';
import Div from '../Div';

export default function WizardNavigation({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  isSubmitting,
  showPrev = true,
  showNext = true,
  customNextText,
  customPrevText
}) {
  const isLastStep = currentStep === totalSteps - 1;
  
  return (
    <Div className="cs-wizard_navigation">
      <Div className="cs-nav_buttons">
        {showPrev && currentStep > 0 && (
          <button
            className="cs-btn cs-type2"
            onClick={onPrev}
            disabled={isSubmitting}
          >
            <span>{customPrevText || 'Zurück'}</span>
          </button>
        )}
        
        <button
          className="cs-btn cs-type1"
          onClick={onNext}
          disabled={isSubmitting}
          type={isLastStep ? 'submit' : 'button'}
        >
          <span>{isSubmitting ? 'Wird gesendet...' : (customNextText || (isLastStep ? 'Absenden' : 'Weiter'))}</span>
        </button>
      </Div>
    </Div>
  );
}