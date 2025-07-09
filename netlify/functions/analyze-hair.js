const { generateText } = require('ai');
const { createOpenRouter } = require('@openrouter/ai-sdk-provider');

const ENFORCED_MODEL_ID = 'openai/gpt-4.1-mini';

const DEFAULT_PROMPT = `Du bist ein Experte für Haartransplantationen. Analysiere das Bild und gib eine fundierte Ersteinschätzung ab.

WICHTIGE HINWEISE:
1. Falls KEIN Haarausfall erkennbar ist, weise darauf hin, dass keine Behandlung nötig ist.
2. Bei ungeeigneten Bildern (unscharf, zu dunkel, keine Kopfhaut) bitte erwähnen.
3. Graftanzahl nur bei erkennbarem Haarausfall zwischen 2500-5000 angeben.

Strukturiere deine Antwort so:

Haarausfall-Typ: Beschreibe den Typ nach Norwood-Skala

Benötigte Grafts: Schätze die benötigten Haarfollikel

Empfohlene Methode: Welche Transplantationsmethode (FUE, DHI, etc.)

Mögliche Herausforderungen: Potenzielle Komplikationen

Empfehlungen: Ratschläge für optimalen Behandlungserfolg

Antwort auf Deutsch, präzise aber verständlich für Laien.`;

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

    // AI SDK verwenden mit Timeout
    const result = await Promise.race([
      generateText({
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
        maxTokens: 1500
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout nach 25 Sekunden')), 25000)
      )
    ]);

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