/**
 * 🎨 ColorEditor - Perfect UX for Color Editing
 * One-click color editing with live preview and smart suggestions
 * 
 * Innovation: Real-time preview + Smart color harmony + Easy export
 * Pattern: Observer + Command + State Machine
 */

'use client';
import { useState, useEffect, useRef } from 'react';
import { eventBus } from '../core/EventBus.js';

const ColorEditor = ({ 
  colorEngine,
  onClose 
}) => {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [editingColor, setEditingColor] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [semanticGroups, setSemanticGroups] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    if (colorEngine?.colorRegistry) {
      const allColors = colorEngine.colorRegistry.getAllColors();
      const semanticSummary = colorEngine.colorRegistry.getSemanticSummary();
      
      setColors(allColors);
      setSemanticGroups(semanticSummary);
    }

    // Listen for color updates
    const unsubscribe = eventBus.on('color:updated', (updatedColor) => {
      setColors(prev => prev.map(c => 
        c.id === updatedColor.id ? updatedColor : c
      ));
    });

    return () => unsubscribe();
  }, [colorEngine]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setEditingColor(color.hex);
  };

  const handleColorChange = (newHex) => {
    setEditingColor(newHex);
    
    if (selectedColor && previewMode) {
      // Live preview - inject new color temporarily
      const property = `--discovered-${selectedColor.id}`;
      document.documentElement.style.setProperty(property, newHex);
    }
  };

  const applyColorChange = () => {
    if (!selectedColor || !editingColor) return;

    // Apply permanent change
    const property = `--discovered-${selectedColor.id}`;
    document.documentElement.style.setProperty(property, editingColor);
    
    // Update semantic properties if this color has a role
    if (selectedColor.semanticRole) {
      const semanticProperty = `--color-${selectedColor.semanticRole}`;
      document.documentElement.style.setProperty(semanticProperty, editingColor);
    }

    // Save to engine
    if (colorEngine?.saveTheme) {
      colorEngine.saveTheme();
    }

    // Update local state
    setColors(prev => prev.map(c => 
      c.id === selectedColor.id 
        ? { ...c, hex: editingColor, originalHex: c.originalHex || c.hex }
        : c
    ));

    eventBus.emit('color:applied', { 
      colorId: selectedColor.id, 
      newHex: editingColor,
      semanticRole: selectedColor.semanticRole
    });
  };

  const resetColor = () => {
    if (!selectedColor) return;

    const originalHex = selectedColor.originalHex || selectedColor.hex;
    const property = `--discovered-${selectedColor.id}`;
    document.documentElement.style.setProperty(property, originalHex);
    
    if (selectedColor.semanticRole) {
      const semanticProperty = `--color-${selectedColor.semanticRole}`;
      document.documentElement.style.setProperty(semanticProperty, originalHex);
    }

    setEditingColor(originalHex);
    applyColorChange();
  };

  const generateColorHarmony = (baseColor) => {
    // Convert hex to HSL for color harmony calculations
    const hexToHsl = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      const add = max + min;
      const l = add * 0.5;
      
      let h, s;
      if (diff === 0) {
        h = s = 0;
      } else {
        s = l < 0.5 ? diff / add : diff / (2 - add);
        switch (max) {
          case r: h = ((g - b) / diff) + (g < b ? 6 : 0); break;
          case g: h = (b - r) / diff + 2; break;
          case b: h = (r - g) / diff + 4; break;
        }
        h /= 6;
      }
      
      return { h: h * 360, s: s * 100, l: l * 100 };
    };

    const hslToHex = (h, s, l) => {
      h /= 360; s /= 100; l /= 100;
      const a = s * Math.min(l, 1 - l);
      const f = n => {
        const k = (n + h / (1/12)) % 12;
        return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      };
      const r = Math.round(f(0) * 255);
      const g = Math.round(f(8) * 255);
      const b = Math.round(f(4) * 255);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    const baseHsl = hexToHsl(baseColor);
    
    return {
      complementary: hslToHex((baseHsl.h + 180) % 360, baseHsl.s, baseHsl.l),
      triadic1: hslToHex((baseHsl.h + 120) % 360, baseHsl.s, baseHsl.l),
      triadic2: hslToHex((baseHsl.h + 240) % 360, baseHsl.s, baseHsl.l),
      analogous1: hslToHex((baseHsl.h + 30) % 360, baseHsl.s, baseHsl.l),
      analogous2: hslToHex((baseHsl.h - 30 + 360) % 360, baseHsl.s, baseHsl.l),
      lighter: hslToHex(baseHsl.h, baseHsl.s, Math.min(95, baseHsl.l + 20)),
      darker: hslToHex(baseHsl.h, baseHsl.s, Math.max(5, baseHsl.l - 20))
    };
  };

  const exportTheme = async () => {
    setIsExporting(true);
    
    try {
      const theme = {};
      colors.forEach(color => {
        if (color.originalHex && color.hex !== color.originalHex) {
          theme[`--discovered-${color.id}`] = color.hex;
          if (color.semanticRole) {
            theme[`--color-${color.semanticRole}`] = color.hex;
          }
        }
      });

      // Create download
      const themeJson = JSON.stringify(theme, null, 2);
      const blob = new Blob([themeJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'medical-inn-hair-theme.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Also copy to clipboard
      await navigator.clipboard.writeText(themeJson);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const filteredColors = colors.filter(color => 
    !searchTerm || 
    color.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (color.semanticRole && color.semanticRole.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getMostUsedColors = () => {
    return [...colors]
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 6);
  };

  const getSemanticColors = () => {
    const semanticColors = {};
    Object.entries(semanticGroups).forEach(([role, colorIds]) => {
      if (colorIds.length > 0) {
        const color = colors.find(c => c.id === colorIds[0]);
        if (color) semanticColors[role] = color;
      }
    });
    return semanticColors;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 10001,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        display: 'flex'
      }}>
        
        {/* Sidebar */}
        <div style={{
          width: '320px',
          backgroundColor: '#f8f9fa',
          borderRight: '1px solid #e9ecef',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #e9ecef'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
                  🎨 Color Studio
                </h2>
                <p style={{ margin: 0, fontSize: '14px', color: '#666', marginTop: '4px' }}>
                  {colors.length} colors • Live editing
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#666',
                  borderRadius: '8px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e9ecef'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>
          </div>

          {/* Search */}
          <div style={{ padding: '16px' }}>
            <input
              type="text"
              placeholder="🔍 Search colors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Quick Actions */}
          <div style={{ padding: '0 16px 16px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button
                onClick={() => setPreviewMode(!previewMode)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  backgroundColor: previewMode ? '#007bff' : 'white',
                  color: previewMode ? 'white' : '#333',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                {previewMode ? '👁️ Preview ON' : '👁️ Preview OFF'}
              </button>
              <button
                onClick={exportTheme}
                disabled={isExporting}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #28a745',
                  borderRadius: '6px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  fontSize: '12px',
                  cursor: isExporting ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  opacity: isExporting ? 0.6 : 1
                }}
              >
                {isExporting ? '⏳ Export...' : '📥 Export'}
              </button>
            </div>
          </div>

          {/* Color List */}
          <div style={{ 
            flex: 1, 
            overflow: 'auto', 
            padding: '0 16px 16px'
          }}>
            {/* Most Used Colors */}
            {!searchTerm && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ 
                  margin: '0 0 12px 0', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#333'
                }}>
                  🔥 Most Used
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {getMostUsedColors().map((color, index) => (
                    <ColorItem
                      key={color.id}
                      color={color}
                      isSelected={selectedColor?.id === color.id}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Semantic Colors */}
            {!searchTerm && Object.keys(getSemanticColors()).length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ 
                  margin: '0 0 12px 0', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: '#333'
                }}>
                  🎯 Semantic Roles
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {Object.entries(getSemanticColors()).map(([role, color]) => (
                    <ColorItem
                      key={color.id}
                      color={{ ...color, semanticRole: role }}
                      isSelected={selectedColor?.id === color.id}
                      onClick={() => handleColorSelect(color)}
                      showRole={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Colors */}
            <div>
              <h4 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '14px', 
                fontWeight: '600',
                color: '#333'
              }}>
                {searchTerm ? `🔍 Search Results` : '🎨 All Colors'}
              </h4>
              <div style={{ display: 'grid', gap: '6px' }}>
                {filteredColors.map((color, index) => (
                  <ColorItem
                    key={color.id || index}
                    color={color}
                    isSelected={selectedColor?.id === color.id}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: 0
        }}>
          {selectedColor ? (
            <>
              {/* Color Info Header */}
              <div style={{
                padding: '24px',
                borderBottom: '1px solid #e9ecef',
                backgroundColor: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: editingColor,
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: '18px', 
                      fontWeight: '600',
                      fontFamily: 'monospace'
                    }}>
                      {editingColor.toUpperCase()}
                    </h3>
                    <p style={{ 
                      margin: '4px 0 0 0', 
                      fontSize: '14px', 
                      color: '#666'
                    }}>
                      Used {selectedColor.usageCount} times
                      {selectedColor.semanticRole && ` • Role: ${selectedColor.semanticRole}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Color Editor */}
              <div style={{
                flex: 1,
                padding: '24px',
                overflow: 'auto'
              }}>
                {/* Color Picker */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: '#333'
                  }}>
                    🎨 Color Picker
                  </label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      ref={colorPickerRef}
                      type="color"
                      value={editingColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      style={{
                        width: '60px',
                        height: '40px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    />
                    <input
                      type="text"
                      value={editingColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontFamily: 'monospace',
                        outline: 'none'
                      }}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                {/* Color Harmony */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: '#333'
                  }}>
                    🌈 Color Harmony
                  </label>
                  <ColorHarmonyPicker 
                    baseColor={editingColor}
                    onColorSelect={handleColorChange}
                    generateColorHarmony={generateColorHarmony}
                  />
                </div>

                {/* Actions */}
                <div style={{ 
                  display: 'flex', 
                  gap: '12px',
                  paddingTop: '24px',
                  borderTop: '1px solid #e9ecef'
                }}>
                  <button
                    onClick={applyColorChange}
                    style={{
                      flex: 1,
                      padding: '12px 24px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ✅ Apply Changes
                  </button>
                  <button
                    onClick={resetColor}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                  Select a Color to Edit
                </h3>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                  Choose a color from the sidebar to start editing
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Color Item Component
const ColorItem = ({ color, isSelected, onClick, showRole = false }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: isSelected ? '#e3f2fd' : 'white',
      border: isSelected ? '2px solid #007bff' : '1px solid #e9ecef',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      if (!isSelected) {
        e.target.style.backgroundColor = '#f8f9fa';
        e.target.style.borderColor = '#dee2e6';
      }
    }}
    onMouseLeave={(e) => {
      if (!isSelected) {
        e.target.style.backgroundColor = 'white';
        e.target.style.borderColor = '#e9ecef';
      }
    }}
  >
    <div
      style={{
        width: '20px',
        height: '20px',
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
        fontWeight: '600',
        color: '#333'
      }}>
        {color.hex.toUpperCase()}
      </div>
      <div style={{ 
        fontSize: '10px', 
        color: '#666',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {showRole && color.semanticRole 
          ? `${color.semanticRole} • ${color.usageCount}x`
          : `Used ${color.usageCount} times`
        }
      </div>
    </div>
  </div>
);

// Color Harmony Picker Component
const ColorHarmonyPicker = ({ baseColor, onColorSelect, generateColorHarmony }) => {
  const harmony = generateColorHarmony(baseColor);
  
  const harmonyTypes = [
    { key: 'complementary', name: 'Complementary', desc: 'Opposite on color wheel' },
    { key: 'triadic1', name: 'Triadic 1', desc: '120° apart' },
    { key: 'triadic2', name: 'Triadic 2', desc: '240° apart' },
    { key: 'analogous1', name: 'Analogous +', desc: '+30° similar' },
    { key: 'analogous2', name: 'Analogous -', desc: '-30° similar' },
    { key: 'lighter', name: 'Lighter', desc: '+20% lightness' },
    { key: 'darker', name: 'Darker', desc: '-20% lightness' }
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
      gap: '12px' 
    }}>
      {harmonyTypes.map(({ key, name, desc }) => (
        <div
          key={key}
          onClick={() => onColorSelect(harmony[key])}
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            backgroundColor: 'white',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f8f9fa';
            e.target.style.borderColor = '#007bff';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.borderColor = '#e9ecef';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: harmony[key],
              borderRadius: '6px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              margin: '0 auto 8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          />
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '4px'
          }}>
            {name}
          </div>
          <div style={{
            fontSize: '10px',
            color: '#666'
          }}>
            {desc}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorEditor;