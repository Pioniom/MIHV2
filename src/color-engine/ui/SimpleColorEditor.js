/**
 * 🎨 Simple Color Editor - Direct DOM Implementation
 * No React dependencies - works immediately
 */

export function createSimpleColorEditor(colorEngine) {
  console.log('🎨 Creating Simple Color Editor...');
  
  // Get colors from engine
  const colors = colorEngine?.colorRegistry?.getAllColors() || [];
  console.log('📋 Found colors:', colors.length);
  
  // Create modal HTML
  const modalHTML = `
    <div id="simple-color-editor" style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <div style="
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 800px;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
      ">
        <!-- Header -->
        <div style="
          padding: 24px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8f9fa;
        ">
          <div>
            <h2 style="margin: 0; font-size: 24px; font-weight: 700; color: #333;">
              🎨 Medical Inn Hair - Color Studio
            </h2>
            <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">
              ${colors.length} Farben erkannt • Live-Editing aktiv
            </p>
          </div>
          <button onclick="closeSimpleColorEditor()" style="
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
            color: #666;
            border-radius: 50%;
            width: 40px;
            height: 40px;
          ">×</button>
        </div>
        
        <!-- Content -->
        <div style="
          padding: 24px;
          overflow-y: auto;
          flex: 1;
        ">
          <div id="color-list" style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 16px;
          ">
            ${colors.map(color => `
              <div class="color-item" style="
                border: 1px solid #e9ecef;
                border-radius: 12px;
                padding: 16px;
                background: white;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                  <div style="
                    width: 40px;
                    height: 40px;
                    background: ${color.hex};
                    border-radius: 8px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  "></div>
                  <div>
                    <div style="
                      font-family: monospace;
                      font-size: 16px;
                      font-weight: 600;
                      color: #333;
                    ">${color.hex.toUpperCase()}</div>
                    <div style="
                      font-size: 12px;
                      color: #666;
                    ">
                      ${color.usageCount}x verwendet
                      ${color.semanticRole ? ` • ${color.semanticRole}` : ''}
                    </div>
                  </div>
                </div>
                
                <div style="display: flex; gap: 8px; align-items: center;">
                  <input 
                    type="color" 
                    value="${color.hex}" 
                    onchange="changeColor('${color.id}', this.value, '${color.semanticRole || ''}')"
                    style="
                      width: 40px;
                      height: 32px;
                      border: none;
                      border-radius: 6px;
                      cursor: pointer;
                    "
                  />
                  <input 
                    type="text" 
                    value="${color.hex}" 
                    onchange="changeColor('${color.id}', this.value, '${color.semanticRole || ''}')"
                    style="
                      flex: 1;
                      padding: 8px 12px;
                      border: 1px solid #ddd;
                      border-radius: 6px;
                      font-family: monospace;
                      font-size: 14px;
                    "
                  />
                  <button onclick="resetColor('${color.id}', '${color.originalHex || color.hex}')" style="
                    padding: 8px 12px;
                    background: #6c757d;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 12px;
                  ">Reset</button>
                </div>
              </div>
            `).join('')}
          </div>
          
          ${colors.length === 0 ? `
            <div style="
              text-align: center;
              padding: 60px 20px;
              color: #666;
            ">
              <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
              <h3 style="margin: 0 0 8px 0;">Keine Farben gefunden</h3>
              <p style="margin: 0;">Das Color Engine System scannt noch die Website...</p>
            </div>
          ` : ''}
          
          <div style="
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #e9ecef;
            display: flex;
            gap: 12px;
          ">
            <button onclick="exportTheme()" style="
              flex: 1;
              padding: 12px 24px;
              background: #28a745;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 600;
            ">📥 Theme Exportieren</button>
            <button onclick="resetAllColors()" style="
              padding: 12px 24px;
              background: #dc3545;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 600;
            ">🔄 Alle Zurücksetzen</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Create modal element
  const modal = document.createElement('div');
  modal.innerHTML = modalHTML;
  document.body.appendChild(modal);
  
  // Add global functions
  window.closeSimpleColorEditor = function() {
    const editor = document.getElementById('simple-color-editor');
    if (editor) {
      editor.remove();
    }
  };
  
  window.changeColor = function(colorId, newHex, semanticRole) {
    console.log(`🎨 Changing color ${colorId} to ${newHex}`);
    
    // Validate hex
    if (!/^#[0-9A-F]{6}$/i.test(newHex)) {
      alert('Ungültiger Hex-Code! Format: #RRGGBB');
      return;
    }
    
    // Apply to CSS custom property
    const property = `--discovered-${colorId}`;
    document.documentElement.style.setProperty(property, newHex);
    
    // Apply to semantic property if exists
    if (semanticRole) {
      const semanticProperty = `--color-${semanticRole}`;
      document.documentElement.style.setProperty(semanticProperty, newHex);
    }
    
    // Save to engine if available
    if (colorEngine?.saveTheme) {
      colorEngine.saveTheme();
    }
    
    console.log(`✅ Color applied: ${property} = ${newHex}`);
  };
  
  window.resetColor = function(colorId, originalHex) {
    console.log(`🔄 Resetting color ${colorId} to ${originalHex}`);
    window.changeColor(colorId, originalHex, '');
  };
  
  window.resetAllColors = function() {
    if (confirm('Alle Farben auf Original zurücksetzen?')) {
      colors.forEach(color => {
        const originalHex = color.originalHex || color.hex;
        window.changeColor(color.id, originalHex, color.semanticRole);
      });
      console.log('🔄 All colors reset');
    }
  };
  
  window.exportTheme = function() {
    const theme = {};
    colors.forEach(color => {
      const currentValue = document.documentElement.style.getPropertyValue(`--discovered-${color.id}`);
      if (currentValue && currentValue !== color.hex) {
        theme[`--discovered-${color.id}`] = currentValue;
        if (color.semanticRole) {
          theme[`--color-${color.semanticRole}`] = currentValue;
        }
      }
    });
    
    const themeJson = JSON.stringify(theme, null, 2);
    
    // Copy to clipboard
    navigator.clipboard.writeText(themeJson).then(() => {
      alert('🎉 Theme wurde in die Zwischenablage kopiert!');
    });
    
    // Also download as file
    const blob = new Blob([themeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'medical-inn-hair-theme.json';
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('📥 Theme exported:', theme);
  };
  
  console.log('✅ Simple Color Editor created successfully!');
}