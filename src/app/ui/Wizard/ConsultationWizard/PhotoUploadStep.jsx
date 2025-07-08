'use client'
import { useState, useCallback } from 'react';
import Div from '../../Div';
import WizardStep from '../WizardStep';

export default function PhotoUploadStep({ formData, updateFormData, onNext, onPrev }) {
  const [data, setData] = useState({
    photos: formData.photos || [],
    photoConsent: formData.photoConsent || false
  });

  const [dragActive, setDragActive] = useState(false);

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    updateFormData(newData);
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => 
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024 // 10MB limit
    );

    if (validFiles.length > 0) {
      const newPhotos = [...data.photos];
      
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPhotos.push({
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
            name: file.name
          });
          
          const newData = { ...data, photos: newPhotos };
          setData(newData);
          updateFormData(newData);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (photoId) => {
    const newPhotos = data.photos.filter(photo => photo.id !== photoId);
    const newData = { ...data, photos: newPhotos };
    setData(newData);
    updateFormData(newData);
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <WizardStep
      title="Foto-Upload (Optional)"
      subtitle="Fotos helfen uns bei der Beurteilung Ihrer Situation. Alle Bilder werden vertraulich behandelt."
      onNext={onNext}
      onPrev={onPrev}
    >
      <Div className="cs-form_group">
        <label>Hilfreiche Foto-Bereiche:</label>
        <Div className="cs-photo_guidelines">
          <ul>
            <li>• Frontansicht (Stirn und Haaransatz)</li>
            <li>• Seitenansichten (links und rechts)</li>
            <li>• Scheitelbereich von oben</li>
            <li>• Hinterkopf/Tonsur</li>
            <li>• Nahaufnahmen problematischer Bereiche</li>
          </ul>
        </Div>
      </Div>

      <Div className="cs-form_group">
        <label>Fotos hochladen</label>
        <Div 
          className={`cs-photo_upload_area ${dragActive ? 'cs-drag_active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Div className="cs-upload_content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2839 15.7161C12.9324 17.0676 10.7347 17.0676 9.38319 15.7161C8.03167 14.3646 8.03167 12.1669 9.38319 10.8154L15.7161 4.48251C16.6857 3.51289 18.2426 3.51289 19.2122 4.48251C20.1818 5.45213 20.1818 7.00901 19.2122 7.97863L12.8793 14.3115" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Dateien hier ablegen oder klicken zum Auswählen</p>
            <small>PNG, JPG bis 10MB pro Bild</small>
          </Div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="cs-file_input"
          />
        </Div>
      </Div>

      {data.photos.length > 0 && (
        <Div className="cs-form_group">
          <label>Hochgeladene Fotos ({data.photos.length})</label>
          <Div className="cs-photo_preview_grid">
            {data.photos.map(photo => (
              <Div key={photo.id} className="cs-photo_preview_item">
                <img src={photo.preview} alt={photo.name} />
                <Div className="cs-photo_overlay">
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="cs-remove_photo"
                  >
                    ×
                  </button>
                </Div>
                <Div className="cs-photo_name">{photo.name}</Div>
              </Div>
            ))}
          </Div>
        </Div>
      )}

      <Div className="cs-form_group">
        <Div className="cs-checkbox_item">
          <input
            type="checkbox"
            id="photoConsent"
            checked={data.photoConsent}
            onChange={(e) => handleChange('photoConsent', e.target.checked)}
          />
          <label htmlFor="photoConsent">
            Ich stimme der Verwendung meiner Fotos für die medizinische Beurteilung und Dokumentation zu. 
            Die Bilder werden vertraulich behandelt und nicht an Dritte weitergegeben.
          </label>
        </Div>
      </Div>

      <Div className="cs-info_box">
        <p><strong>Hinweis:</strong> Das Hochladen von Fotos ist optional, aber empfohlen. 
        Gute Fotos ermöglichen es unseren Experten, Ihre Situation bereits vor dem Termin 
        zu beurteilen und eine gezielteren Beratung anzubieten.</p>
      </Div>
    </WizardStep>
  );
}