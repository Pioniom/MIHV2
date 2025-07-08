import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import Button from '../Button';
import Div from '../Div';
import VerticalLinks from '../VerticalLinks';

export default function Hero5({
  title,
  subtitle,
  btnLink,
  btnText,
  socialLinksHeading,
  heroSocialLinks,
}) {
  const typewriterWords = ['Schmerzarm', 'Effizient', 'Natürlich'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = typewriterWords[currentWordIndex];
      
      if (!isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        setTypingSpeed(150);
        
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        setTypingSpeed(75);
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % typewriterWords.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed, typewriterWords]);

  const displayTitle = `<span class="cs-typewriter-text">${currentText || '\u00a0'}</span><br /><span class="cs-hero-subtitle-text">Haartransplantation<br />auf höchstem Niveau</span>`;

  return (
    <Div
      className="cs-hero cs-style3 cs-bg cs-fixed_bg"
      id="home"
    >
      <Div className="cs-circle_1" />
      <Div className="cs-circle_2" />
      <Div className="container">
        <Div className="row align-items-center">
          {/* Left column - Text content */}
          <Div className="col-lg-6">
            <Div className="cs-hero_text">
              <h1 className="cs-hero_title text-start">{parse(displayTitle)}</h1>
              <Div className="cs-hero_subtitle text-start">{subtitle}</Div>
              <Button btnLink={btnLink} btnText={btnText} />
            </Div>
          </Div>
          
          {/* Right column - SVG Animation */}
          <Div className="col-lg-6">
            <Div className="cs-hero_image_wrapper">
              <Div className="cs-hero_image_container">
                {/* Rotierendes SVG im Hintergrund */}
                <Div className="cs-rotating_svg">
                  <img src="/images/hero-hair-circle.svg" alt="" className="cs-rotate_animation" />
                </Div>
                
                {/* Hauptbild darüber */}
                <Div className="cs-hero_main_image">
                  <img
                    src="/images/hero-hair.webp"
                    alt="Medical Inn Hair - Zufriedener Patient"
                    className="cs-hero_img"
                  />
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <VerticalLinks
        data={heroSocialLinks}
        title={socialLinksHeading}
        variant="cs-left_side"
      />
    </Div>
  );
}
