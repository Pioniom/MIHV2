/**
 * 💉 CSSInjector - Live CSS Custom Property Injection
 * Transforms existing CSS to use custom properties for live theming
 * 
 * Innovation: Runtime CSS transformation without build process
 * Pattern: Command + Proxy + Observer
 */

import { eventBus } from '../core/EventBus.js';

class CSSInjector {
  constructor() {
    this.injectedProperties = new Map(); // property -> { original, current }
    this.styleElement = null;
    this.mutationObserver = null;
    this.transformedRules = new Set();
    
    this._initializeStyleElement();
    this._initializeMutationObserver();
  }

  /**
   * Initialize custom style element for injected properties
   */
  _initializeStyleElement() {
    this.styleElement = document.createElement('style');
    this.styleElement.id = 'color-engine-custom-properties';
    this.styleElement.setAttribute('data-color-engine', 'true');
    document.head.appendChild(this.styleElement);
  }

  /**
   * Initialize mutation observer to catch dynamic style changes
   */
  _initializeMutationObserver() {
    this.mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          this._handleDynamicStyleChange(mutation.target);
        }
      });
    });
    
    this.mutationObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
      subtree: true
    });
  }

  /**
   * Inject CSS custom property
   * @param {string} name - Custom property name (with or without --)
   * @param {string} value - Color value
   * @param {Object} options - Injection options
   */
  injectCustomProperty(name, value, options = {}) {
    const propertyName = name.startsWith('--') ? name : `--${name}`;
    const config = {
      scope: 'root', // root, element, component
      fallback: true,
      transform: true, // Transform existing usages
      ...options
    };

    // Store original value if not already stored
    if (!this.injectedProperties.has(propertyName)) {
      const originalValue = this._extractOriginalValue(propertyName);
      this.injectedProperties.set(propertyName, {
        original: originalValue,
        current: value,
        config
      });
    } else {
      // Update current value
      this.injectedProperties.get(propertyName).current = value;
    }

    // Inject the custom property
    this._injectToDOM(propertyName, value, config);
    
    // Transform existing CSS to use custom property
    if (config.transform) {
      this._transformExistingCSS(propertyName, value, config);
    }

    eventBus.emit('css:propertyInjected', propertyName, value, config);
  }

  /**
   * Inject multiple custom properties at once
   */
  injectProperties(properties, options = {}) {
    Object.entries(properties).forEach(([name, value]) => {
      this.injectCustomProperty(name, value, options);
    });
  }

  /**
   * Transform color value to use custom property
   * @param {string} originalValue - Original color value (e.g., #ff4a17)
   * @param {string} propertyName - Custom property name
   * @param {Object} options - Transform options
   */
  transformColorUsage(originalValue, propertyName, options = {}) {
    const config = {
      preserveOriginal: true,
      scope: 'document',
      ...options
    };

    // Find all elements using this color
    const elements = this._findElementsWithColor(originalValue);
    
    elements.forEach(({ element, property, value }) => {
      const newValue = config.preserveOriginal 
        ? `var(${propertyName}, ${originalValue})`
        : `var(${propertyName})`;
        
      // Apply transformation
      if (element.style && element.style[property] === originalValue) {
        element.style[property] = newValue;
      }
    });

    // Transform stylesheet rules
    this._transformStylesheetRules(originalValue, propertyName, config);

    eventBus.emit('css:colorTransformed', originalValue, propertyName, config);
  }

  /**
   * Create semantic custom properties from color registry
   */
  createSemanticProperties(colorRegistry) {
    const semanticMap = {
      'accent': '--color-accent',
      'primary': '--color-primary', 
      'secondary': '--color-secondary',
      'surface': '--color-surface',
      'background': '--color-background',
      'text': '--color-text',
      'border': '--color-border',
      'error': '--color-error',
      'success': '--color-success',
      'warning': '--color-warning'
    };

    const semanticSummary = colorRegistry.getSemanticSummary();
    
    Object.entries(semanticSummary).forEach(([role, colors]) => {
      if (colors.length > 0 && semanticMap[role]) {
        const primaryColor = colors[0]; // Use most confident color
        this.injectCustomProperty(semanticMap[role], primaryColor.hex, {
          transform: true,
          fallback: true
        });
      }
    });

    eventBus.emit('css:semanticPropertiesCreated', semanticSummary);
  }

  /**
   * Extract original value of a custom property from existing CSS
   */
  _extractOriginalValue(propertyName) {
    try {
      // Check if the property already exists in CSS
      const rootStyle = getComputedStyle(document.documentElement);
      const existingValue = rootStyle.getPropertyValue(propertyName);
      
      if (existingValue && existingValue.trim()) {
        return existingValue.trim();
      }
      
      // Check in existing stylesheets
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules || []) {
            if (rule.style && rule.selectorText === ':root') {
              const value = rule.style.getPropertyValue(propertyName);
              if (value && value.trim()) {
                return value.trim();
              }
            }
          }
        } catch (e) {
          // Cross-origin stylesheets may not be accessible
          continue;
        }
      }
      
      return null;
    } catch (error) {
      console.warn('Could not extract original value for', propertyName, error);
      return null;
    }
  }

  /**
   * Transform existing CSS to use custom properties
   */
  _transformExistingCSS(propertyName, value, config) {
    try {
      // Transform inline styles
      this._transformInlineStyles(propertyName, value, config);
      
      // Transform stylesheet rules
      this._transformStylesheetRules(value, propertyName, config);
      
      eventBus.emit('css:transformationApplied', propertyName, value);
    } catch (error) {
      console.warn('Could not transform existing CSS for', propertyName, error);
    }
  }

  /**
   * Transform inline styles to use custom properties
   */
  _transformInlineStyles(propertyName, value, config) {
    const elements = document.querySelectorAll('[style]');
    
    elements.forEach(element => {
      const style = element.getAttribute('style');
      if (!style) return;
      
      // Look for color values that match our custom property value
      let transformedStyle = style;
      
      // Transform hex, rgb, hsl values that match
      if (this._colorsMatch(value, this._extractColorFromStyle(style))) {
        const customPropUsage = config.preserveOriginal 
          ? `var(${propertyName}, ${value})`
          : `var(${propertyName})`;
          
        // Escape special regex characters safely
        const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        transformedStyle = style.replace(
          new RegExp(escapedValue, 'gi'),
          customPropUsage
        );
        
        if (transformedStyle !== style) {
          element.setAttribute('style', transformedStyle);
        }
      }
    });
  }

  /**
   * Extract color value from style string
   */
  _extractColorFromStyle(style) {
    // Simple extraction - could be enhanced
    const colorPatterns = [
      /#([0-9a-f]{3}|[0-9a-f]{6})/gi,
      /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+)?\s*\)/gi,
      /hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+)?\s*\)/gi
    ];
    
    for (const pattern of colorPatterns) {
      const match = style.match(pattern);
      if (match) return match[0];
    }
    
    return null;
  }

  /**
   * Inject custom property to DOM
   */
  _injectToDOM(propertyName, value, config) {
    const selector = config.scope === 'root' ? ':root' : config.scope;
    
    // Create or update CSS rule
    const existingCSS = this.styleElement.textContent || '';
    const propertyRule = `${propertyName}: ${value};`;
    
    if (existingCSS.includes(propertyName)) {
      // Update existing property
      const regex = new RegExp(`${propertyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*[^;]+;`);
      this.styleElement.textContent = existingCSS.replace(regex, propertyRule);
    } else {
      // Add new property
      if (existingCSS.includes(selector)) {
        // Add to existing selector
        const regex = new RegExp(`(${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*{)([^}]*)(})`);
        this.styleElement.textContent = existingCSS.replace(regex, `$1$2  ${propertyRule}\n$3`);
      } else {
        // Create new selector
        this.styleElement.textContent += `\n${selector} {\n  ${propertyRule}\n}\n`;
      }
    }
  }

  /**
   * Find elements using specific color
   */
  _findElementsWithColor(colorValue) {
    const matches = [];
    const elements = document.querySelectorAll('*');
    
    elements.forEach(element => {
      const computed = getComputedStyle(element);
      
      ['color', 'background-color', 'border-color'].forEach(property => {
        const value = computed.getPropertyValue(property);
        if (this._colorsMatch(value, colorValue)) {
          matches.push({ element, property, value });
        }
      });
    });
    
    return matches;
  }

  /**
   * Transform stylesheet rules to use custom properties
   */
  _transformStylesheetRules(originalValue, propertyName, config) {
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules || []).forEach(rule => {
          if (rule.style) {
            ['color', 'background-color', 'border-color'].forEach(property => {
              const value = rule.style.getPropertyValue(property);
              if (this._colorsMatch(value, originalValue)) {
                const newValue = config.preserveOriginal 
                  ? `var(${propertyName}, ${originalValue})`
                  : `var(${propertyName})`;
                rule.style.setProperty(property, newValue);
                this.transformedRules.add(rule);
              }
            });
          }
        });
      } catch (e) {
        // Cross-origin stylesheets may not be accessible
        console.warn('Could not transform stylesheet:', sheet.href);
      }
    });
  }

  /**
   * Check if two color values match
   */
  _colorsMatch(value1, value2) {
    // Normalize and compare color values
    const normalize = (color) => {
      if (!color || color === 'transparent' || color === 'none') return '';
      return color.toLowerCase().replace(/\s+/g, '');
    };
    
    return normalize(value1) === normalize(value2);
  }

  /**
   * Handle dynamic style changes
   */
  _handleDynamicStyleChange(element) {
    // Re-apply transformations to dynamically changed elements
    const style = element.getAttribute('style');
    if (style) {
      this.injectedProperties.forEach((data, propertyName) => {
        if (style.includes(data.original)) {
          // Transform the new inline style
          const newStyle = style.replace(
            new RegExp(data.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            `var(${propertyName}, ${data.original})`
          );
          element.setAttribute('style', newStyle);
        }
      });
    }
  }

  /**
   * Reset all injected properties
   */
  reset() {
    if (this.styleElement) {
      this.styleElement.textContent = '';
    }
    
    this.injectedProperties.clear();
    this.transformedRules.clear();
    
    eventBus.emit('css:reset');
  }

  /**
   * Cleanup and destroy
   */
  destroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    
    if (this.styleElement) {
      this.styleElement.remove();
    }
    
    this.reset();
  }
}

// Export singleton instance
export const cssInjector = new CSSInjector();
export { CSSInjector };
export default CSSInjector;