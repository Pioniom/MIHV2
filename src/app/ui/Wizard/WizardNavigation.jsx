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
        {showPrev && (
          <Button
            btnText={customPrevText || 'Zurück'}
            variant="cs-type2"
            onClick={onPrev}
            disabled={isSubmitting}
          />
        )}
        
        {showNext && (
          <Button
            btnText={customNextText || (isLastStep ? 'Absenden' : 'Weiter')}
            variant="cs-type1"
            onClick={onNext}
            disabled={isSubmitting}
          />
        )}
      </Div>
    </Div>
  );
}