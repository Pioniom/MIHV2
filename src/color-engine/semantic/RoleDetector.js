/**
 * 🧠 RoleDetector - Semantic Role Intelligence Engine
 * AI-like semantic analysis to automatically detect color roles
 * 
 * Innovation: Context-aware role detection without manual configuration
 * Pattern: Strategy + Expert System + Heuristic Analysis
 */

import { eventBus } from '../core/EventBus.js';

class RoleDetector {
  constructor() {
    this.roleDefinitions = {
      accent: {
        weight: 10,
        indicators: ['button', 'cta', 'primary-action', 'highlight'],
        colorProfile: { saturationMin: 60, lightnessRange: [30, 70] },
        usagePatterns: ['interactive', 'emphasis', 'brand']
      },
      primary: {
        weight: 8,
        indicators: ['heading', 'navigation', 'main-text', 'brand'],
        colorProfile: { saturationRange: [40, 80], lightnessRange: [20, 80] },
        usagePatterns: ['text', 'interface', 'navigation']
      },
      secondary: {
        weight: 6,
        indicators: ['subtitle', 'secondary-text', 'meta'],
        colorProfile: { saturationRange: [20, 60], lightnessRange: [40, 70] },
        usagePatterns: ['support', 'secondary']
      },
      background: {
        weight: 7,
        indicators: ['body', 'section', 'container', 'surface'],
        colorProfile: { lightnessRange: [85, 100], saturationMax: 20 },
        usagePatterns: ['background', 'surface', 'container']
      },
      surface: {
        weight: 6,
        indicators: ['card', 'panel', 'modal', 'dropdown'],
        colorProfile: { lightnessRange: [80, 95], saturationMax: 15 },
        usagePatterns: ['surface', 'elevated', 'container']
      },
      text: {
        weight: 8,
        indicators: ['p', 'span', 'text', 'content'],
        colorProfile: { lightnessRange: [10, 25], saturationMax: 30 },
        usagePatterns: ['text', 'content', 'readable']
      },
      border: {
        weight: 4,
        indicators: ['border', 'outline', 'divider', 'separator'],
        colorProfile: { lightnessRange: [70, 90], saturationMax: 20 },
        usagePatterns: ['border', 'separator', 'outline']
      },
      error: {
        weight: 5,
        indicators: ['error', 'danger', 'alert', 'warning'],
        colorProfile: { hueRange: [350, 20], saturationMin: 50 },
        usagePatterns: ['status', 'feedback', 'alert']
      },
      success: {
        weight: 5,
        indicators: ['success', 'valid', 'confirmed', 'positive'],
        colorProfile: { hueRange: [90, 150], saturationMin: 40 },
        usagePatterns: ['status', 'feedback', 'positive']
      },
      warning: {
        weight: 5,
        indicators: ['warning', 'caution', 'pending', 'notice'],
        colorProfile: { hueRange: [40, 70], saturationMin: 60 },
        usagePatterns: ['status', 'feedback', 'caution']
      }
    };

    this.contextWeights = {
      element: {
        'button': { accent: 3, primary: 2 },
        'a': { accent: 2, primary: 1 },
        'h1,h2,h3,h4,h5,h6': { primary: 3, text: 2 },
        'p': { text: 3, secondary: 1 },
        'body': { background: 3, surface: 1 },
        'input': { border: 2, surface: 1 },
        'nav': { primary: 2, background: 1 }
      },
      className: {
        'btn': { accent: 3, primary: 2 },
        'button': { accent: 3, primary: 2 },
        'primary': { primary: 3, accent: 1 },
        'secondary': { secondary: 3 },
        'bg-': { background: 2, surface: 1 },
        'text-': { text: 2, primary: 1 },
        'border-': { border: 3 },
        'error': { error: 3 },
        'success': { success: 3 },
        'warning': { warning: 3 },
        'alert': { error: 2, warning: 1 }
      },
      property: {
        'color': { text: 2, primary: 1 },
        'background-color': { background: 2, surface: 1, accent: 1 },
        'border-color': { border: 3, outline: 1 },
        'box-shadow': { accent: 1, border: 1 },
        'text-decoration-color': { accent: 1, primary: 1 }
      }
    };
  }

  /**
   * Analyze color and detect most likely semantic role
   * @param {Object} color - Color data with contexts
   * @param {Object} options - Analysis options
   */
  analyzeColor(color, options = {}) {
    const config = {
      confidenceThreshold: 0.6,
      maxRoles: 3,
      considerFrequency: true,
      ...options
    };

    const roleScores = this._calculateRoleScores(color, config);
    const candidates = this._rankRoleCandidates(roleScores, config);
    
    const result = {
      color: color.hex,
      primaryRole: candidates[0],
      alternativeRoles: candidates.slice(1, config.maxRoles),
      confidence: candidates[0]?.confidence || 0,
      analysis: {
        contextualEvidence: this._getContextualEvidence(color),
        colorProfileMatch: this._getColorProfileMatches(color),
        usagePatternAnalysis: this._getUsagePatterns(color)
      }
    };

    eventBus.emit('semantic:colorAnalyzed', color, result);
    return result;
  }

  /**
   * Batch analyze multiple colors for role detection
   */
  analyzeColors(colors, options = {}) {
    const results = colors.map(color => this.analyzeColor(color, options));
    
    // Cross-reference analysis - avoid role conflicts
    const resolvedResults = this._resolveRoleConflicts(results, options);
    
    eventBus.emit('semantic:batchAnalysisCompleted', resolvedResults);
    return resolvedResults;
  }

  /**
   * Calculate role scores for a color based on all evidence
   */
  _calculateRoleScores(color, config) {
    const scores = {};
    
    // Initialize all roles with base score
    Object.keys(this.roleDefinitions).forEach(role => {
      scores[role] = 0;
    });

    // Analyze contexts for semantic hints
    color.contexts.forEach(context => {
      const contextScores = this._analyzeContext(context);
      Object.entries(contextScores).forEach(([role, score]) => {
        scores[role] += score;
      });
    });

    // Analyze color properties (HSL values)
    const colorScores = this._analyzeColorProperties(color);
    Object.entries(colorScores).forEach(([role, score]) => {
      scores[role] += score;
    });

    // Factor in usage frequency
    if (config.considerFrequency && color.usageCount) {
      const frequencyMultiplier = Math.log(color.usageCount + 1) / 3;
      Object.keys(scores).forEach(role => {
        scores[role] *= (1 + frequencyMultiplier);
      });
    }

    return scores;
  }

  /**
   * Analyze individual context for role hints
   */
  _analyzeContext(context) {
    const scores = {};
    
    // Element-based scoring
    if (context.tagName) {
      const elementWeights = this.contextWeights.element[context.tagName] || {};
      Object.entries(elementWeights).forEach(([role, weight]) => {
        scores[role] = (scores[role] || 0) + weight;
      });
    }

    // Class-based scoring
    if (context.semanticHints) {
      context.semanticHints.forEach(hint => {
        const classWeights = this.contextWeights.className[hint] || {};
        Object.entries(classWeights).forEach(([role, weight]) => {
          scores[role] = (scores[role] || 0) + weight;
        });
      });
    }

    return scores;
  }

  /**
   * Analyze color properties against role definitions
   */
  _analyzeColorProperties(color) {
    const scores = {};
    const { h, s, l } = color.hsl;
    
    Object.entries(this.roleDefinitions).forEach(([role, definition]) => {
      let score = 0;
      const profile = definition.colorProfile;
      
      // Check hue range
      if (profile.hueRange) {
        const [min, max] = profile.hueRange;
        if (min > max) { // Wrap around (like red: 350-20)
          if (h >= min || h <= max) score += 2;
        } else {
          if (h >= min && h <= max) score += 2;
        }
      }
      
      // Check saturation
      if (profile.saturationMin && s >= profile.saturationMin) score += 1;
      if (profile.saturationMax && s <= profile.saturationMax) score += 1;
      if (profile.saturationRange) {
        const [min, max] = profile.saturationRange;
        if (s >= min && s <= max) score += 2;
      }
      
      // Check lightness
      if (profile.lightnessRange) {
        const [min, max] = profile.lightnessRange;
        if (l >= min && l <= max) score += 2;
      }
      
      scores[role] = score * definition.weight;
    });
    
    return scores;
  }

  /**
   * Rank role candidates by score and calculate confidence
   */
  _rankRoleCandidates(roleScores, config) {
    const candidates = Object.entries(roleScores)
      .map(([role, score]) => ({ role, score }))
      .sort((a, b) => b.score - a.score)
      .filter(candidate => candidate.score > 0);

    if (candidates.length === 0) {
      return [{ role: 'unknown', confidence: 0, score: 0 }];
    }

    const maxScore = candidates[0].score;
    const totalScore = candidates.reduce((sum, c) => sum + c.score, 0);

    return candidates.map(candidate => ({
      role: candidate.role,
      score: candidate.score,
      confidence: Math.min(candidate.score / maxScore, 1.0),
      weight: candidate.score / totalScore
    }));
  }

  /**
   * Resolve conflicts when multiple colors claim same role
   */
  _resolveRoleConflicts(results, options) {
    const roleAssignments = {};
    
    // Group by primary role
    results.forEach((result, index) => {
      const role = result.primaryRole.role;
      if (!roleAssignments[role]) {
        roleAssignments[role] = [];
      }
      roleAssignments[role].push({ result, index });
    });

    // Resolve conflicts - keep highest confidence
    Object.entries(roleAssignments).forEach(([role, assignments]) => {
      if (assignments.length > 1) {
        assignments.sort((a, b) => b.result.confidence - a.result.confidence);
        
        // Reassign lower confidence colors to alternative roles
        assignments.slice(1).forEach(assignment => {
          const { result, index } = assignment;
          if (result.alternativeRoles.length > 0) {
            const newRole = result.alternativeRoles[0];
            results[index].primaryRole = newRole;
            results[index].confidence = newRole.confidence;
            results[index].conflictResolved = true;
          }
        });
      }
    });

    return results;
  }

  /**
   * Get contextual evidence summary
   */
  _getContextualEvidence(color) {
    const evidence = {
      elements: [...new Set(color.contexts.map(c => c.tagName))],
      semanticHints: [...new Set(color.contexts.flatMap(c => c.semanticHints || []))],
      usageCount: color.usageCount,
      cssProperties: [...new Set(color.cssProperties || [])]
    };

    return evidence;
  }

  /**
   * Get color profile matches
   */
  _getColorProfileMatches(color) {
    const matches = {};
    const { h, s, l } = color.hsl;
    
    Object.entries(this.roleDefinitions).forEach(([role, definition]) => {
      matches[role] = this._calculateProfileMatch(color.hsl, definition.colorProfile);
    });

    return matches;
  }

  /**
   * Calculate how well color matches a profile
   */
  _calculateProfileMatch(hsl, profile) {
    let score = 0;
    let maxScore = 0;
    
    // Check each profile criterion
    Object.entries(profile).forEach(([criterion, value]) => {
      maxScore += 1;
      
      switch (criterion) {
        case 'hueRange':
          const [hMin, hMax] = value;
          if (hMin > hMax ? (hsl.h >= hMin || hsl.h <= hMax) : (hsl.h >= hMin && hsl.h <= hMax)) {
            score += 1;
          }
          break;
        case 'saturationMin':
          if (hsl.s >= value) score += 1;
          break;
        case 'saturationMax':
          if (hsl.s <= value) score += 1;
          break;
        case 'saturationRange':
          const [sMin, sMax] = value;
          if (hsl.s >= sMin && hsl.s <= sMax) score += 1;
          break;
        case 'lightnessRange':
          const [lMin, lMax] = value;
          if (hsl.l >= lMin && hsl.l <= lMax) score += 1;
          break;
      }
    });
    
    return maxScore > 0 ? score / maxScore : 0;
  }

  /**
   * Get usage pattern analysis
   */
  _getUsagePatterns(color) {
    const patterns = {
      interactive: 0,
      decorative: 0,
      textual: 0,
      structural: 0
    };

    color.contexts.forEach(context => {
      if (['button', 'a', 'input'].includes(context.tagName)) {
        patterns.interactive += 1;
      }
      if (['p', 'span', 'text'].includes(context.tagName)) {
        patterns.textual += 1;
      }
      if (['div', 'section', 'article'].includes(context.tagName)) {
        patterns.structural += 1;
      }
    });

    return patterns;
  }
}

// Export singleton instance
export const roleDetector = new RoleDetector();
export default RoleDetector;