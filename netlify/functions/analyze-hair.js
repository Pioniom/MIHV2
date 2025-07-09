const { generateText } = require('ai');
const { createOpenRouter } = require('@openrouter/ai-sdk-provider');

const ENFORCED_MODEL_ID = 'openai/gpt-4.1-mini';

const DEFAULT_PROMPT = `Du bist ein erfahrener Experte für Haartransplantationen. Analysiere das Bild sorgfältig und gib eine besonders ausführliche, fundierte Ersteinschätzung ab.

WICHTIGE HINWEISE ZUR ANALYSE:
1. Falls auf dem Bild KEIN Haarausfall erkennbar ist, weise ausdrücklich darauf hin, dass keine Behandlungsnotwendigkeit besteht.
2. Wenn das Bild ungeeignet ist (z.B. keine Kopfhaut sichtbar, zu dunkel, unscharf), bitte darauf hinweisen.
3. Bei Verdacht auf Testbilder ohne echten Haarausfall, dies klar kommunizieren.

Wichtige Vorgaben:
- Die Analyse der Bilder muss präzise, nachvollziehbar und detailliert erfolgen.
- Die geschätzte benötigte Graftanzahl muss bei erkennbarem Haarausfall zwischen 2500 und 5000 liegen.
- Bei fehlendem Haarausfall oder nicht erkennbarer Kopfhaut KEINE Graftanzahl angeben.
- Gehe auf alle relevanten Details und Besonderheiten ein, die auf dem Bild erkennbar sind.

Berücksichtige dabei folgende Aspekte und erläutere jeden Punkt ausführlich:

Haarausfall-Typ: Beschreibe den Haarausfall-Typ (nach Norwood-Skala, wenn erkennbar)

Benötigte Grafts: Gib eine Einschätzung der benötigten Haarfollikel

Empfohlene Methode: Welche Transplantationsmethode (FUE, DHI, etc.) wäre am besten geeignet?

Mögliche Herausforderungen: Beschreibe potenzielle Komplikationen oder Herausforderungen

Empfehlungen: Gib allgemeine Ratschläge für den bestmöglichen Behandlungserfolg

Gib deine Antwort auf Deutsch und strukturiere sie übersichtlich. Die Analyse soll für Laien verständlich, aber fachlich präzise sein.`;

exports.handler = async (event, context) => {
  // CORS-Header
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // OPTIONS-Anfragen für CORS-Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Nur POST-Anfragen werden unterstützt' })
    };
  }

  try {
    console.log("Starte Analyse-Anfrage Verarbeitung");
    
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.log("FEHLER: Kein API-Key gefunden!");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API-Schlüssel nicht konfiguriert' })
      };
    }

    const requestBody = JSON.parse(event.body || '{}');
    const { imageUrl, prompt = DEFAULT_PROMPT, isBase64 = true } = requestBody;

    if (!imageUrl) {
      console.log("FEHLER: Kein Bild in der Anfrage");
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Kein Bild in der Anfrage gefunden' })
      };
    }

    // Stelle sicher, dass das Base64-Bild im richtigen Format ist
    let formattedImageUrl = imageUrl;
    if (isBase64 && !imageUrl.startsWith('data:')) {
      formattedImageUrl = `data:image/jpeg;base64,${imageUrl}`;
    }

    console.log("Verwende Modell:", ENFORCED_MODEL_ID);
    console.log("Bild Format:", isBase64 ? 'Base64' : 'URL');

    // OpenRouter Provider konfigurieren
    const openrouter = createOpenRouter({ 
      apiKey: apiKey
    });
    
    // LanguageModel für spezifisches Modell erstellen
    const openRouterLanguageModel = openrouter(ENFORCED_MODEL_ID);

    // AI SDK verwenden
    const result = await generateText({
      model: openRouterLanguageModel,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            {
              type: 'image',
              image: formattedImageUrl
            }
          ]
        }
      ],
      temperature: 0.6,
      maxTokens: 2000
    });

    console.log('OpenRouter Antwort erhalten');
    const analysis = result.text || 'Keine Analyse verfügbar';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        analysis: analysis,
        model: ENFORCED_MODEL_ID,
        success: true
      })
    };

  } catch (error) {
    console.error('Fehler bei der Analyse:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Interner Serverfehler bei der Analyse',
        details: error.message
      })
    };
  }
};