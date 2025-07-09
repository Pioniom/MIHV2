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

  const parseAnalysisText = (text) => {
    // Bessere Parser-Logic mit Markdown-Unterstützung
    const cleanText = text
      .replace(/###\s*\d+\.\s*/g, '') // Entferne ### 1., ### 2., etc.
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Entferne **bold**
      .replace(/\*([^*]+)\*/g, '$1') // Entferne *italic*
      .replace(/---/g, ''); // Entferne --- Trennlinien
    
    const sectionPatterns = [
      { pattern: /Haarausfall-Typ/i, type: 'hairloss', title: 'Haarausfall-Typ', icon: 'target' },
      { pattern: /Benötigte Grafts/i, type: 'grafts', title: 'Benötigte Grafts', icon: 'calculator' },
      { pattern: /Empfohlene Methode/i, type: 'method', title: 'Empfohlene Methode', icon: 'settings' },
      { pattern: /Herausforderungen/i, type: 'challenges', title: 'Mögliche Herausforderungen', icon: 'alert' },
      { pattern: /Empfehlungen/i, type: 'recommendations', title: 'Empfehlungen', icon: 'lightbulb' }
    ];
    
    const sections = [];
    const lines = cleanText.split('\n').filter(line => line.trim());
    let currentSection = null;
    
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;
      
      // Prüfe auf Sektion-Pattern
      let matched = false;
      for (const { pattern, type, title, icon } of sectionPatterns) {
        if (pattern.test(trimmedLine)) {
          // Verhindere Duplikate
          if (!sections.find(s => s.type === type)) {
            currentSection = { type, title, content: [], icon };
            sections.push(currentSection);
          }
          matched = true;
          break;
        }
      }
      
      // Füge Inhalt zur aktuellen Sektion hinzu
      if (!matched && currentSection) {
        currentSection.content.push(trimmedLine);
      } else if (!matched && sections.length === 0) {
        // Fallback für unstrukturierten Text
        currentSection = { type: 'general', title: 'Analyse-Ergebnis', content: [trimmedLine], icon: 'file-text' };
        sections.push(currentSection);
      }
    });
    
    // Fallback wenn keine Sektionen erkannt wurden
    if (sections.length === 0) {
      sections.push({ 
        type: 'general', 
        title: 'Analyse-Ergebnis', 
        content: cleanText.split('\n').filter(line => line.trim()), 
        icon: 'file-text' 
      });
    }
    
    return sections.map((section, index) => (
      <Div key={index} className="cs-analysis_section">
        <Div className="cs-section_header">
          <Div className="cs-section_icon">
            {getIconForSection(section.icon)}
          </Div>
          <h4 className="cs-section_title">{section.title}</h4>
        </Div>
        <Div className="cs-section_content">
          {section.content.map((line, lineIndex) => (
            <p key={lineIndex} className="cs-section_text">{line}</p>
          ))}
        </Div>
      </Div>
    ));
  };
  
  const getIconForSection = (iconType) => {
    switch (iconType) {
      case 'target':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        );
      case 'calculator':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="2" width="16" height="20" rx="2"/>
            <line x1="8" y1="6" x2="16" y2="6"/>
            <line x1="8" y1="10" x2="16" y2="10"/>
            <line x1="8" y1="14" x2="16" y2="14"/>
            <line x1="8" y1="18" x2="16" y2="18"/>
          </svg>
        );
      case 'settings':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
          </svg>
        );
      case 'alert':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      case 'lightbulb':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21h6"/>
            <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.5 1.02 4.77 2.66 6.41.82.82 1.34 1.96 1.34 3.2V21c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-.39c0-1.24.52-2.38 1.34-3.2C20.98 16.77 22 14.5 22 12c0-4.97-4.03-9-9-9z"/>
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        );
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
                      className="cs-btn cs-btn_secondary"
                      onClick={() => {
                        setImageUrl(null);
                        setAnalysisText('');
                        setError(null);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17,8 12,3 7,8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      Neues Bild auswählen
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
            
            {/* Analysis Progress */}
            {isAnalyzing && (
              <Div className="cs-analysis_progress">
                <Div className="cs-progress_container">
                  <Div className="cs-progress_header">
                    <Div className="cs-progress_icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m-4-7V9a2 2 0 0 1 2-2h4M5 11h4a2 2 0 0 1 2 2v3c0 1.1-.9 2-2 2H5m0-7h4"/>
                        <path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/>
                        <path d="M19 7h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1"/>
                      </svg>
                    </Div>
                    <Div className="cs-progress_text">
                      <h4>KI-Analyse läuft...</h4>
                      <p>Ihr Bild wird von unserer spezialisierten Haaranalyse-KI untersucht</p>
                    </Div>
                  </Div>
                  
                  <Div className="cs-progress_bar">
                    <Div className="cs-progress_track">
                      <Div className="cs-progress_fill"></Div>
                    </Div>
                  </Div>
                  
                  <Div className="cs-progress_steps">
                    <Div className="cs-step cs-step_active">
                      <Div className="cs-step_icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="m9 12 2 2 4-4"/>
                        </svg>
                      </Div>
                      <span>Bild verarbeiten</span>
                    </Div>
                    <Div className="cs-step cs-step_active">
                      <Div className="cs-step_icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <circle cx="12" cy="12" r="6"/>
                          <circle cx="12" cy="12" r="2"/>
                        </svg>
                      </Div>
                      <span>Haarstruktur analysieren</span>
                    </Div>
                    <Div className="cs-step cs-step_processing">
                      <Div className="cs-step_icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21h6"/>
                          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.5 1.02 4.77 2.66 6.41.82.82 1.34 1.96 1.34 3.2V21c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-.39c0-1.24.52-2.38 1.34-3.2C20.98 16.77 22 14.5 22 12c0-4.97-4.03-9-9-9z"/>
                        </svg>
                      </Div>
                      <span>Ergebnisse generieren</span>
                    </Div>
                  </Div>
                </Div>
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
                <h3 className="cs-result_title">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m-4-7V9a2 2 0 0 1 2-2h4M5 11h4a2 2 0 0 1 2 2v3c0 1.1-.9 2-2 2H5m0-7h4"/>
                    <path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/>
                    <path d="M19 7h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1"/>
                  </svg>
                  Medizinische Haaranalyse
                </h3>
                <Div className="cs-result_content">
                  <Div className="cs-analysis_structured">
                    {parseAnalysisText(analysisText)}
                  </Div>
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