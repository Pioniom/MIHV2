/**
 * 🚌 EventBus - Pub/Sub Communication System
 * Enables loose coupling between color engine modules
 * 
 * Pattern: Publisher-Subscriber + Event Emitter
 * Max: 80 lines (small & focused)
 */

class EventBus {
  constructor() {
    this.events = new Map();
    this.wildcardListeners = new Set();
    this.once = new Map();
  }

  /**
   * Subscribe to events
   * @param {string} event - Event name or '*' for all events
   * @param {Function} callback - Event handler
   * @param {boolean} once - Fire only once
   */
  on(event, callback, once = false) {
    if (event === '*') {
      this.wildcardListeners.add(callback);
      return () => this.wildcardListeners.delete(callback);
    }

    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event).add(callback);
    
    if (once) {
      if (!this.once.has(event)) this.once.set(event, new Set());
      this.once.get(event).add(callback);
    }

    // Return unsubscribe function
    return () => this.off(event, callback);
  }

  /**
   * Unsubscribe from events
   */
  off(event, callback) {
    if (event === '*') {
      this.wildcardListeners.delete(callback);
      return;
    }

    if (this.events.has(event)) {
      this.events.get(event).delete(callback);
    }
    
    if (this.once.has(event)) {
      this.once.get(event).delete(callback);
    }
  }

  /**
   * Emit events with data
   */
  emit(event, ...args) {
    // Fire specific event listeners
    if (this.events.has(event)) {
      const listeners = [...this.events.get(event)];
      listeners.forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`EventBus error in ${event}:`, error);
        }
      });

      // Remove 'once' listeners
      if (this.once.has(event)) {
        this.once.get(event).forEach(callback => this.off(event, callback));
      }
    }

    // Fire wildcard listeners
    this.wildcardListeners.forEach(callback => {
      try {
        callback(event, ...args);
      } catch (error) {
        console.error(`EventBus wildcard error:`, error);
      }
    });
  }

  /**
   * Clear all listeners
   */
  clear() {
    this.events.clear();
    this.wildcardListeners.clear();
    this.once.clear();
  }
}

// Global singleton instance
export const eventBus = new EventBus();
export { EventBus };
export default EventBus;