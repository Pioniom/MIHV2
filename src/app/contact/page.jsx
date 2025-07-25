'use client'
import { useState } from 'react';
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import WizardContainer from "@/app/ui/Wizard/WizardContainer";
import PersonalInfoStep from "@/app/ui/Wizard/BookingWizard/PersonalInfoStep";
import TreatmentStep from "@/app/ui/Wizard/BookingWizard/TreatmentStep";
import AppointmentStep from "@/app/ui/Wizard/BookingWizard/AppointmentStep";
import MedicalHistoryStep from "@/app/ui/Wizard/ConsultationWizard/MedicalHistoryStep";
import HairLossStep from "@/app/ui/Wizard/ConsultationWizard/HairLossStep";
import PhotoUploadStep from "@/app/ui/Wizard/ConsultationWizard/PhotoUploadStep";
import ExpectationsStep from "@/app/ui/Wizard/ConsultationWizard/ExpectationsStep";
import ConsentStep from "@/app/ui/Wizard/ConsultationWizard/ConsentStep";
import ReviewStep from "@/app/ui/Wizard/ConsultationWizard/ReviewStep";

const bookingSteps = [
  {
    id: 'personal',
    title: 'Persönlich',
    component: PersonalInfoStep
  },
  {
    id: 'treatment',
    title: 'Behandlung',
    component: TreatmentStep
  },
  {
    id: 'appointment',
    title: 'Termin',
    component: AppointmentStep
  }
];

const consultationSteps = [
  {
    id: 'personal',
    title: 'Persönlich',
    component: PersonalInfoStep
  },
  {
    id: 'medical',
    title: 'Anamnese',
    component: MedicalHistoryStep
  },
  {
    id: 'hairloss',
    title: 'Haaranalyse',
    component: HairLossStep
  },
  {
    id: 'photos',
    title: 'Fotos',
    component: PhotoUploadStep
  },
  {
    id: 'expectations',
    title: 'Erwartungen',
    component: ExpectationsStep
  },
  {
    id: 'consent',
    title: 'Einverständnis',
    component: ConsentStep
  },
  {
    id: 'review',
    title: 'Übersicht',
    component: ReviewStep
  }
];

export default function ContactPage() {
  const [activeWizard, setActiveWizard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleBookingComplete = async (formData) => {
    setIsSubmitting(true);
    try {
      // Kontaktformular-Daten für einfache Terminbuchung
      const contactData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        subject: `Terminbuchung - ${formData.appointmentType || 'Beratung'}`,
        message: `Terminwunsch: ${formData.preferredDate} um ${formData.preferredTime}
        
Alternative: ${formData.alternativeDate || 'Keine'}
Behandlungsart: ${formData.appointmentType || 'Allgemeine Beratung'}
Geschlecht: ${formData.gender || 'Nicht angegeben'}
Geburtsdatum: ${formData.birthDate || 'Nicht angegeben'}

Datenschutz: ${formData.dataConsent ? 'Zugestimmt' : 'Nicht zugestimmt'}
Newsletter: ${formData.newsletterConsent ? 'Ja' : 'Nein'}`
      };

      const response = await fetch('/.netlify/functions/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error('Fehler beim Senden der Terminbuchung');
      }

      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        setActiveWizard(null);
      } else {
        throw new Error(result.message || 'Unbekannter Fehler');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Fehler beim Senden der Terminbuchung. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConsultationComplete = async (formData) => {
    setIsSubmitting(true);
    try {
      // Beratungsbogen-Daten für send-email Netlify Function
      const consultationData = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.birthDate,
        gender: formData.gender,
        
        // Medizinische Vorgeschichte
        medicalConditions: formData.medicalConditions || [],
        medications: formData.currentMedications || [],
        allergies: formData.allergies || [],
        smoking: formData.smoking,
        alcohol: formData.alcohol,
        
        // Haarausfall Details
        hairLossAge: formData.ageAtOnset,
        hairLossPattern: formData.pattern,
        hairLossReasons: formData.causes || [],
        familyHistory: formData.familyHistory,
        previousHairLossTreatments: formData.previousTreatments || [],
        
        // Fotos
        photos: formData.photos || [],
        photoDescription: formData.photoDescription,
        
        // Erwartungen
        desiredDensity: formData.desiredDensity,
        expectations: formData.specificConcerns,
        additionalInfo: formData.finalComments,
        preferredDate: formData.treatmentTimeframe,
        
        // Einverständnisse
        dataProcessingConsent: formData.dataProcessingConsent,
        consultationConsent: formData.consultationConsent,
        marketingConsent: formData.marketingConsent,
        termsAccepted: formData.termsAccepted
      };

      // FormData für Multipart-Upload (wegen Fotos)
      const formDataToSend = new FormData();
      formDataToSend.append('formData', JSON.stringify(consultationData));
      
      // Fotos hinzufügen falls vorhanden
      if (formData.photos && formData.photos.length > 0) {
        formData.photos.forEach((photo, index) => {
          formDataToSend.append(`photo_${index}`, photo);
        });
      }

      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Fehler beim Senden des Beratungsbogens');
      }

      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        setActiveWizard(null);
      } else {
        throw new Error(result.message || 'Unbekannter Fehler');
      }
    } catch (error) {
      console.error('Error submitting consultation:', error);
      alert('Fehler beim Senden des Beratungsbogens. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetWizards = () => {
    setActiveWizard(null);
    setSubmitSuccess(false);
  };

  return (
    <>
      <PageHeading
        title="Termin buchen"
        bgSrc="/images/contact_hero_bg.jpeg"
        pageLinkText="Kontakt"
      />
      
      <Spacing lg="150" md="80" />
      
      <Div className="container">
        {!activeWizard && !submitSuccess && (
          <>
            <SectionHeading
              title="Wie können wir Ihnen helfen?"
              subtitle="Wählen Sie die passende Option"
              variant="cs-style1 text-center"
            />
            <Spacing lg="90" md="45" />
            
            <Div className="row">
              <Div className="col-lg-6">
                <Div className="cs-contact_option">
                  <Div className="cs-contact_option_icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Div>
                  <h3 className="cs-option_title">Beratungstermin buchen</h3>
                  <p className="cs-option_desc">
                    Vereinbaren Sie einen persönlichen oder Online-Beratungstermin. 
                    Ideal für erste Informationen und Behandlungsplanung.
                  </p>
                  <button 
                    className="cs-btn cs-style1"
                    onClick={() => setActiveWizard('booking')}
                  >
                    <span>Termin vereinbaren</span>
                  </button>
                  <Spacing lg="40" md="30" />
                </Div>
              </Div>
              
              <Div className="col-lg-6">
                <Div className="cs-contact_option">
                  <Div className="cs-contact_option_icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12h6m-6 4h6m2 5l-5-5H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Div>
                  <h3 className="cs-option_title">Beratungsbogen ausfüllen</h3>
                  <p className="cs-option_desc">
                    Detaillierte Bedarfsanalyse und Anamnese für eine optimale 
                    Behandlungsvorbereitung. Spart Zeit beim Termin.
                  </p>
                  <button 
                    className="cs-btn cs-style1"
                    onClick={() => setActiveWizard('consultation')}
                  >
                    <span>Bogen ausfüllen</span>
                  </button>
                  <Spacing lg="40" md="30" />
                </Div>
              </Div>
            </Div>
          </>
        )}

        {activeWizard === 'booking' && (
          <>
            <button 
              className="cs-back_btn"
              onClick={resetWizards}
            >
              ← Zurück zur Auswahl
            </button>
            <Spacing lg="40" md="30" />
            
            <WizardContainer
              steps={bookingSteps}
              onComplete={handleBookingComplete}
              title="Beratungstermin buchen"
              subtitle="In nur 3 Schritten zu Ihrem persönlichen Beratungstermin"
              className="cs-booking_wizard"
              isSubmitting={isSubmitting}
            />
          </>
        )}

        {activeWizard === 'consultation' && (
          <>
            <button 
              className="cs-back_btn"
              onClick={resetWizards}
            >
              ← Zurück zur Auswahl
            </button>
            <Spacing lg="40" md="30" />
            
            <WizardContainer
              steps={consultationSteps}
              onComplete={handleConsultationComplete}
              title="Beratungsbogen"
              subtitle="Detaillierte Bedarfsanalyse für Ihre optimale Behandlungsplanung"
              className="cs-consultation_wizard"
              isSubmitting={isSubmitting}
            />
          </>
        )}

        {submitSuccess && (
          <Div className="cs-success_message text-center">
            <Div className="cs-success_icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Div>
            <h2 className="cs-success_title cs-font_50">Vielen Dank!</h2>
            <p className="cs-success_desc">
              Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
            <button 
              className="cs-btn cs-style1"
              onClick={resetWizards}
            >
              <span>Neue Anfrage</span>
            </button>
            <Spacing lg="60" md="40" />
          </Div>
        )}
      </Div>
      
      <Spacing lg="150" md="80" />
      
      <Div className="container">
        <Cta
          title="Haben Sie noch Fragen? <br />Rufen Sie uns an!"
          btnText="0211 26159 299"
          btnLink="tel:+492112615929"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
    </>
  );
}