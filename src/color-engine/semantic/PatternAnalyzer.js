/**
 * 📊 PatternAnalyzer - Usage Pattern Intelligence
 * Analyzes how colors are used across the application to detect patterns
 * 
 * Innovation: Machine learning-like pattern recognition for color usage
 * Pattern: Observer + Analyzer + Statistical Analysis
 */

import { eventBus } from '../core/EventBus.js';

class PatternAnalyzer {
  constructor() {
    this.patterns = {
      frequency: {},      // How often colors appear
      cooccurrence: {},   // Which colors appear together
      hierarchy: {},      // Visual hierarchy patterns
      interaction: {},    // Interactive element patterns
      spatial: {},        // Spatial relationship patterns
      temporal: {}        // Time-based usage patterns
    };
    
    this.thresholds = {
      significantUsage: 3,        // Minimum usage to be significant
      cooccurrenceConfidence: 0.7, // Minimum confidence for cooccurrence
      hierarchyStrength: 0.6,     // Minimum strength for hierarchy
      patternStability: 0.8       // Minimum stability for pattern recognition
    };
  }

  /**
   * Analyze usage patterns across all colors
   * @param {Array} colors - Array of color data
   * @param {Object} options - Analysis options
   */
  analyzeUsagePatterns(colors, options = {}) {
    const config = {
      includeFrequency: true,
      includeCooccurrence: true,
      includeHierarchy: true,
      includeInteraction: true,
      includeSpatial: true,
      ...options
    };

    eventBus.emit('pattern:analysisStarted', colors.length);

    const analysis = {
      frequency: config.includeFrequency ? this._analyzeFrequencyPatterns(colors) : null,
      cooccurrence: config.includeCooccurrence ? this._analyzeCooccurrencePatterns(colors) : null,
      hierarchy: config.includeHierarchy ? this._analyzeHierarchyPatterns(colors) : null,
      interaction: config.includeInteraction ? this._analyzeInteractionPatterns(colors) : null,
      spatial: config.includeSpatial ? this._analyzeSpatialPatterns(colors) : null,
      insights: this._generateInsights(colors),
      timestamp: Date.now()
    };

    eventBus.emit('pattern:analysisCompleted', analysis);
    return analysis;
  }

  /**
   * Analyze frequency patterns
   */
  _analyzeFrequencyPatterns(colors) {
    const frequency = {
      byUsage: {},
      byContext: {},
      byElement: {},
      byProperty: {},
      distribution: null
    };

    // Usage frequency analysis
    colors.forEach(color => {
      frequency.byUsage[color.hex] = {
        count: color.usageCount,
        percentage: 0, // Will calculate after collecting all
        significance: color.usageCount >= this.thresholds.significantUsage ? 'high' : 'low'
      };
    });

    // Calculate percentages
    const totalUsage = Object.values(frequency.byUsage).reduce((sum, f) => sum + f.count, 0);
    Object.values(frequency.byUsage).forEach(f => {
      f.percentage = totalUsage > 0 ? (f.count / totalUsage) * 100 : 0;
    });

    // Context frequency analysis
    colors.forEach(color => {
      color.contexts.forEach(context => {
        const contextKey = context.tagName || 'unknown';
        if (!frequency.byContext[contextKey]) {
          frequency.byContext[contextKey] = {};
        }
        frequency.byContext[contextKey][color.hex] = 
          (frequency.byContext[contextKey][color.hex] || 0) + 1;
      });
    });

    // CSS property frequency analysis
    colors.forEach(color => {
      (color.cssProperties || []).forEach(property => {
        if (!frequency.byProperty[property]) {
          frequency.byProperty[property] = {};
        }
        frequency.byProperty[property][color.hex] = 
          (frequency.byProperty[property][color.hex] || 0) + 1;
      });
    });

    // Distribution analysis
    frequency.distribution = this._calculateDistribution(frequency.byUsage);

    return frequency;
  }

  /**
   * Analyze cooccurrence patterns (colors that appear together)
   */
  _analyzeCooccurrencePatterns(colors) {
    const cooccurrence = {
      pairs: {},
      strongRelationships: [],
      colorGroups: [],
      confidence: {}
    };

    // Build cooccurrence matrix
    colors.forEach(color1 => {
      colors.forEach(color2 => {
        if (color1.hex !== color2.hex) {
          const pairKey = [color1.hex, color2.hex].sort().join('|');
          
          if (!cooccurrence.pairs[pairKey]) {
            cooccurrence.pairs[pairKey] = {
              colors: [color1.hex, color2.hex],
              cooccurrences: 0,
              contexts: new Set(),
              confidence: 0
            };
          }

          // Check for cooccurrence in same contexts
          const sharedContexts = this._findSharedContexts(color1, color2);
          if (sharedContexts.length > 0) {
            cooccurrence.pairs[pairKey].cooccurrences += sharedContexts.length;
            sharedContexts.forEach(ctx => cooccurrence.pairs[pairKey].contexts.add(ctx));
          }
        }
      });
    });

    // Calculate confidence scores
    Object.entries(cooccurrence.pairs).forEach(([pairKey, data]) => {
      const [color1, color2] = data.colors;
      const color1Data = colors.find(c => c.hex === color1);
      const color2Data = colors.find(c => c.hex === color2);
      
      if (color1Data && color2Data) {
        const maxUsage = Math.max(color1Data.usageCount, color2Data.usageCount);
        data.confidence = maxUsage > 0 ? data.cooccurrences / maxUsage : 0;
      }
    });

    // Find strong relationships
    cooccurrence.strongRelationships = Object.entries(cooccurrence.pairs)
      .filter(([_, data]) => data.confidence >= this.thresholds.cooccurrenceConfidence)
      .map(([pairKey, data]) => ({ pairKey, ...data }))
      .sort((a, b) => b.confidence - a.confidence);

    // Detect color groups
    cooccurrence.colorGroups = this._detectColorGroups(cooccurrence.strongRelationships);

    return cooccurrence;
  }

  /**
   * Analyze visual hierarchy patterns
   */
  _analyzeHierarchyPatterns(colors) {
    const hierarchy = {
      levels: {},
      dominance: {},
      contrast: {},
      relationships: []
    };

    // Analyze element hierarchy
    const hierarchyLevels = {
      'h1': 1, 'h2': 2, 'h3': 3, 'h4': 4, 'h5': 5, 'h6': 6,
      'title': 1, 'subtitle': 2, 'body': 3, 'caption': 4
    };

    colors.forEach(color => {
      color.contexts.forEach(context => {
        const level = hierarchyLevels[context.tagName] || 
                    hierarchyLevels[context.role] || 
                    this._inferHierarchyLevel(context);
        
        if (!hierarchy.levels[level]) {
          hierarchy.levels[level] = [];
        }
        
        hierarchy.levels[level].push({
          color: color.hex,
          context: context.tagName || context.role,
          usage: color.usageCount
        });
      });
    });

    // Calculate dominance scores
    colors.forEach(color => {
      hierarchy.dominance[color.hex] = this._calculateDominanceScore(color);
    });

    // Analyze contrast relationships
    hierarchy.contrast = this._analyzeContrastPatterns(colors);

    return hierarchy;
  }

  /**
   * Analyze interaction patterns
   */
  _analyzeInteractionPatterns(colors) {
    const interaction = {
      interactive: {},
      states: {},
      feedback: {},
      navigation: {}
    };

    const interactiveElements = ['button', 'a', 'input', 'select', 'textarea'];
    const stateClasses = ['hover', 'active', 'focus', 'disabled', 'selected'];
    const feedbackClasses = ['error', 'success', 'warning', 'info'];

    colors.forEach(color => {
      // Interactive element analysis
      const interactiveContexts = color.contexts.filter(ctx => 
        interactiveElements.includes(ctx.tagName) ||
        (ctx.semanticHints && ctx.semanticHints.some(hint => 
          interactiveElements.includes(hint) || hint.includes('interactive')
        ))
      );

      if (interactiveContexts.length > 0) {
        interaction.interactive[color.hex] = {
          elements: interactiveContexts.map(ctx => ctx.tagName),
          frequency: interactiveContexts.length,
          dominance: interactiveContexts.length / color.usageCount
        };
      }

      // State analysis
      const stateContexts = color.contexts.filter(ctx =>
        ctx.semanticHints && ctx.semanticHints.some(hint =>
          stateClasses.some(state => hint.includes(state))
        )
      );

      if (stateContexts.length > 0) {
        interaction.states[color.hex] = stateContexts.map(ctx => ({
          states: ctx.semanticHints.filter(hint => 
            stateClasses.some(state => hint.includes(state))
          ),
          element: ctx.tagName
        }));
      }

      // Feedback analysis
      const feedbackContexts = color.contexts.filter(ctx =>
        ctx.semanticHints && ctx.semanticHints.some(hint =>
          feedbackClasses.includes(hint)
        )
      );

      if (feedbackContexts.length > 0) {
        interaction.feedback[color.hex] = feedbackContexts.map(ctx => ({
          type: ctx.semanticHints.find(hint => feedbackClasses.includes(hint)),
          element: ctx.tagName
        }));
      }
    });

    return interaction;
  }

  /**
   * Analyze spatial relationship patterns
   */
  _analyzeSpatialPatterns(colors) {
    const spatial = {
      proximity: {},
      containment: {},
      flow: {},
      layout: {}
    };

    // This would require DOM position analysis
    // For now, we'll analyze based on element relationships
    colors.forEach(color => {
      color.contexts.forEach(context => {
        // Analyze containment patterns (parent-child relationships)
        const containerElements = ['div', 'section', 'article', 'main', 'aside'];
        const contentElements = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        
        if (containerElements.includes(context.tagName)) {
          if (!spatial.containment[color.hex]) {
            spatial.containment[color.hex] = { role: 'container', frequency: 0 };
          }
          spatial.containment[color.hex].frequency++;
        }
        
        if (contentElements.includes(context.tagName)) {
          if (!spatial.containment[color.hex]) {
            spatial.containment[color.hex] = { role: 'content', frequency: 0 };
          }
          spatial.containment[color.hex].frequency++;
        }
      });
    });

    return spatial;
  }

  /**
   * Generate insights from pattern analysis
   */
  _generateInsights(colors) {
    const insights = {
      colorDistribution: this._analyzeColorDistribution(colors),
      designPatterns: this._detectDesignPatterns(colors),
      recommendations: this._generateRecommendations(colors),
      potential Issues: this._detectPotentialIssues(colors)
    };

    return insights;
  }

  /**
   * Find shared contexts between two colors
   */
  _findSharedContexts(color1, color2) {
    const contexts1 = new Set(color1.contexts.map(c => `${c.tagName}|${c.role}`));
    const contexts2 = new Set(color2.contexts.map(c => `${c.tagName}|${c.role}`));
    
    return [...contexts1].filter(ctx => contexts2.has(ctx));
  }

  /**
   * Detect color groups based on relationships
   */
  _detectColorGroups(strongRelationships) {
    const groups = [];
    const processed = new Set();

    strongRelationships.forEach(relationship => {
      const [color1, color2] = relationship.colors;
      
      if (!processed.has(color1) && !processed.has(color2)) {
        const group = new Set([color1, color2]);
        
        // Find other colors related to this group
        strongRelationships.forEach(otherRel => {
          const [otherColor1, otherColor2] = otherRel.colors;
          
          if (group.has(otherColor1) && !group.has(otherColor2)) {
            group.add(otherColor2);
          } else if (group.has(otherColor2) && !group.has(otherColor1)) {
            group.add(otherColor1);
          }
        });
        
        groups.push({
          colors: [...group],
          strength: relationship.confidence,
          contexts: [...relationship.contexts]
        });
        
        group.forEach(color => processed.add(color));
      }
    });

    return groups;
  }

  /**
   * Calculate distribution metrics
   */
  _calculateDistribution(usageData) {
    const values = Object.values(usageData).map(d => d.count);
    
    return {
      mean: values.reduce((sum, v) => sum + v, 0) / values.length,
      median: this._calculateMedian(values),
      variance: this._calculateVariance(values),
      skewness: this._calculateSkewness(values)
    };
  }

  /**
   * Calculate dominance score for a color
   */
  _calculateDominanceScore(color) {
    let score = 0;
    
    // Usage frequency weight
    score += Math.log(color.usageCount + 1) * 2;
    
    // Context importance weight
    color.contexts.forEach(context => {
      const importanceWeights = {
        'h1': 5, 'h2': 4, 'h3': 3, 'button': 4, 'a': 3,
        'body': 2, 'p': 1, 'span': 1
      };
      score += importanceWeights[context.tagName] || 1;
    });
    
    // Interaction weight
    const interactiveElements = ['button', 'a', 'input'];
    const interactiveScore = color.contexts.filter(ctx => 
      interactiveElements.includes(ctx.tagName)
    ).length * 2;
    
    score += interactiveScore;
    
    return score;
  }

  /**
   * Utility functions for statistical calculations
   */
  _calculateMedian(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 
      ? (sorted[mid - 1] + sorted[mid]) / 2 
      : sorted[mid];
  }

  _calculateVariance(values) {
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    return values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  }

  _calculateSkewness(values) {
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance = this._calculateVariance(values);
    const std = Math.sqrt(variance);
    
    if (std === 0) return 0;
    
    const skewness = values.reduce((sum, v) => 
      sum + Math.pow((v - mean) / std, 3), 0
    ) / values.length;
    
    return skewness;
  }

  /**
   * Infer hierarchy level from context
   */
  _inferHierarchyLevel(context) {
    // Fallback hierarchy inference
    if (context.semanticHints) {
      if (context.semanticHints.includes('primary')) return 1;
      if (context.semanticHints.includes('secondary')) return 2;
      if (context.semanticHints.includes('accent')) return 1;
    }
    return 3; // Default level
  }
}

// Export singleton instance
export const patternAnalyzer = new PatternAnalyzer();
export default PatternAnalyzer;