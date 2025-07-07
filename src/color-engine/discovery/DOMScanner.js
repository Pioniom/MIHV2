/**
 * 🔍 DOMScanner - Automatic Color Discovery Engine
 * Scans DOM and extracts all colors with contextual information
 * 
 * Innovation: Context-aware color extraction with semantic hints
 * Pattern: Visitor + Observer + Strategy
 */

import { eventBus } from '../core/EventBus.js';

class DOMScanner {
  constructor() {
    this.colorPatterns = {
      hex: /#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})/gi,
      rgb: /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/gi,
      hsl: /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([\d.]+))?\s*\)/gi
    };
    
    this.cssProperties = [
      'color', 'background-color', 'border-color', 'border-top-color',
      'border-right-color', 'border-bottom-color', 'border-left-color',
      'outline-color', 'text-decoration-color', 'box-shadow', 'text-shadow',
      'background', 'border', 'outline'
    ];
    
    this.semanticHints = {
      'button': ['accent', 'primary'],
      'a': ['link', 'accent'],
      'h1,h2,h3,h4,h5,h6': ['heading', 'primary'],
      '.btn, .button': ['accent', 'primary'],
      '.bg-': ['background', 'surface'],
      '.text-': ['text', 'foreground'],
      '.border-': ['border', 'outline'],
      'input, select, textarea': ['input', 'form'],
      '.alert, .warning, .error': ['status', 'feedback'],
      'nav, .nav, .navbar': ['navigation', 'primary']
    };
  }

  /**
   * Scan entire document for colors
   * @param {Object} options - Scan configuration
   */
  scan(options = {}) {
    const config = {
      includeComputed: true,
      includeInline: true,
      includeStylesheets: true,
      detectVariants: true,
      semanticAnalysis: true,
      excludeSelectors: ['script', 'style', 'noscript'],
      ...options
    };

    eventBus.emit('scan:started', config);
    
    const discoveredColors = new Map();
    
    try {
      // Scan DOM elements
      if (config.includeComputed || config.includeInline) {
        this._scanDOMElements(discoveredColors, config);
      }
      
      // Scan CSS stylesheets
      if (config.includeStylesheets) {
        this._scanStylesheets(discoveredColors, config);
      }
      
      // Convert to array and add metadata
      const colors = Array.from(discoveredColors.values()).map(color => ({
        ...color,
        scannedAt: Date.now(),
        variants: config.detectVariants ? this._detectVariants(color) : []
      }));

      eventBus.emit('scan:completed', colors);
      return colors;
      
    } catch (error) {
      eventBus.emit('scan:error', error);
      throw error;
    }
  }

  /**
   * Scan DOM elements for computed and inline styles
   */
  _scanDOMElements(discoveredColors, config) {
    const elements = document.querySelectorAll('*');
    console.log(`🔍 Scanning ${elements.length} DOM elements for colors...`);
    
    let scannedElements = 0;
    let foundValues = 0;
    
    elements.forEach(element => {
      if (config.excludeSelectors.some(sel => element.matches(sel))) return;
      
      scannedElements++;
      const computedStyle = config.includeComputed ? getComputedStyle(element) : null;
      const inlineStyle = config.includeInline ? element.style : null;
      
      this.cssProperties.forEach(property => {
        // Check computed styles
        if (computedStyle) {
          const value = computedStyle.getPropertyValue(property);
          if (value && value !== 'none' && value !== 'transparent' && value !== 'initial' && value !== 'inherit') {
            foundValues++;
            console.log(`Found ${property}: ${value} on`, element.tagName);
            this._extractColorsFromValue(value, discoveredColors, {
              element,
              property,
              source: 'computed',
              context: this._analyzeElementContext(element)
            });
          }
        }
        
        // Check inline styles
        if (inlineStyle && inlineStyle[property]) {
          foundValues++;
          console.log(`Found inline ${property}: ${inlineStyle[property]} on`, element.tagName);
          this._extractColorsFromValue(inlineStyle[property], discoveredColors, {
            element,
            property,
            source: 'inline',
            context: this._analyzeElementContext(element)
          });
        }
      });
    });
    
    console.log(`🔍 Scanned ${scannedElements} elements, found ${foundValues} style values, discovered ${discoveredColors.size} colors`);
  }

  /**
   * Scan CSS stylesheets
   */
  _scanStylesheets(discoveredColors, config) {
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        // Skip external stylesheets that might be inaccessible
        if (sheet.href && (sheet.href.includes('/_next/') || !sheet.href.startsWith(window.location.origin))) {
          // Try alternative approach for Next.js stylesheets
          this._scanNextStylesheet(sheet, discoveredColors, config);
          return;
        }
        
        Array.from(sheet.cssRules || []).forEach(rule => {
          if (rule.style) {
            this.cssProperties.forEach(property => {
              const value = rule.style.getPropertyValue(property);
              if (value && value !== 'none' && value !== 'transparent') {
                this._extractColorsFromValue(value, discoveredColors, {
                  rule,
                  property,
                  source: 'stylesheet',
                  selector: rule.selectorText,
                  context: this._analyzeSelectorContext(rule.selectorText)
                });
              }
            });
          }
        });
      } catch (e) {
        // Cross-origin stylesheets may not be accessible
        console.warn('Could not access stylesheet:', sheet.href, e.message);
      }
    });
  }

  /**
   * Extract colors from CSS value
   */
  _extractColorsFromValue(value, discoveredColors, metadata) {
    // Extract all color patterns
    Object.entries(this.colorPatterns).forEach(([type, pattern]) => {
      let match;
      pattern.lastIndex = 0; // Reset regex
      
      while ((match = pattern.exec(value)) !== null) {
        const colorData = this._parseColorMatch(match, type);
        if (colorData) {
          const colorId = colorData.hex.toLowerCase();
          
          if (!discoveredColors.has(colorId)) {
            discoveredColors.set(colorId, {
              ...colorData,
              id: colorId,
              contexts: [],
              elements: [],
              cssProperties: [],
              usageCount: 0
            });
          }
          
          const color = discoveredColors.get(colorId);
          color.usageCount++;
          color.contexts.push(metadata.context);
          color.cssProperties.push(metadata.property);
          
          if (metadata.element) {
            color.elements.push({
              tagName: metadata.element.tagName,
              className: metadata.element.className,
              id: metadata.element.id
            });
          }
        }
      }
    });
  }

  /**
   * Parse color match based on type
   */
  _parseColorMatch(match, type) {
    switch (type) {
      case 'hex':
        return this._parseHex(match);
      case 'rgb':
        return this._parseRgb(match);
      case 'hsl':
        return this._parseHsl(match);
      default:
        return null;
    }
  }

  /**
   * Parse HEX color
   */
  _parseHex(match) {
    let hex = match[1];
    
    // Expand 3-digit hex to 6-digit
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    
    // Remove alpha channel if present for now
    if (hex.length === 8) {
      hex = hex.substr(0, 6);
    }
    
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    return {
      hex: `#${hex.toLowerCase()}`,
      rgb: { r, g, b },
      hsl: this._rgbToHsl(r, g, b),
      alpha: 1
    };
  }

  /**
   * Parse RGB color
   */
  _parseRgb(match) {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    const a = match[4] ? parseFloat(match[4]) : 1;
    
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
    return {
      hex: hex.toLowerCase(),
      rgb: { r, g, b },
      hsl: this._rgbToHsl(r, g, b),
      alpha: a
    };
  }

  /**
   * Parse HSL color
   */
  _parseHsl(match) {
    const h = parseInt(match[1]);
    const s = parseInt(match[2]);
    const l = parseInt(match[3]);
    const a = match[4] ? parseFloat(match[4]) : 1;
    
    const rgb = this._hslToRgb(h, s, l);
    const hex = `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
    
    return {
      hex: hex.toLowerCase(),
      rgb,
      hsl: { h, s, l },
      alpha: a
    };
  }

  /**
   * HSL to RGB conversion
   */
  _hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / (1/12)) % 12;
      return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    };
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255)
    };
  }

  /**
   * RGB to HSL conversion
   */
  _rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
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
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  /**
   * Analyze element context for semantic hints
   */
  _analyzeElementContext(element) {
    const context = {
      tagName: element.tagName.toLowerCase(),
      className: element.className,
      id: element.id,
      role: element.getAttribute('role'),
      semanticHints: []
    };
    
    // Apply semantic hints based on element
    Object.entries(this.semanticHints).forEach(([selector, hints]) => {
      if (element.matches(selector)) {
        context.semanticHints.push(...hints);
      }
    });
    
    return context;
  }

  /**
   * Analyze selector context for semantic hints
   */
  _analyzeSelectorContext(selector) {
    const context = {
      selector,
      semanticHints: []
    };
    
    // Apply semantic hints based on selector
    Object.entries(this.semanticHints).forEach(([pattern, hints]) => {
      if (selector.includes(pattern.replace(/[.,]/g, ''))) {
        context.semanticHints.push(...hints);
      }
    });
    
    return context;
  }

  /**
   * Alternative scanning for Next.js stylesheets
   */
  _scanNextStylesheet(sheet, discoveredColors, config) {
    try {
      // For Next.js, we'll scan the computed styles of elements instead
      // since the stylesheets are often not directly accessible
      const elements = document.querySelectorAll('*');
      
      elements.forEach(element => {
        try {
          const computedStyle = getComputedStyle(element);
          this.cssProperties.forEach(property => {
            const value = computedStyle.getPropertyValue(property);
            if (value && value !== 'none' && value !== 'transparent' && value !== 'initial') {
              this._extractColorsFromValue(value, discoveredColors, {
                element,
                property,
                source: 'next-computed',
                context: this._analyzeElementContext(element)
              });
            }
          });
        } catch (e) {
          // Skip problematic elements
        }
      });
    } catch (e) {
      console.warn('Could not scan Next.js stylesheet:', e.message);
    }
  }

  /**
   * Detect color variants (lighter/darker versions)
   */
  _detectVariants(color) {
    // Implementation for detecting color relationships
    // This would analyze similar hues with different lightness/saturation
    return [];
  }
}

// Export singleton instance
export const domScanner = new DOMScanner();
export { DOMScanner };
export default DOMScanner;