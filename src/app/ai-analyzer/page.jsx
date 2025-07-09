'use client'
import { useState, useRef } from 'react';
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import Image from "next/image";

// Feste Modell-Konfiguration
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

export default function AIAnalyzerPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisText, setAnalysisText] = useState('');
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Bestimme die korrekte API-URL basierend auf der Umgebung
  const getApiUrl = () => {
    if (typeof window === 'undefined') {
      return '/.netlify/functions/analyze-hair';
    }
    const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isLocalDev ? '/.netlify/functions/analyze-hair.js' : '/.netlify/functions/analyze-hair';
  };

  // Funktion zum Konvertieren eines Bildes in Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Datei-Upload Handler
  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validiere Dateityp
    if (!file.type.startsWith('image/')) {
      setError('Bitte wählen Sie ein Bild (JPG, PNG, etc.)');
      return;
    }

    // Validiere Dateigröße (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Die maximale Dateigröße beträgt 10MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Konvertiere das Bild in Base64 für die Analyse
      const base64Data = await convertToBase64(file);
      setImageUrl(base64Data);
      setIsUploading(false);
    } catch (err) {
      setError('Fehler beim Hochladen des Bildes');
      setIsUploading(false);
    }
  };

  // Input Change Handler
  const handleInputChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Analyse starten
  const startAnalysis = async () => {
    if (!imageUrl) {
      setError('Bitte zuerst ein Bild hochladen');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisText('');

    try {
      const apiUrl = getApiUrl();
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
          model: ENFORCED_MODEL_ID,
          isBase64: true,
          prompt: DEFAULT_PROMPT
        })
      });

      if (!response.ok) {
        throw new Error(`Server antwortete mit Status ${response.status}`);
      }

      const data = await response.json();
      const analysisResult = data.analysis || "Keine Analyse verfügbar";
      setAnalysisText(analysisResult);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setError(`Bei der Analyse ist ein Fehler aufgetreten: ${errorMessage}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <PageHeading 
        title='AI Haar-Analyzer'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='AI ANALYZER'
      />
      
      <Spacing lg='145' md='80'/>
      
      <Div className="container">
        <SectionHeading 
          title='Intelligente Haaranalyse mit KI-Technologie' 
          subtitle='Laden Sie ein Bild hoch und erhalten Sie eine detaillierte Analyse' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        
        <Div className="row justify-content-center">
          <Div className="col-lg-8">
            {/* Upload Bereich */}
            <Div className="cs-analyzer_upload">
              <Div 
                className={`cs-upload_area ${dragActive ? 'cs-drag_active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!imageUrl ? (
                  <>
                    <Div className="cs-upload_icon">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17,8 12,3 7,8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </Div>
                    <h3 className="cs-upload_title">Bild hochladen</h3>
                    <p className="cs-upload_text">
                      Ziehen Sie ein Bild hierher oder klicken Sie zum Auswählen
                    </p>
                    <button 
                      className="cs-btn cs-style1"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <span>{isUploading ? 'Lädt...' : 'Bild auswählen'}</span>
                    </button>
                  </>
                ) : (
                  <Div className="cs-upload_preview">
                    <Image 
                      src={imageUrl} 
                      alt="Hochgeladenes Bild" 
                      width={400}
                      height={300}
                      className="cs-preview_image"
                    />
                    <button 
                      className="cs-btn cs-style2"
                      onClick={() => {
                        setImageUrl(null);
                        setAnalysisText('');
                        setError(null);
                      }}
                    >
                      <span>Neues Bild</span>
                    </button>
                  </Div>
                )}
              </Div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                style={{ display: 'none' }}
              />
            </Div>
            
            <Spacing lg='40' md='30'/>
            
            {/* Analyse Button */}
            {imageUrl && (
              <Div className="text-center">
                <button 
                  className="cs-btn cs-style1"
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                >
                  <span>{isAnalyzing ? 'Analysiere...' : 'Analyse starten'}</span>
                </button>
              </Div>
            )}
            
            <Spacing lg='40' md='30'/>
            
            {/* Fehler Anzeige */}
            {error && (
              <Div className="cs-error_message">
                <p className="cs-error_text">{error}</p>
              </Div>
            )}
            
            {/* Analyse Ergebnis */}
            {analysisText && (
              <Div className="cs-analysis_result">
                <h3 className="cs-result_title">Analyse-Ergebnis</h3>
                <Div className="cs-result_content">
                  <pre className="cs-analysis_text">{analysisText}</pre>
                </Div>
              </Div>
            )}
          </Div>
        </Div>
      </Div>
      
      <Spacing lg='150' md='80'/>
      
      <Div className="container">
        <Cta 
          title='Haben Sie Fragen zur <br />AI <i>Analyse</i>?' 
          btnText='Beratung buchen' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  );
}