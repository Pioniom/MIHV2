import React from 'react';
import Div from '../Div';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import MenuWidget from '../Widget/MenuWidget';
import Newsletter from '../Widget/Newsletter';
import SocialWidget from '../Widget/SocialWidget';
import TextWidget from '../Widget/TextWidget';

const copyrightLinks = [
  {
    title: 'Nutzungsbedingungen',
    href: '/',
  },
  {
    title: 'Datenschutz',
    href: '/',
  },
];

const serviceMenu = [
  {
    title: 'FUE Methode',
    href: '/service/service-details',
  },
  {
    title: 'DHI Technik',
    href: '/service/service-details',
  },
  {
    title: 'PRP Therapie',
    href: '/service/service-details',
  },
  {
    title: 'Nachsorge',
    href: '/service/service-details',
  },
];

const date = new Date().getFullYear();

export default function Footer({ copyrightText, logoSrc, logoAlt, text }) {
  return (
    <footer className="cs-fooer">
      <Div className="cs-fooer_main">
        <Div className="container">
          <Div className="row">
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <TextWidget
                  logoSrc="/images/logo.webp"
                  logoAlt="Logo"
                  text="Medical Inn Hair - Ihr Spezialist für Haartransplantationen in Düsseldorf. Modernste Techniken für natürliche Ergebnisse."
                />
                <SocialWidget />
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <MenuWidget menuItems={serviceMenu} menuHeading="Behandlungen" />
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <ContactInfoWidget title="Kontakt" />
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <Newsletter
                  title="Newsletter"
                  subtitle="Bleiben Sie über neue Behandlungsmethoden und Angebote informiert."
                  placeholder="ihre@email.de"
                />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <Div className="container">
        <Div className="cs-bottom_footer">
          <Div className="cs-bottom_footer_left">
            <Div className="cs-copyright">
              Copyright © {`${date}`} Medical Inn Hair.
            </Div>
          </Div>
          <Div className="cs-bottom_footer_right">
            <MenuWidget menuItems={copyrightLinks} variant=" cs-style2" />
          </Div>
        </Div>
      </Div>
    </footer>
  );
}
