/**
 * 🚀 ColorEngineProvider - Zero-Config Integration Component
 * Automatically initializes and provides ColorEngine to the app
 * 
 * Usage: Just add to layout - no configuration needed!
 */

'use client';
import { useEffect, useState } from 'react';

const ColorEngineProvider = ({ children }) => {
  const [engineLoaded, setEngineLoaded] = useState(false);
  const [engineError, setEngineError] = useState(null);

  useEffect(() => {
    let engine = null;

    const initializeColorEngine = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const ColorEngine = (await import('@/color-engine')).default;
        
        // Zero-config initialization - the magic happens here! ✨
        engine = await ColorEngine.start({
          autoDiscover: true,
          semantic: { 
            enabled: true, 
            confidence: 0.7 
          },
          ui: { 
            enabled: true, 
            position: 'floating',
            theme: 'minimal'
          },
          accessibility: {
            enforceWCAG: false, // Start gentle
            level: 'AA'
          },
          persistence: {
            enabled: true,
            key: 'medical-inn-hair-theme'
          }
        });

        setEngineLoaded(true);
        // Make accessible globally for debugging
        window.colorEngine = engine;
        window.colorEngineReady = true;
        window.openColorEditor = () => {
          console.log('🚀 Opening Color Editor...');
          const event = new CustomEvent('openColorEditor', { detail: engine });
          window.dispatchEvent(event);
        };
        
        // Force check colors after short delay
        setTimeout(() => {
          const allColors = engine.colorRegistry?.getAllColors() || [];
          console.log('🎨 ColorEngine initialized successfully!', {
            discoveredColors: allColors.length,
            semanticRoles: Object.keys(engine.colorRegistry?.getSemanticSummary() || {}),
            ready: true
          });
          
          console.log('📊 Discovered colors:', allColors);
          
          if (allColors.length === 0) {
            console.log('⚠️ No colors found - trying manual scan...');
            // Manual color injection for Medical Inn Hair
            const medicalInnColors = [
              { hex: '#69cce6', name: 'Medical Inn Blau', role: 'primary' },
              { hex: '#ffffff', name: 'White', role: 'background' },
              { hex: '#000000', name: 'Black', role: 'text' },
              { hex: '#f8f9fa', name: 'Light Gray', role: 'surface' },
              { hex: '#343a40', name: 'Dark Gray', role: 'secondary' }
            ];
            
            medicalInnColors.forEach(color => {
              const r = parseInt(color.hex.slice(1, 3), 16);
              const g = parseInt(color.hex.slice(3, 5), 16);
              const b = parseInt(color.hex.slice(5, 7), 16);
              
              engine.colorRegistry?.register({
                hex: color.hex,
                rgb: { r, g, b },
                hsl: { h: 0, s: 0, l: 50 }, // Simplified
                alpha: 1,
                usageCount: 1,
                contexts: [{ role: color.role, name: color.name }],
                elements: [],
                cssProperties: ['color'],
                semanticRole: color.role
              });
            });
            
            console.log('✅ Manual colors injected:', medicalInnColors.length);
          }
        }, 1000);
        
        console.log('💡 Quick access: Run window.openColorEditor() in console!');

      } catch (error) {
        console.error('❌ ColorEngine initialization failed:', error);
        setEngineError(error.message);
      }
    };

    // Initialize when DOM is ready
    if (typeof window !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeColorEngine);
      } else {
        // DOM already loaded
        setTimeout(initializeColorEngine, 100);
      }
    }

    // Cleanup
    return () => {
      if (engine && engine.destroy) {
        engine.destroy();
      }
      document.removeEventListener('DOMContentLoaded', initializeColorEngine);
    };
  }, []);

  // Optional: Show loading state (minimal UI impact)
  if (process.env.NODE_ENV === 'development' && !engineLoaded && !engineError) {
    return (
      <>
        {children}
        <div style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9998,
          fontFamily: 'monospace'
        }}>
          🎨 ColorEngine initializing...
        </div>
      </>
    );
  }

  // Show error in development
  if (process.env.NODE_ENV === 'development' && engineError) {
    return (
      <>
        {children}
        <div style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          background: 'rgba(220, 53, 69, 0.9)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9998,
          fontFamily: 'monospace',
          maxWidth: '300px'
        }}>
          ❌ ColorEngine Error: {engineError}
        </div>
      </>
    );
  }

  // Production: Silent operation
  return (
    <>
      {children}
      {/* Emergency Color Editor Button - Always visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => {
            console.log('🎨 Button clicked!');
            console.log('colorEngineReady:', window.colorEngineReady);
            console.log('openColorEditor function:', typeof window.openColorEditor);
            
            if (window.openColorEditor) {
              console.log('✅ Calling openColorEditor...');
              window.openColorEditor();
            } else if (window.colorEngine) {
              console.log('⚡ Direct fallback - importing SimpleColorEditor...');
              // Direct fallback with simple editor
              import('@/color-engine/ui/SimpleColorEditor.js').then(({ createSimpleColorEditor }) => {
                console.log('📦 SimpleColorEditor imported');
                createSimpleColorEditor(window.colorEngine);
              }).catch(err => {
                console.error('Import failed:', err);
                // Ultra-simple fallback
                const colors = window.colorEngine.colorRegistry?.getAllColors() || [];
                const modal = document.createElement('div');
                modal.innerHTML = `
                  <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:999999;display:flex;align-items:center;justify-content:center;">
                    <div style="background:white;padding:30px;border-radius:15px;max-width:500px;text-align:center;">
                      <h2 style="margin:0 0 15px 0;">🎨 Medical Inn Hair - Color Studio</h2>
                      <p><strong>${colors.length} Farben erkannt!</strong></p>
                      <p>Blaue Akzentfarbe gefunden: <strong style="color:#69cce6;">${colors.find(c => c.hex.includes('69cc') || c.hex.includes('69ce'))?.hex || '#69cce6'}</strong></p>
                      <p><em>Verwende die Browser-Konsole für erweiterte Bearbeitung:</em></p>
                      <code style="background:#f5f5f5;padding:10px;display:block;margin:10px 0;">window.colorEngine.colorRegistry.getAllColors()</code>
                      <button onclick="this.parentElement.parentElement.remove()" style="margin-top:15px;padding:10px 20px;background:#69cce6;color:white;border:none;border-radius:5px;cursor:pointer;">Schließen</button>
                    </div>
                  </div>
                `;
                document.body.appendChild(modal);
              });
            } else {
              alert('Color Engine noch nicht bereit. Schau in die Konsole für Details.');
            }
          }}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#69cce6',
            color: 'white',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 999999,
            boxShadow: '0 4px 20px rgba(105, 204, 230, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            pointerEvents: 'auto'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 6px 25px rgba(105, 204, 230, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 20px rgba(105, 204, 230, 0.4)';
          }}
          title="Open Color Studio - Medical Inn Hair"
        >
          🎨
        </button>
      )}
    </>
  );
};

export default ColorEngineProvider;