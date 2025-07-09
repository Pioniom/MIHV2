import React, { useState } from 'react'
import Div from '../Div'

export default function Newsletter({title, subtitle, placeholder}) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/.netlify/functions/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'Newsletter',
          lastName: 'Anmeldung',
          email: email,
          phone: '',
          subject: 'Newsletter-Anmeldung',
          message: 'Möchte sich für den Newsletter anmelden.'
        })
      });

      if (!response.ok) {
        throw new Error('Fehler beim Senden');
      }

      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        setEmail('');
      } else {
        throw new Error(result.message || 'Unbekannter Fehler');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert('Fehler beim Anmelden. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <>
        {title && <h2 className="cs-widget_title">{title}</h2>}
        <Div className="cs-newsletter cs-style1">
          <Div className="cs-newsletter_success">
            <p style={{color: '#28a745', fontWeight: 'bold'}}>
              ✓ Erfolgreich angemeldet! Vielen Dank.
            </p>
            <button 
              className="cs-newsletter_btn" 
              onClick={() => setSubmitSuccess(false)}
            >
              <span>Erneut anmelden</span>
            </button>
          </Div>
          <Div className="cs-newsletter_text">{subtitle}</Div>
        </Div>
      </>
    );
  }

  return (
    <>
      {title && <h2 className="cs-widget_title">{title}</h2>}
      <Div className="cs-newsletter cs-style1">
        <form onSubmit={handleSubmit} className="cs-newsletter_form">
          <input 
            type="email" 
            className="cs-newsletter_input" 
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            className="cs-newsletter_btn" 
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? 'Senden...' : 'Send'}</span>
          </button>
        </form>
        <Div className="cs-newsletter_text">{subtitle}</Div>
      </Div>
    </>
  )
}
