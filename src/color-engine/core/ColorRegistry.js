/**
 * 🎨 ColorRegistry - Central Color State Management
 * Manages discovered colors, semantic roles, and relationships
 * 
 * Pattern: Registry + Observer + State Machine
 * Innovation: Contextual color relationships with semantic intelligence
 */

import { eventBus } from './EventBus.js';

class ColorRegistry {
  constructor() {
    this.colors = new Map(); // colorId -> ColorData
    this.semanticRoles = new Map(); // role -> Set of colorIds
    this.relationships = new Map(); // colorId -> Set of related colorIds
    this.context = new Map(); // colorId -> usage context
    this.customProperties = new Map(); // CSS custom property mappings
    
    this.initialized = false;
  }

  /**
   * Register a discovered color
   * @param {Object} colorData - Color information
   */
  register(colorData) {
    const id = this._generateColorId(colorData);
    
    const existingColor = this.colors.get(id);
    if (existingColor) {
      // Merge context and usage data
      existingColor.usageCount += 1;
      existingColor.contexts.push(...colorData.contexts || []);
      this.colors.set(id, existingColor);
      
      eventBus.emit('color:updated', existingColor);
      return existingColor;
    }

    // New color discovery
    const color = {
      id,
      hex: colorData.hex,
      rgb: colorData.rgb,
      hsl: colorData.hsl,
      alpha: colorData.alpha || 1,
      usageCount: 1,
      contexts: colorData.contexts || [],
      elements: colorData.elements || [],
      cssProperties: colorData.cssProperties || [],
      semanticRole: null,
      confidence: 0,
      relationships: new Set(),
      customProperty: null,
      createdAt: Date.now()
    };

    this.colors.set(id, color);
    eventBus.emit('color:discovered', color);
    
    return color;
  }

  /**
   * Assign semantic role to color
   */
  assignSemanticRole(colorId, role, confidence = 1.0) {
    const color = this.colors.get(colorId);
    if (!color) return false;

    // Remove from previous role
    if (color.semanticRole) {
      const prevRoleSet = this.semanticRoles.get(color.semanticRole);
      if (prevRoleSet) prevRoleSet.delete(colorId);
    }

    // Assign new role
    color.semanticRole = role;
    color.confidence = confidence;
    
    if (!this.semanticRoles.has(role)) {
      this.semanticRoles.set(role, new Set());
    }
    this.semanticRoles.get(role).add(colorId);

    eventBus.emit('semantic:roleAssigned', color, role, confidence);
    return true;
  }

  /**
   * Add relationship between colors
   */
  addRelationship(colorId1, colorId2, relationshipType = 'related') {
    const color1 = this.colors.get(colorId1);
    const color2 = this.colors.get(colorId2);
    
    if (!color1 || !color2) return false;

    color1.relationships.add({ colorId: colorId2, type: relationshipType });
    color2.relationships.add({ colorId: colorId1, type: relationshipType });

    eventBus.emit('relationship:added', color1, color2, relationshipType);
    return true;
  }

  /**
   * Get colors by semantic role
   */
  getColorsByRole(role) {
    const colorIds = this.semanticRoles.get(role) || new Set();
    return Array.from(colorIds).map(id => this.colors.get(id)).filter(Boolean);
  }

  /**
   * Get all colors as array
   */
  getAllColors() {
    return Array.from(this.colors.values());
  }

  /**
   * Get semantic roles summary
   */
  getSemanticSummary() {
    const summary = {};
    this.semanticRoles.forEach((colorIds, role) => {
      summary[role] = Array.from(colorIds).map(id => this.colors.get(id));
    });
    return summary;
  }

  /**
   * Get semantic summary of all colors grouped by role
   * @returns {Object} - { role: [{ colorId, hex, confidence, usageCount }] }
   */
  getSemanticSummary() {
    const summary = {};
    
    // Initialize all possible roles
    const knownRoles = ['accent', 'primary', 'secondary', 'surface', 'background', 'text', 'border', 'error', 'success', 'warning', 'link', 'heading', 'input', 'navigation'];
    knownRoles.forEach(role => {
      summary[role] = [];
    });
    
    // Group colors by semantic roles
    this.semanticRoles.forEach((colorIds, role) => {
      if (!summary[role]) summary[role] = [];
      
      colorIds.forEach(colorId => {
        const colorData = this.colors.get(colorId);
        if (colorData) {
          summary[role].push({
            colorId,
            hex: colorData.hex,
            rgb: colorData.rgb,
            hsl: colorData.hsl,
            confidence: colorData.confidence || 0.5,
            usageCount: colorData.usageCount || 0,
            contexts: colorData.contexts || []
          });
        }
      });
      
      // Sort by confidence and usage count
      summary[role].sort((a, b) => {
        const scoreA = (a.confidence * 0.7) + (a.usageCount * 0.3);
        const scoreB = (b.confidence * 0.7) + (b.usageCount * 0.3);
        return scoreB - scoreA;
      });
    });
    
    return summary;
  }

  /**
   * Generate unique color ID
   */
  _generateColorId(colorData) {
    const hex = colorData.hex.replace('#', '').toLowerCase();
    const alpha = colorData.alpha || 1;
    return `color_${hex}_${Math.round(alpha * 100)}`;
  }

  /**
   * Clear all data
   */
  clear() {
    this.colors.clear();
    this.semanticRoles.clear();
    this.relationships.clear();
    this.context.clear();
    this.customProperties.clear();
    
    eventBus.emit('registry:cleared');
  }
}

// Global singleton instance
export const colorRegistry = new ColorRegistry();
export { ColorRegistry };
export default ColorRegistry;