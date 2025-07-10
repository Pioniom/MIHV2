'use client'
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';

export default function AccessibleSlider({ children, className = '', ...sliderProps }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleSliderChange = () => {
      if (!sliderRef.current) return;

      const sliderElement = sliderRef.current.innerSlider.list;
      if (!sliderElement) return;

      // Finde alle Slides
      const allSlides = sliderElement.querySelectorAll('.slick-slide');
      
      allSlides.forEach((slide) => {
        const isHidden = slide.getAttribute('aria-hidden') === 'true';
        const focusableElements = slide.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach((element) => {
          if (isHidden) {
            // Entferne fokussierbare Elemente aus Tab-Reihenfolge
            element.setAttribute('tabindex', '-1');
            element.setAttribute('aria-hidden', 'true');
          } else {
            // Stelle normale Tab-Reihenfolge wieder her
            if (element.hasAttribute('data-original-tabindex')) {
              element.setAttribute('tabindex', element.getAttribute('data-original-tabindex'));
              element.removeAttribute('data-original-tabindex');
            } else {
              element.removeAttribute('tabindex');
            }
            element.removeAttribute('aria-hidden');
          }
        });
      });
    };

    // Initiale Ausführung
    handleSliderChange();

    // Event Listener für Slider-Änderungen
    const slider = sliderRef.current;
    if (slider && slider.innerSlider) {
      slider.innerSlider.list.addEventListener('DOMNodeInserted', handleSliderChange);
      slider.innerSlider.list.addEventListener('DOMSubtreeModified', handleSliderChange);
    }

    // Cleanup
    return () => {
      if (slider && slider.innerSlider && slider.innerSlider.list) {
        slider.innerSlider.list.removeEventListener('DOMNodeInserted', handleSliderChange);
        slider.innerSlider.list.removeEventListener('DOMSubtreeModified', handleSliderChange);
      }
    };
  }, []);

  const settings = {
    // Standard-Einstellungen für bessere Accessibility
    accessibility: true,
    arrows: true,
    dots: false,
    focusOnSelect: false,
    ...sliderProps,
    // Event-Handler für Accessibility
    afterChange: (currentSlide) => {
      // Rufe ursprünglichen afterChange-Handler auf falls vorhanden
      if (sliderProps.afterChange) {
        sliderProps.afterChange(currentSlide);
      }
      
      // Update fokussierbare Elemente nach Slide-Wechsel
      setTimeout(() => {
        if (!sliderRef.current) return;
        
        const sliderElement = sliderRef.current.innerSlider.list;
        if (!sliderElement) return;

        const allSlides = sliderElement.querySelectorAll('.slick-slide');
        
        allSlides.forEach((slide) => {
          const isHidden = slide.getAttribute('aria-hidden') === 'true';
          const focusableElements = slide.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
          );

          focusableElements.forEach((element) => {
            if (isHidden) {
              element.setAttribute('tabindex', '-1');
              element.setAttribute('aria-hidden', 'true');
            } else {
              if (element.hasAttribute('data-original-tabindex')) {
                element.setAttribute('tabindex', element.getAttribute('data-original-tabindex'));
                element.removeAttribute('data-original-tabindex');
              } else {
                element.removeAttribute('tabindex');
              }
              element.removeAttribute('aria-hidden');
            }
          });
        });
      }, 100);
    }
  };

  return (
    <Slider 
      ref={sliderRef}
      {...settings} 
      className={`accessible-slider ${className}`}
    >
      {children}
    </Slider>
  );
}