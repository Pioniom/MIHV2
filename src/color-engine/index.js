/**
 * 🎨 Contextual Color Engine - Main Export
 * Zero-Config Semantic Color Intelligence System
 * 
 * Innovation: First system with automatic color discovery + semantic role detection
 * 
 * Usage:
 * import ColorEngine from '@/color-engine';
 * ColorEngine.start(); // Zero-config magic!
 */

import ColorEngine from './core/ColorEngine.js';
import { DOMScanner } from './discovery/DOMScanner.js';
import { CSSInjector } from './injection/CSSInjector.js';
import { ColorRegistry } from './core/ColorRegistry.js';
import { EventBus } from './core/EventBus.js';

// Static methods for zero-config usage
ColorEngine.start = (options = {}) => {
  const engine = new ColorEngine({
    autoDiscover: true,
    autoInject: true,
    ui: { enabled: true, position: 'floating' },
    ...options
  });
  
  return engine.initialize();
};

// Direct service exports for modular usage
export {
  ColorEngine as default,
  DOMScanner,
  CSSInjector,
  ColorRegistry,
  EventBus
};

// Quick start for immediate magic
export const quickStart = () => ColorEngine.start();