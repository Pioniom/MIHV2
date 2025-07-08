/**
 * 🚀 ColorEngineProvider - Zero-Config Integration Component
 * Automatically initializes and provides ColorEngine to the app
 * 
 * Usage: Just add to layout - no configuration needed!
 */

'use client';
import { useEffect, useState } from 'react';

const ColorEngineProvider = ({ children }) => {
  const [engineLoaded, setEngineLoaded] = useState(false);
  const [engineError, setEngineError] = useState(null);

  useEffect(() => {
    // Color Engine disabled for performance optimization
    console.log('🎨 ColorEngine disabled for better performance');
    
    // Set minimal state for compatibility
    setEngineLoaded(true);
    
    // Minimal global functions for compatibility
    window.colorEngineReady = false;
    window.colorEngine = null;
    
    return () => {
      // No cleanup needed when disabled
    };
  }, []);

  // Color Engine UI disabled

  // Production: Silent operation
  return (
    <>
      {children}
      {/* Color Editor Button - Disabled for production */}
      {false && process.env.NODE_ENV === 'development' && (
        <div style={{ display: 'none' }}>
          {/* Color Editor UI removed */}
        </div>
      )}
    </>
  );
};

export default ColorEngineProvider;