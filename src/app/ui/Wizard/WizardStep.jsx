'use client'
import { useState } from 'react';
import Div from '../Div';
import Spacing from '../Spacing';

export default function WizardStep({ 
  title, 
  subtitle, 
  children, 
  onNext, 
  onPrev, 
  isFirstStep, 
  isLastStep,
  validation,
  className = ''
}) {
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (validation) {
      const validationResult = validation();
      if (validationResult.isValid) {
        setErrors({});
        setIsValid(true);
        onNext();
      } else {
        setErrors(validationResult.errors || {});
        setIsValid(false);
      }
    } else {
      onNext();
    }
  };

  return (
    <Div className={`cs-wizard_step ${className}`}>
      {title && (
        <>
          <h3 className="cs-step_title cs-font_30 cs-m0">{title}</h3>
          <Spacing lg="20" md="15" />
        </>
      )}
      
      {subtitle && (
        <>
          <p className="cs-step_subtitle cs-m0">{subtitle}</p>
          <Spacing lg="30" md="25" />
        </>
      )}

      <Div className="cs-step_content">
        {typeof children === 'function' 
          ? children({ errors, isValid, handleNext }) 
          : children
        }
      </Div>

      {!isValid && Object.keys(errors).length > 0 && (
        <Div className="cs-validation_errors">
          <Spacing lg="20" md="15" />
          {Object.values(errors).map((error, index) => (
            <p key={index} className="cs-error_message cs-accent_color cs-m0">
              {error}
            </p>
          ))}
        </Div>
      )}
    </Div>
  );
}