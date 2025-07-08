/**
 * 🎯 FloatingTrigger - Minimal UI Entry Point
 * Floating button that reveals the color editor interface
 * 
 * Innovation: Context-aware positioning with minimal footprint
 * Pattern: Factory + Observer + State Machine
 */

'use client';
import { useState, useEffect } from 'react';
import { eventBus } from '../core/EventBus.js';
// import ColorEditor from './ColorEditor.jsx'; // Temporarily disabled - using fallback

const FloatingTrigger = ({ 
  position = 'floating',
  theme = 'minimal',
  colorEngine
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isFullEditorOpen, setIsFullEditorOpen] = useState(false);
  const [discoveredColors, setDiscoveredColors] = useState([]);
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    // Listen to color engine events
    const unsubscribeReady = eventBus.on('engine:ready', () => {
      setEngineReady(true);
    });

    const unsubscribeDiscovery = eventBus.on('discovery:completed', (colors) => {
      setDiscoveredColors(colors);
    });

    const unsubscribeColorUpdate = eventBus.on('color:discovered', (color) => {
      setDiscoveredColors(prev => [...prev, color]);
    });

    const unsubscribeFullEditor = eventBus.on('ui:fullEditorRequested', () => {
      setIsFullEditorOpen(true);
      setIsEditorOpen(false);
    });

    // Listen for global editor open requests
    const handleGlobalEditorOpen = (event) => {
      console.log('🎯 FloatingTrigger received openColorEditor event');
      console.log('🔄 Setting isFullEditorOpen to true...');
      setIsFullEditorOpen(true);
      setIsEditorOpen(false);
      
      // Force re-render
      setTimeout(() => {
        console.log('🎯 State updated - isFullEditorOpen should be true');
      }, 100);
    };
    
    window.addEventListener('openColorEditor', handleGlobalEditorOpen);
    
    // Also add direct window function
    window.forceOpenColorEditor = () => {
      console.log('🚀 Force opening color editor from FloatingTrigger');
      setIsFullEditorOpen(true);
      setIsEditorOpen(false);
      console.log('🔄 Direct force - State should update immediately');
    };

    // Cleanup
    return () => {
      unsubscribeReady();
      unsubscribeDiscovery();
      unsubscribeColorUpdate();
      unsubscribeFullEditor();
      window.removeEventListener('openColorEditor', handleGlobalEditorOpen);
    };
  }, []);

  const handleToggleEditor = () => {
    setIsEditorOpen(!isEditorOpen);
    eventBus.emit('ui:editorToggled', !isEditorOpen);
  };

  const handleHide = () => {
    setIsVisible(false);
    eventBus.emit('ui:triggerHidden');
  };

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed',
      zIndex: 9999,
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    };

    switch (position) {
      case 'top-right':
        return { ...baseStyles, top: '20px', right: '20px' };
      case 'top-left':
        return { ...baseStyles, top: '20px', left: '20px' };
      case 'bottom-right':
        return { ...baseStyles, bottom: '20px', right: '20px' };
      case 'bottom-left':
        return { ...baseStyles, bottom: '20px', left: '20px' };
      default: // floating
        return { ...baseStyles, top: '50%', right: '20px', transform: 'translateY(-50%)' };
    }
  };

  const getThemeStyles = () => {
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent') || '#69cce6';
    
    const baseTheme = {
      width: '56px',
      height: '56px',
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    switch (theme) {
      case 'professional':
        return {
          ...baseTheme,
          background: `linear-gradient(135deg, ${accent}, ${accent}dd)`,
          color: 'white',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        };
      case 'creative':
        return {
          ...baseTheme,
          background: `conic-gradient(from 0deg, ${accent}, #8cacff, ${accent})`,
          color: 'white',
          animation: 'pulse 2s infinite'
        };
      default: // minimal
        return {
          ...baseTheme,
          backgroundColor: accent,
          color: 'white'
        };
    }
  };

  // Color Editor disabled for production
  if (!isVisible || !engineReady || true) return null;

  return (
    <>
      <button
        onClick={handleToggleEditor}
        style={{
          ...getPositionStyles(),
          ...getThemeStyles(),
          pointerEvents: 'auto'
        }}
        title={`Color Engine - ${discoveredColors.length} colors discovered`}
        aria-label="Open color theme editor"
      >
        🎨
      </button>

      {/* Quick Color Preview */}
      {discoveredColors.length > 0 && (
        <div
          style={{
            position: 'fixed',
            ...getPositionStyles(),
            top: getPositionStyles().top ? 
              `calc(${getPositionStyles().top} + 70px)` : 
              'calc(50% + 35px)',
            width: '56px',
            height: 'auto',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '8px',
            opacity: isEditorOpen ? 0 : 0.8,
            pointerEvents: isEditorOpen ? 'none' : 'auto',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '4px',
            maxHeight: '100px',
            overflow: 'hidden'
          }}>
            {discoveredColors.slice(0, 8).map((color, index) => (
              <div
                key={color.id || index}
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: color.hex,
                  borderRadius: '2px',
                  border: '1px solid rgba(0, 0, 0, 0.1)'
                }}
                title={`${color.hex} - Used ${color.usageCount} times`}
              />
            ))}
          </div>
          {discoveredColors.length > 8 && (
            <div style={{
              fontSize: '10px',
              textAlign: 'center',
              color: '#666',
              marginTop: '4px'
            }}>
              +{discoveredColors.length - 8} more
            </div>
          )}
        </div>
      )}

      {/* Mini Editor Panel */}
      {isEditorOpen && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '320px',
            maxHeight: '80vh',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            zIndex: 10000,
            pointerEvents: 'auto'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8f9fa'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                🎨 Color Engine
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                {discoveredColors.length} colors discovered
              </p>
            </div>
            <button
              onClick={handleToggleEditor}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '16px', maxHeight: 'calc(80vh - 80px)', overflow: 'auto' }}>
            {discoveredColors.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
                <p>Scanning for colors...</p>
              </div>
            ) : (
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
                  Discovered Colors
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {discoveredColors.slice(0, 20).map((color, index) => (
                    <div
                      key={color.id || index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px',
                        borderRadius: '6px',
                        backgroundColor: '#f8f9fa',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#e9ecef'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: color.hex,
                          borderRadius: '4px',
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          flexShrink: 0
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ 
                          fontFamily: 'monospace', 
                          fontSize: '12px', 
                          fontWeight: '600' 
                        }}>
                          {color.hex}
                        </div>
                        <div style={{ 
                          fontSize: '10px', 
                          color: '#666',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          Used {color.usageCount} times
                          {color.semanticRole && ` • ${color.semanticRole}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {discoveredColors.length > 20 && (
                  <div style={{
                    textAlign: 'center',
                    marginTop: '12px',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    Showing 20 of {discoveredColors.length} colors
                  </div>
                )}

                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
                  <button
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: getThemeStyles().backgroundColor,
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    onClick={() => {
                      setIsFullEditorOpen(true);
                      setIsEditorOpen(false);
                    }}
                  >
                    <span>🚀</span>
                    Open Pro Editor
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full Color Editor */}
      {isFullEditorOpen && (
        <>
          {console.log('🎨 Rendering Fallback ColorEditor - isFullEditorOpen:', isFullEditorOpen)}
          {false ? (
            <ColorEditor
              colorEngine={colorEngine}
              onClose={() => {
                console.log('🚪 Closing ColorEditor');
                setIsFullEditorOpen(false);
              }}
            />
          ) : (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'system-ui'
            }}>
              <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '20px',
                maxWidth: '600px',
                maxHeight: '80vh',
                overflow: 'auto',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ margin: 0, color: '#333' }}>🎨 Medical Inn Hair - Color Studio</h2>
                  <button
                    onClick={() => setIsFullEditorOpen(false)}
                    style={{
                      background: '#69cce6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '35px',
                      height: '35px',
                      fontSize: '18px',
                      cursor: 'pointer'
                    }}
                  >×</button>
                </div>
                
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px' }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>🎯 Medical Inn Blau</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <input
                        type="color"
                        defaultValue="#69cce6"
                        onChange={(e) => {
                          document.documentElement.style.setProperty('--color-primary', e.target.value);
                          document.documentElement.style.setProperty('--color-accent', e.target.value);
                        }}
                        style={{
                          width: '60px',
                          height: '40px',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      />
                      <div>
                        <div style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '16px' }}>#69CCE6</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Hauptfarbe der Website</div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <button
                      onClick={() => {
                        document.documentElement.style.setProperty('--color-primary', '#e91e63');
                        document.documentElement.style.setProperty('--color-accent', '#e91e63');
                      }}
                      style={{
                        padding: '12px',
                        background: '#e91e63',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >🌸 Pink</button>
                    <button
                      onClick={() => {
                        document.documentElement.style.setProperty('--color-primary', '#2196f3');
                        document.documentElement.style.setProperty('--color-accent', '#2196f3');
                      }}
                      style={{
                        padding: '12px',
                        background: '#2196f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >🔵 Blau</button>
                    <button
                      onClick={() => {
                        document.documentElement.style.setProperty('--color-primary', '#4caf50');
                        document.documentElement.style.setProperty('--color-accent', '#4caf50');
                      }}
                      style={{
                        padding: '12px',
                        background: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >🟢 Grün</button>
                  </div>
                  
                  <button
                    onClick={() => {
                      document.documentElement.style.setProperty('--color-primary', '#69cce6');
                      document.documentElement.style.setProperty('--color-accent', '#69cce6');
                    }}
                    style={{
                      padding: '12px 24px',
                      background: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                  >🔄 Zurück zu Medical Inn Orange</button>
                  
                  <div style={{ 
                    background: '#e3f2fd', 
                    padding: '15px', 
                    borderRadius: '8px',
                    border: '1px solid #2196f3'
                  }}>
                    <p style={{ margin: 0, color: '#1565c0', fontSize: '14px' }}>
                      💡 <strong>Tipp:</strong> Alle Farbänderungen sind sofort auf der Website sichtbar!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: 'monospace',
          zIndex: 99998
        }}>
          Editor: {isFullEditorOpen ? 'OPEN' : 'CLOSED'} | Colors: {discoveredColors.length} | ColorEditor: {ColorEditor ? 'LOADED' : 'MISSING'}
          <br />
          <button 
            onClick={() => setIsFullEditorOpen(!isFullEditorOpen)}
            style={{
              background: '#69cce6',
              color: 'white',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '10px',
              marginTop: '4px'
            }}
          >
            Toggle Editor
          </button>
        </div>
      )}

      {/* Pulse animation for creative theme */}
      {theme === 'creative' && (
        <style>
          {`
            @keyframes pulse {
              0%, 100% { transform: translateY(-50%) scale(1); }
              50% { transform: translateY(-50%) scale(1.05); }
            }
          `}
        </style>
      )}
    </>
  );
};

export default FloatingTrigger;