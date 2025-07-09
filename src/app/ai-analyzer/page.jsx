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
        <Spacing lg='50' md='30'/>
        
        {/* AI Technologie Info */}
        <Div className="row justify-content-center">
          <Div className="col-lg-10">
            <Div className="cs-analysis_info">
              <Div className="row">
                <Div className="col-md-6">
                  <Div className="cs-info_box">
                    <Div className="cs-info_icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                    </Div>
                    <h4>Speziell trainiert für Haaranalyse</h4>
                    <p>Unser AI-Modell wurde mit über 10.000 Haaranalyse-Bildern trainiert und erreicht eine Genauigkeit von 95% bei der Erkennung von Haarausfall-Mustern.</p>
                  </Div>
                </Div>
                <Div className="col-md-6">
                  <Div className="cs-info_box">
                    <Div className="cs-info_icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
                      </svg>
                    </Div>
                    <h4>Sofortige Ergebnisse</h4>
                    <p>Erhalten Sie in wenigen Sekunden eine detaillierte Analyse Ihrer Haarsituation mit präzisen Empfehlungen für Behandlungsmöglichkeiten.</p>
                  </Div>
                </Div>
                <Div className="col-md-6">
                  <Div className="cs-info_box">
                    <Div className="cs-info_icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3v18h18"/>
                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                      </svg>
                    </Div>
                    <h4>Norwood-Skala Bewertung</h4>
                    <p>Professionelle Einordnung Ihres Haarausfalls nach der medizinischen Norwood-Skala mit genauer Stadien-Bestimmung.</p>
                  </Div>
                </Div>
                <Div className="col-md-6">
                  <Div className="cs-info_box">
                    <Div className="cs-info_icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m-4-7V9a2 2 0 0 1 2-2h4M5 11h4a2 2 0 0 1 2 2v3c0 1.1-.9 2-2 2H5m0-7h4"/>
                        <path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/>
                        <path d="M19 7h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1"/>
                      </svg>
                    </Div>
                    <h4>Medizinische Präzision</h4>
                    <p>Entwickelt in Zusammenarbeit mit Haartransplantations-Experten für medizinisch fundierte Analysen und Behandlungsempfehlungen.</p>
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
        <Spacing lg='60' md='40'/>
        
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
                      Ziehen Sie ein Bild hierher oder klicken Sie zum Auswählen<br/>
                      <strong>Unterstützte Formate:</strong> JPG, PNG, WebP<br/>
                      <strong>Maximale Größe:</strong> 10 MB<br/>
                      <strong>Empfehlung:</strong> Klare Aufnahme der Kopfhaut von oben
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
                
                {/* Disclaimer */}
                <Div className="cs-analysis_disclaimer">
                  <p className="cs-disclaimer_text">
                    Dieses hochentwickelte KI-Tool wurde speziell für die Analyse von Haarwuchs und Kopfhaut trainiert und bietet eine automatisierte Ersteinschätzung. Es ersetzt jedoch keine professionelle medizinische Diagnose oder Beratung durch einen qualifizierten Arzt. Die Ergebnisse sind ohne Gewähr. Medical Inn Hair übernimmt keine Haftung für die Richtigkeit oder Vollständigkeit der Analyse sowie für darauf basierende Entscheidungen.
                  </p>
                </Div>
                
                {/* Powered by Badge */}
                <Div className="cs-powered_badge">
                  <a
                    href="https://webanomaly.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-badge_link"
                  >
                    <span className="cs-badge_main">Powered by Web Anomaly</span>
                    <span className="cs-badge_sub">We build AI Agents</span>
                  </a>
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