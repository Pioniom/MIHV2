import React, { useEffect } from 'react';
import Div from '../Div';

const partnerLogos = [
  {
    src: '/proofs-certs/cert1.webp',
    alt: 'Medical Inn Hair Zertifikat 1',
  },
  {
    src: '/proofs-certs/cert2.webp',
    alt: 'Medical Inn Hair Zertifikat 2',
  },
  {
    src: '/proofs-certs/cert3.webp',
    alt: 'Medical Inn Hair Zertifikat 3',
  },
];

export default function LogoList() {
  useEffect(() => {
    // ProvenExpert Widget laden
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://www.provenexpert.com/widget/circlewidget.js?s=200&id=ccyht&u=18zZhIQZjSUAjymA2xGBiWmZ48TA1LmA';
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Div className="cs-partner_logo_wrap">
      {partnerLogos.map((partnerLogo, index) => (
        <div className="cs-partner_logo" key={index}>
          <img src={partnerLogo.src} alt={partnerLogo.alt} />
        </div>
      ))}
      {/* ProvenExpert Bewertungssiegel */}
      <div className="cs-partner_logo">
        <span id="provenexpert_circle_widget_ccyht" style={{textDecoration: 'none'}}></span>
      </div>
      {/* ProvenExpert Bewertungssiegel */}
    </Div>
  );
}
