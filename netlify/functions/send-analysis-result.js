const nodemailer = require('nodemailer');

// Konfiguration des E-Mail-Transporters (gleich wie in send-email.js)
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Generiert HTML-E-Mail für Haaranalyse-Ergebnisse
const generateAnalysisEmailHTML = (data, isForAdmin = false) => {
  const { userInfo, analysisResult, parsedAnalysis } = data;
  
  const formatChallenges = (challenges) => {
    if (!challenges || challenges.length === 0) return '<p>Keine besonderen Herausforderungen identifiziert.</p>';
    return '<ul>' + challenges.map(c => `<li>${c}</li>`).join('') + '</ul>';
  };
  
  const formatRecommendations = (recommendations) => {
    if (!recommendations || recommendations.length === 0) return '<p>Keine spezifischen Empfehlungen.</p>';
    return '<ul>' + recommendations.map(r => `<li>${r}</li>`).join('') + '</ul>';
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      background-color: #f5f5f5;
    }
    .email-container {
      background-color: white;
      margin: 20px auto;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .header p {
      margin: 10px 0 0 0;
      opacity: 0.9;
    }
    .content {
      padding: 30px;
    }
    .section {
      margin-bottom: 30px;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #06b6d4;
    }
    .section h2 {
      color: #1a1a1a;
      margin-top: 0;
      font-size: 22px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .field {
      margin-bottom: 15px;
    }
    .field-label {
      font-weight: 600;
      color: #555;
      display: inline-block;
      min-width: 150px;
    }
    .field-value {
      color: #333;
    }
    .highlight {
      background-color: #fef3c7;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
    }
    .result-box {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border: 1px solid #06b6d4;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background-color: #06b6d4;
      color: white;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }
    .icon {
      width: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: middle;
    }
    .cta-section {
      background-color: #1a1a1a;
      color: white;
      padding: 30px;
      text-align: center;
      margin-top: 30px;
    }
    .cta-button {
      display: inline-block;
      padding: 14px 30px;
      background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      margin: 10px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #666;
      background-color: #f8f9fa;
    }
    ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    li {
      margin: 8px 0;
    }
    ${isForAdmin ? `
    .admin-info {
      background-color: #fee2e2;
      border: 1px solid #ef4444;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
    }
    .admin-info h3 {
      color: #dc2626;
      margin-top: 0;
    }
    ` : ''}
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Ihre KI-Haaranalyse Ergebnisse</h1>
      <p>Medical Inn Hair - Deutschlands Premium-Adresse für Haartransplantationen</p>
    </div>

    <div class="content">
      ${isForAdmin ? `
      <div class="admin-info">
        <h3>🔴 Admin-Information</h3>
        <p>Neues Analyse-Ergebnis wurde angefordert von:</p>
        <div class="field">
          <span class="field-label">Name:</span>
          <span class="field-value">${userInfo.name}</span>
        </div>
        <div class="field">
          <span class="field-label">Alter:</span>
          <span class="field-value">${userInfo.age} Jahre</span>
        </div>
        <div class="field">
          <span class="field-label">E-Mail:</span>
          <span class="field-value"><a href="mailto:${userInfo.email}">${userInfo.email}</a></span>
        </div>
        <div class="field">
          <span class="field-label">Zeitpunkt:</span>
          <span class="field-value">${new Date().toLocaleString('de-DE')}</span>
        </div>
      </div>
      ` : ''}

      <div class="section">
        <h2>
          <span class="icon">📊</span>
          Ihre persönliche Analyse
        </h2>
        ${userInfo.name ? `<p>Sehr geehrte(r) ${userInfo.name},</p>` : ''}
        <p>vielen Dank für Ihr Vertrauen in Medical Inn Hair. Basierend auf der KI-Analyse Ihres hochgeladenen Bildes haben wir folgende Ergebnisse für Sie zusammengestellt:</p>
      </div>

      ${parsedAnalysis ? `
      <div class="result-box">
        <h3 style="margin-top: 0;">Diagnose</h3>
        <div class="field">
          <span class="field-label">Haarausfall-Typ:</span>
          <span class="field-value highlight">${parsedAnalysis.hairLossType || 'Nicht spezifiziert'}</span>
        </div>
        ${parsedAnalysis.norwordScale ? `
        <div class="field">
          <span class="field-label">Klassifikation:</span>
          <span class="field-value"><span class="badge">Norwood ${parsedAnalysis.norwordScale}</span></span>
        </div>
        ` : ''}
      </div>

      <div class="section">
        <h2>
          <span class="icon">💉</span>
          Behandlungsempfehlung
        </h2>
        <div class="field">
          <span class="field-label">Methode:</span>
          <span class="field-value"><strong>${parsedAnalysis.recommendedMethod || 'Individuelle Beratung erforderlich'}</strong></span>
        </div>
        <div class="field">
          <span class="field-label">Benötigte Grafts:</span>
          <span class="field-value highlight">${parsedAnalysis.graftsNeeded}</span>
        </div>
        ${parsedAnalysis.graftsMin && parsedAnalysis.graftsMax ? `
        <div class="field">
          <span class="field-label">Bereich:</span>
          <span class="field-value">${parsedAnalysis.graftsMin} - ${parsedAnalysis.graftsMax} Grafts</span>
        </div>
        ` : ''}
      </div>

      ${parsedAnalysis.challenges && parsedAnalysis.challenges.length > 0 ? `
      <div class="section">
        <h2>
          <span class="icon">⚠️</span>
          Zu beachten
        </h2>
        ${formatChallenges(parsedAnalysis.challenges)}
      </div>
      ` : ''}

      ${parsedAnalysis.recommendations && parsedAnalysis.recommendations.length > 0 ? `
      <div class="section">
        <h2>
          <span class="icon">✅</span>
          Unsere Empfehlungen
        </h2>
        ${formatRecommendations(parsedAnalysis.recommendations)}
      </div>
      ` : ''}
      ` : `
      <div class="section">
        <h2>Analyse-Details</h2>
        <div style="white-space: pre-wrap; background-color: #f8f9fa; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 14px;">
${analysisResult}
        </div>
      </div>
      `}

      <div class="cta-section">
        <h2 style="color: white; margin-bottom: 20px;">Nächste Schritte</h2>
        <p style="margin-bottom: 25px;">Lassen Sie uns gemeinsam Ihren Weg zu vollem Haar planen!</p>
        <a href="https://medicalinnhair.com/consultation" class="cta-button">
          Kostenlose Beratung buchen
        </a>
        <a href="tel:+4921156363666" class="cta-button" style="background: white; color: #1a1a1a;">
          📞 0211 563 636 66
        </a>
      </div>
    </div>

    <div class="footer">
      <p><strong>Medical Inn Hair</strong><br>
      Georg-Glock-Str. 8, 40474 Düsseldorf<br>
      <a href="https://medicalinnhair.com">www.medicalinnhair.com</a></p>
      <p style="margin-top: 15px; font-size: 11px; color: #999;">
        Diese E-Mail wurde automatisch generiert. Bei Fragen kontaktieren Sie uns gerne direkt.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

// Hauptfunktion
exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' ? '*' : 'https://medicalinnhair.com',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers, 
      body: JSON.stringify({ success: false, message: 'Nur POST-Anfragen werden unterstützt' }) 
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Validierung
    if (!data.userInfo || !data.userInfo.email || !data.userInfo.name || !data.userInfo.age) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Bitte füllen Sie alle Pflichtfelder aus (Name, Alter, E-Mail)' 
        })
      };
    }

    if (!data.consentGiven) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Bitte stimmen Sie der Datenschutzerklärung zu' 
        })
      };
    }

    const transporter = createTransporter();
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'analyse@medicalinnhair.com';
    const adminEmail = process.env.RECIPIENT_EMAIL || process.env.SMTP_USER || 'info@medicalinnhair.com';

    // E-Mail an den Benutzer
    const userMailOptions = {
      from: `"Medical Inn Hair KI-Analyse" <${fromEmail}>`,
      to: data.userInfo.email,
      subject: 'Ihre persönliche Haaranalyse-Ergebnisse | Medical Inn Hair',
      html: generateAnalysisEmailHTML(data, false)
    };

    // E-Mail an Admin
    const adminMailOptions = {
      from: `"Medical Inn Hair KI-Analyse" <${fromEmail}>`,
      to: adminEmail,
      replyTo: data.userInfo.email,
      subject: `Neue Haaranalyse angefordert von: ${data.userInfo.name} (${data.userInfo.age})`,
      html: generateAnalysisEmailHTML(data, true)
    };

    // Beide E-Mails senden
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Die Analyse-Ergebnisse wurden erfolgreich an Ihre E-Mail-Adresse gesendet!' 
      })
    };

  } catch (error) {
    console.error('Fehler beim Senden der Analyse-E-Mail:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' 
      })
    };
  }
};