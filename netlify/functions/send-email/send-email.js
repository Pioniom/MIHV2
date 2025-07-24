// Serverless-Funktion für den Versand des Beratungsbogens
// Mit schön formatierter HTML-E-Mail inklusive Bildern

const nodemailer = require('nodemailer');
const Busboy = require('busboy'); // Busboy importieren

// Konfiguration des E-Mail-Transporters
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: true, // true für Port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Generiert eine schön formatierte HTML-E-Mail für den Beratungsbogen
const generateEmailHTML = (formData) => {
  // Helper-Funktion zum Formatieren von Arrays oder Strings
  const formatArray = (arr) => {
    if (!arr || (Array.isArray(arr) && arr.length === 0)) return 'Keine Angabe';
    if (typeof arr === 'string' && arr.trim() === '') return 'Keine Angabe';
    if (typeof arr === 'string') return arr;
    if (Array.isArray(arr)) return arr.join(', ');
    return 'Keine Angabe'; // Fallback für unerwartete Typen
  };

  // Helper-Funktion für Ja/Nein
  const formatBoolean = (val) => (val ? 'Ja' : 'Nein');

  // Helper-Funktion für Datum
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('de-DE');
    } catch (e) { return dateString; }
  };

  // Geschlecht formatieren
  const formatGender = (gender) => {
    switch (gender) {
      case 'male': return 'Männlich';
      case 'female': return 'Weiblich';
      case 'other': return 'Divers';
      default: return '-';
    }
  };

  // Alkoholkonsum formatieren
  const formatAlcohol = (alcohol) => {
    switch (alcohol) {
      case 'none': return 'Keiner';
      case 'occasional': return 'Gelegentlich';
      case 'regular': return 'Regelmäßig';
      default: return '-';
    }
  };

  // Norwood/Ludwig Skala formatieren (Beispiel)
  const formatScale = (pattern, gender) => {
    if (!pattern) return '-';
    const scale = gender === 'male' ? 'Norwood' : 'Ludwig';
    return `${scale} Skala: ${pattern}`;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    /* CSS Styles */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      background-color: #004d40;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 20px;
      border: 1px solid #ddd;
      border-top: none;
      border-radius: 0 0 5px 5px;
    }
    .section {
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    .section h2 {
      color: #004d40;
      margin-top: 0;
      font-size: 20px;
    }
    .field {
      margin-bottom: 10px;
    }
    .field-label {
      font-weight: bold;
      color: #555;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #777;
    }
    .photo-section {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 15px;
    }
    .photo-info {
      font-style: italic;
      margin-bottom: 15px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Neuer Beratungsbogen: ${formData?.fullName || 'Kein Name angegeben'}</h1>
  </div>

  <div class="content">
    <div class="section">
      <h2>Persönliche Informationen</h2>
      <div class="field">
        <span class="field-label">Name:</span> ${formData?.fullName || '-'}
      </div>
      <div class="field">
        <span class="field-label">E-Mail:</span> ${formData?.email || '-'}
      </div>
      <div class="field">
        <span class="field-label">Telefon:</span> ${formData?.phone || '-'}
      </div>
      <div class="field">
        <span class="field-label">Geburtsdatum:</span> ${formatDate(formData?.dateOfBirth)}
      </div>
      <div class="field">
        <span class="field-label">Geschlecht:</span> ${formatGender(formData?.gender)}
      </div>
    </div>

    <div class="section">
      <h2>Medizinische Vorgeschichte</h2>
      <div class="field">
        <span class="field-label">Frühere Haartransplantationen:</span> ${formatBoolean(formData?.previousTransplants)}
      </div>
      ${formData?.previousTransplants ? `
      <div class="field">
        <span class="field-label">Details (Jahr/Bereich):</span> ${formData?.transplantDetails || '-'}
      </div>
      <div class="field">
        <span class="field-label">Ergebnis:</span> ${formData?.transplantResult || '-'}
      </div>` : ''}
      <div class="field">
        <span class="field-label">Medikamente:</span> ${formatArray(formData?.medications)}
      </div>
      <div class="field">
        <span class="field-label">Allergien:</span> ${formatArray(formData?.allergies)}
      </div>
      <div class="field">
        <span class="field-label">Medizinische Bedingungen:</span> ${formatArray(formData?.medicalConditions)}
      </div>
    </div>

    <div class="section">
      <h2>Haarausfall Details</h2>
      <div class="field">
        <span class="field-label">Alter bei Beginn des Haarausfalls:</span> ${formData?.hairLossAge || '-'}
      </div>
      <div class="field">
        <span class="field-label">Haarausfallmuster (Klassifikation):</span> ${formatScale(formData?.hairLossPattern, formData?.gender)}
      </div>
      <div class="field">
        <span class="field-label">Mögliche Ursachen:</span> ${formatArray(formData?.hairLossReasons)}
      </div>
      <div class="field">
        <span class="field-label">Familiäre Vorgeschichte (Haarausfall):</span> ${formatBoolean(formData?.familyHistory)}
      </div>
      ${formData?.familyHistory ? `
      <div class="field">
        <span class="field-label">Betroffene Verwandte:</span> ${formatArray(formData?.affectedRelatives)}
      </div>` : ''}
      <div class="field">
        <span class="field-label">Frühere Behandlungen gegen Haarausfall:</span> ${formatArray(formData?.previousHairLossTreatments)}
      </div>
    </div>

    <div class="section">
      <h2>Fotos</h2>
      ${formData?.photos && formData.photos.length > 0 ? 
        `<div class="photo-info">${formData.photos.length} Foto(s) sollten dieser E-Mail beigefügt sein.</div>` : 
        '<div class="photo-info">Keine Fotos hochgeladen.</div>'
      }
      <div class="field">
        <span class="field-label">Beschreibung der Fotos:</span> ${formData?.photoDescription || '-'}
      </div>
    </div>

    <div class="section">
      <h2>Erwartungen und Wünsche</h2>
      <div class="field">
        <span class="field-label">Gewünschte Dichte:</span> ${formData?.desiredDensity || '-'}
      </div>
      <div class="field">
        <span class="field-label">Bevorzugtes Datum/Zeitraum:</span> ${formData?.preferredDate ? formatDate(formData.preferredDate) : 'Keine Präferenz'}
      </div>
      <div class="field">
        <span class="field-label">Spezifische Erwartungen:</span> ${formData?.expectations || '-'}
      </div>
      <div class="field">
        <span class="field-label">Zusätzliche Informationen:</span> ${formData?.additionalInfo || '-'}
      </div>
    </div>

  </div>

  <div class="footer">
    Diese E-Mail wurde automatisch über den Beratungsbogen auf medicalinnhair.com generiert.
  </div>
</body>
</html>
  `;
};

// Hilfsfunktion zum Parsen mit Busboy
function parseMultipartForm(event) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const files = {};
    const bb = Busboy({ headers: event.headers });

    bb.on('file', (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      const fileBuffers = [];
      console.log(`Busboy: Empfange Datei [${name}]: ${filename}, MIME: ${mimeType}`);

      file.on('data', (data) => {
        // console.log(`Busboy: Empfange Datenchunk für ${filename}`);
        fileBuffers.push(data);
      });

      file.on('end', () => {
        const finalBuffer = Buffer.concat(fileBuffers);
        console.log(`Busboy: Datei ${filename} vollständig empfangen (${finalBuffer.length} bytes).`);
        if (!files[name]) {
          files[name] = [];
        }
        files[name].push({
          filename,
          type: mimeType,
          content: finalBuffer, // Inhalt als Buffer speichern
        });
      });
      
      file.on('error', err => {
          console.error(`Busboy: Fehler beim Lesen der Datei ${filename}:`, err);
          // Optional: reject(err) wenn ein Dateifehler kritisch ist
      });
    });

    bb.on('field', (name, val, info) => {
      console.log(`Busboy: Empfange Feld [${name}]: ${val}`);
      fields[name] = val;
    });

    bb.on('finish', () => {
      console.log('Busboy: Parsing abgeschlossen.');
      resolve({ fields, files });
    });

    bb.on('error', err => {
      console.error('Busboy: Parser-Fehler:', err);
      reject(err);
    });

    // Body an Busboy übergeben, ggf. nach Base64-Dekodierung
    let bodyBuffer;
    if (event.isBase64Encoded) {
        console.log('Busboy: Dekodiere Base64 Body...');
        bodyBuffer = Buffer.from(event.body, 'base64');
    } else {
        bodyBuffer = Buffer.from(event.body);
    }
    
    console.log(`Busboy: Übergebe ${bodyBuffer.length} Bytes an den Parser...`);
    bb.end(bodyBuffer);
  });
}

// Hauptfunktion für den Serverless-Handler
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
    return { statusCode: 405, headers, body: JSON.stringify({ success: false, message: 'Nur POST-Anfragen werden unterstützt' }) };
  }

  // Logging für rohen Request (kann bleiben zur Diagnose)
  console.log('--- Roh-Request ---');
  console.log('Headers:', JSON.stringify(event.headers, null, 2));
  console.log('Body (Anfang, roh):', event.body ? event.body.substring(0, 200) : 'LEER');
  console.log('Ist Body Base64-kodiert?', event.isBase64Encoded);
  console.log('--- Ende Roh-Request ---');

  try {
    console.log('Versuche Formular mit Busboy zu parsen...');
    let formData = {};
    let attachments = [];
    let contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';

    if (contentType.includes('multipart/form-data')) {
      // Multipart-Verarbeitung mit Busboy
      try {
        const parsedData = await parseMultipartForm(event);
        
        // --- NEU: JSON-String im formData-Feld parsen --- 
        if (parsedData.fields && parsedData.fields.formData) {
            try {
                formData = JSON.parse(parsedData.fields.formData); 
                console.log('Busboy: formData-Feld erfolgreich als JSON geparst.');
            } catch (jsonError) {
                console.error('!!! Fehler beim Parsen des formData JSON-Strings:', jsonError);
                // Fallback: Das Feld selbst als Objekt verwenden, falls es kein JSON war?
                // Oder besser: Fehler werfen?
                formData = {}; // Sicherer Fallback
            }
        } else if (parsedData.fields && parsedData.fields.email) {
            // Fallback, falls formData nicht existiert, aber E-Mail direkt gesendet wird
            console.warn('Busboy: Kein formData-Feld gefunden, verwende Felder direkt.');
            formData = parsedData.fields;
        } else {
            formData = parsedData.fields || {}; // Falls gar nichts da ist
        }
        // --- Ende NEU ---
        
        // Anhänge aus parsedData.files erstellen
        attachments = []; // Sicherstellen, dass Array leer ist
        for (const fieldName in parsedData.files) {
            if (parsedData.files.hasOwnProperty(fieldName)) { // Gute Praxis
                parsedData.files[fieldName].forEach(fileInfo => {
                    attachments.push({
                        filename: fileInfo.filename,
                        content: fileInfo.content, // Ist bereits ein Buffer
                        contentType: fileInfo.type
                    });
                });
            }
        }
        console.log(`Busboy: ${attachments.length} Anhänge gefunden.`);
      } catch (parseError) {
        console.error('!!! Fehler beim Parsen mit Busboy:', parseError);
        // Fallback oder Fehler zurückgeben?
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false, 
            message: 'Fehler beim Verarbeiten der Formulardaten.' 
          })
        };
      }
    } else if (contentType.includes('application/json')) {
      // JSON-Verarbeitung (bleibt gleich)
      let jsonBody = event.body;
      if (event.isBase64Encoded) {
          try {
              jsonBody = Buffer.from(event.body, 'base64').toString('utf8');
          } catch (decodingError) {
              console.error("Fehler beim Base64-Dekodieren für JSON:", decodingError);
              jsonBody = "{}";
          }
      }
      try {
        formData = JSON.parse(jsonBody);
      } catch (e) {
        console.error('Fehler beim Parsen von event.body als JSON:', e);
        formData = {};
      }
      attachments = [];
    } else {
      console.warn(`Unbekannter Content-Type: ${contentType}. Versuche Body als JSON zu parsen.`);
       try {
            let fallbackBody = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
            formData = JSON.parse(fallbackBody);
       } catch(e) {
            console.error('Fallback JSON-Parsing fehlgeschlagen.');
            formData = {};
       }
      attachments = [];
    }

    console.log('Verwendetes formData nach dem Parsen:', formData);

    // Check ob E-Mail vorhanden ist, essentiell!
    if (!formData || !formData.email) {
      console.error('Fehler: formData ist leer oder E-Mail fehlt nach dem Parsen.', formData);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Unvollständige Formulardaten empfangen (E-Mail fehlt).' 
        })
      };
    }

    // E-Mail Senden Logik (unverändert)
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'beratung@medicalinnhair.com';
    const toEmail = process.env.RECIPIENT_EMAIL || process.env.SMTP_USER || 'info@medicalinnhair.com';
    const replyToEmail = formData.email;
    const transporter = createTransporter();
    console.log('Generiere HTML-E-Mail...');
    const emailHTML = generateEmailHTML(formData);
    console.log('HTML-E-Mail generiert.');
    const mailOptions = {
      from: `"Medical Inn Hair Beratung" <${fromEmail}>`,
      to: toEmail,
      replyTo: replyToEmail,
      subject: `Neuer Beratungsbogen von: ${formData.fullName || formData.email}`,
      html: emailHTML,
      attachments: attachments
    };
    console.log('Sende E-Mail...');
    await transporter.sendMail(mailOptions);
    console.log('E-Mail erfolgreich gesendet.');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Ihr Beratungsbogen wurde erfolgreich übermittelt.' 
      })
    };
  } catch (error) {
    console.error('!!! Schwerwiegender Fehler im send-email Handler:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Ein interner Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.' 
      })
    };
  }
};