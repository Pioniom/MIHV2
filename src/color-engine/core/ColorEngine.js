/**
 * 🎨 ColorEngine - Main Orchestrator
 * Central coordination system for contextual color intelligence
 * 
 * Innovation: Zero-config semantic color discovery + live theming
 * Pattern: Orchestrator + Strategy + Observer + Command
 */

import { eventBus } from './EventBus.js';
import { colorRegistry } from './ColorRegistry.js';
import { domScanner } from '../discovery/DOMScanner.js';
import { cssInjector } from '../injection/CSSInjector.js';

class ColorEngine {
  constructor(options = {}) {
    this.config = {
      autoDiscover: true,
      autoInject: true,
      semantic: {
        enabled: true,
        confidence: 0.7
      },
      accessibility: {
        enforceWCAG: false,
        level: 'AA'
      },
      ui: {
        enabled: true,
        position: 'floating',
        theme: 'minimal'
      },
      persistence: {
        enabled: true,
        key: 'color-engine-theme'
      },
      ...options
    };

    this.state = {
      initialized: false,
      scanning: false,
      ready: false
    };

    this.ui = null;
    this._bindEvents();
  }

  /**
   * Initialize the color engine
   */
  async initialize() {
    if (this.state.initialized) return this;

    eventBus.emit('engine:initializing', this.config);

    try {
      // Phase 1: Auto-discover colors
      if (this.config.autoDiscover) {
        await this._discoverColors();
      }

      // Phase 2: Semantic analysis
      if (this.config.semantic.enabled) {
        await this._analyzeSemantics();
      }

      // Phase 3: Auto-inject custom properties
      if (this.config.autoInject) {
        await this._injectCustomProperties();
      }

      // Phase 4: Initialize UI
      if (this.config.ui.enabled) {
        await this._initializeUI();
      }

      // Phase 5: Load persisted theme
      if (this.config.persistence.enabled) {
        await this._loadPersistedTheme();
      }

      this.state.initialized = true;
      this.state.ready = true;

      eventBus.emit('engine:ready', this);
      return this;

    } catch (error) {
      eventBus.emit('engine:error', error);
      throw error;
    }
  }

  /**
   * Discover all colors in the application
   */
  async _discoverColors() {
    this.state.scanning = true;
    eventBus.emit('discovery:started');

    const colors = domScanner.scan({
      includeComputed: true,
      includeInline: true,
      includeStylesheets: true,
      semanticAnalysis: this.config.semantic.enabled
    });

    // Register discovered colors
    colors.forEach(colorData => {
      colorRegistry.register(colorData);
    });

    this.state.scanning = false;
    eventBus.emit('discovery:completed', colors);
  }

  /**
   * Analyze semantic roles for discovered colors
   */
  async _analyzeSemantics() {
    if (!this.config.semantic.enabled) return;

    eventBus.emit('semantic:analyzing');

    const colors = colorRegistry.getAllColors();
    
    // Simple semantic analysis based on usage patterns
    colors.forEach(color => {
      const role = this._detectSemanticRole(color);
      if (role.confidence >= this.config.semantic.confidence) {
        colorRegistry.assignSemanticRole(color.id, role.name, role.confidence);
      }
    });

    eventBus.emit('semantic:completed');
  }

  /**
   * Detect semantic role for a color
   */
  _detectSemanticRole(color) {
    const roleScores = {
      accent: 0,
      primary: 0,
      secondary: 0,
      background: 0,
      surface: 0,
      text: 0,
      border: 0,
      error: 0,
      success: 0,
      warning: 0
    };

    // Analyze contexts for semantic hints
    color.contexts.forEach(context => {
      if (context.semanticHints) {
        context.semanticHints.forEach(hint => {
          if (roleScores.hasOwnProperty(hint)) {
            roleScores[hint] += 1;
          }
        });
      }

      // Analyze usage patterns
      if (context.tagName === 'button' || context.role === 'button') {
        roleScores.accent += 2;
        roleScores.primary += 1;
      }

      if (context.role === 'link') {
        roleScores.accent += 1;
        roleScores.primary += 1;
      }

      if (context.role === 'navigation') {
        roleScores.primary += 1;
      }
    });

    // Analyze color properties for additional hints
    const { h, s, l } = color.hsl;
    
    // High saturation colors are likely accents
    if (s > 70 && l > 30 && l < 70) {
      roleScores.accent += 2;
    }

    // Low lightness colors are likely text
    if (l < 20) {
      roleScores.text += 2;
    }

    // High lightness colors are likely backgrounds
    if (l > 90) {
      roleScores.background += 2;
      roleScores.surface += 1;
    }

    // Find highest scoring role
    const topRole = Object.entries(roleScores).reduce((a, b) => 
      roleScores[a[0]] > roleScores[b[0]] ? a : b
    );

    return {
      name: topRole[0],
      confidence: Math.min(topRole[1] / (color.usageCount + 1), 1.0)
    };
  }

  /**
   * Inject CSS custom properties for theming
   */
  async _injectCustomProperties() {
    eventBus.emit('injection:started');

    // Create semantic custom properties
    cssInjector.createSemanticProperties(colorRegistry);

    // Create individual color properties
    const colors = colorRegistry.getAllColors();
    colors.forEach(color => {
      const propertyName = `--discovered-${color.id}`;
      cssInjector.injectCustomProperty(propertyName, color.hex, {
        transform: false, // Don't auto-transform for discovered colors
        fallback: true
      });
    });

    eventBus.emit('injection:completed');
  }

  /**
   * Initialize UI components
   */
  async _initializeUI() {
    console.log('🎯 Initializing Color Engine UI...');
    
    try {
      // Dynamic import to avoid bundle bloat if UI is disabled
      const { default: FloatingTrigger } = await import('../ui/FloatingTrigger.jsx');
      
      // Create React element and mount to DOM
      const React = await import('react');
      const ReactDOM = await import('react-dom/client');
      
      // Create container
      const container = document.createElement('div');
      container.id = 'color-engine-ui';
      container.style.position = 'fixed';
      container.style.zIndex = '99999'; // Higher z-index
      container.style.pointerEvents = 'none';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      
      // Add to body
      document.body.appendChild(container);
      console.log('📦 UI Container created and added to body');

      // Create React root and render
      const root = ReactDOM.createRoot(container);
      const element = React.createElement(FloatingTrigger, {
        position: this.config.ui.position,
        theme: this.config.ui.theme,
        colorEngine: this
      });
      
      root.render(element);
      console.log('⚛️ React component rendered');
      
      this.ui = {
        container,
        root,
        destroy: () => {
          root.unmount();
          container.remove();
        }
      };

      eventBus.emit('ui:initialized', this.ui);
      console.log('✅ Color Engine UI initialized successfully!');
      
    } catch (error) {
      console.error('❌ UI initialization failed:', error);
      throw error;
    }
  }

  /**
   * Load persisted theme from storage
   */
  async _loadPersistedTheme() {
    try {
      const stored = localStorage.getItem(this.config.persistence.key);
      if (stored) {
        const theme = JSON.parse(stored);
        this.applyTheme(theme);
        eventBus.emit('theme:loaded', theme);
      }
    } catch (error) {
      console.warn('Failed to load persisted theme:', error);
    }
  }

  /**
   * Apply theme configuration
   */
  applyTheme(theme) {
    Object.entries(theme).forEach(([property, value]) => {
      cssInjector.injectCustomProperty(property, value, {
        transform: true,
        fallback: true
      });
    });

    eventBus.emit('theme:applied', theme);
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    const theme = {};
    cssInjector.injectedProperties.forEach((data, property) => {
      theme[property] = data.current;
    });
    return theme;
  }

  /**
   * Save current theme
   */
  saveTheme() {
    if (!this.config.persistence.enabled) return;

    const theme = this.getCurrentTheme();
    localStorage.setItem(this.config.persistence.key, JSON.stringify(theme));
    eventBus.emit('theme:saved', theme);
  }

  /**
   * Reset to original colors
   */
  reset() {
    cssInjector.reset();
    colorRegistry.clear();
    eventBus.emit('engine:reset');
  }

  /**
   * Bind internal event handlers
   */
  _bindEvents() {
    // Auto-save theme on color changes
    eventBus.on('css:propertyInjected', () => {
      if (this.config.persistence.enabled && this.state.ready) {
        setTimeout(() => this.saveTheme(), 100); // Debounce saves
      }
    });

    // Re-scan on DOM changes (debounced)
    let rescanTimeout;
    eventBus.on('dom:mutated', () => {
      if (!this.config.autoDiscover) return;
      
      clearTimeout(rescanTimeout);
      rescanTimeout = setTimeout(() => {
        this._discoverColors();
      }, 1000);
    });
  }

  /**
   * Destroy engine and cleanup
   */
  destroy() {
    cssInjector.destroy();
    
    if (this.ui && this.ui.destroy) {
      this.ui.destroy();
    }

    eventBus.emit('engine:destroyed');
    eventBus.clear();
  }

  /**
   * Static convenience method to create and start engine
   */
  static async start(options = {}) {
    const engine = new ColorEngine(options);
    await engine.initialize();
    return engine;
  }
}

export default ColorEngine;