// Netlify Serverless Funktion für das Kontaktformular
// Verwendet Nodemailer mit Hostinger-SMTP-Konfiguration

const nodemailer = require('nodemailer');

// Konfiguration des E-Mail-Transporters
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: true, // true für Port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Serverless-Handler-Funktion
exports.handler = async function(event, context) {
  // CORS-Headers für lokale Entwicklung und Produktionsumgebung
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // OPTIONS-Anfragen für CORS-Präflug behandeln
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Nur POST-Anfragen verarbeiten
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Nur POST-Anfragen werden unterstützt' })
    };
  }

  try {
    // Formular-Daten aus dem Request-Body parsen
    const formData = JSON.parse(event.body);
    const { firstName, lastName, email, phone, subject, message } = formData;

    // Absender-E-Mail-Adresse
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'info@medicalinnhair.com';
    
    // E-Mail-Empfänger - kann in den Umgebungsvariablen konfiguriert werden
    const toEmail = process.env.RECIPIENT_EMAIL || process.env.SMTP_USER || 'info@medicalinnhair.com';

    // Überprüfen, ob alle erforderlichen Felder vorhanden sind
    if (!firstName || !lastName || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Bitte füllen Sie alle Pflichtfelder aus' 
        })
      };
    }

    // Transporter erstellen
    const transporter = createTransporter();
    
    // E-Mail-Inhalt
    const mailOptions = {
      from: `"Medical Inn Hair" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `Kontaktformular: ${subject || 'Allgemeine Anfrage'}`,
      text: `
Name: ${firstName} ${lastName}
E-Mail: ${email}
Telefon: ${phone || 'Nicht angegeben'}
Betreff: ${subject || 'Allgemeine Anfrage'}

Nachricht:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h2 style="color: #333;">Neue Kontaktformular-Anfrage</h2>
  <p><strong>Name:</strong> ${firstName} ${lastName}</p>
  <p><strong>E-Mail:</strong> ${email}</p>
  <p><strong>Telefon:</strong> ${phone || 'Nicht angegeben'}</p>
  <p><strong>Betreff:</strong> ${subject || 'Allgemeine Anfrage'}</p>
  <h3 style="color: #555;">Nachricht:</h3>
  <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0070f3;">
    ${message.replace(/\n/g, '<br>')}
  </div>
  <p style="color: #888; font-size: 12px; margin-top: 30px;">Diese E-Mail wurde über das Kontaktformular auf medicalinnhair.com gesendet.</p>
</div>
      `
    };

    // E-Mail senden
    await transporter.sendMail(mailOptions);

    // Erfolgreiche Antwort senden
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.' 
      })
    };
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    
    // Fehler zurückgeben
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.' 
      })
    };
  }
};