'use client'
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import Portfolio from "@/app/ui/Portfolio";
import SectionHeading from "@/app/ui/SectionHeading";
import Spacing from "@/app/ui/Spacing";
import { Icon } from "@iconify/react";
import { useState } from "react";

const portfolioData = [
  {
    title: 'FUE Haartransplantation',
    subtitle: 'Details ansehen',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_4.jpeg',
    category: 'fue_methode',
  },
  {
    title: 'DHI Technik Ergebnis',
    subtitle: 'Details ansehen',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_5.jpeg',
    category: 'dhi_technik',
  },
  {
    title: 'Natürliche Haarlinie',
    subtitle: 'Details ansehen',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_6.jpeg',
    category: 'fue_methode',
  },
  {
    title: 'Vollständige Abdeckung',
    subtitle: 'Details ansehen',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_7.jpeg',
    category: 'dhi_technik',
  },
  {
    title: 'Dichte Haarstruktur',
    subtitle: 'Details ansehen',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_8.jpeg',
    category: 'fue_methode',
  },
  {
    title: 'Augenbrauen Transplantation',
    subtitle: 'Details ansehen',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_9.jpeg',
    category: 'augenbrauen',
  },
  {
    title: 'Bart Transplantation',
    subtitle: 'Details ansehen',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_10.jpeg',
    category: 'bart',
  },
  {
    title: 'Korrektur-Behandlung',
    subtitle: 'Details ansehen',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_4.jpeg',
    category: 'korrektur',
  },
  {
    title: 'PRP Therapie Ergebnis',
    subtitle: 'Details ansehen',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_5.jpeg',
    category: 'prp_therapie',
  },
  {
    title: 'Langzeitergebnis',
    subtitle: 'Details ansehen',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_6.jpeg',
    category: 'fue_methode',
  },
];
const categoryMenu = [
  {
    title: 'FUE Methode',
    category: 'fue_methode',
  },
  {
    title: 'DHI Technik',
    category: 'dhi_technik',
  },
  {
    title: 'Augenbrauen',
    category: 'augenbrauen',
  },
  {
    title: 'Bart',
    category: 'bart',
  },
  {
    title: 'PRP Therapie',
    category: 'prp_therapie',
  },
  {
    title: 'Korrektur',
    category: 'korrektur',
  },
];

export default function PortfolioPage() {
  const [active, setActive] = useState('all');
  const [itemShow, setItemShow] = useState(7);

  return (
    <>
      <PageHeading
        title="Galerie"
        bgSrc="/images/portfolio_hero_bg.jpeg"
        pageLinkText="Galerie"
      />
      <Spacing lg="145" md="80" />
      <Div className="container">
        <Div className="cs-portfolio_1_heading">
          <SectionHeading title="Unsere Behandlungsergebnisse" subtitle="Unsere Galerie" />
          <Div className="cs-filter_menu cs-style1">
            <ul className="cs-mp0 cs-center">
              <li className={active === 'all' ? 'active' : ''}>
                <span onClick={() => setActive('all')}>Alle</span>
              </li>
              {categoryMenu.map((item, index) => (
                <li
                  className={active === item.category ? 'active' : ''}
                  key={index}
                >
                  <span onClick={() => setActive(item.category)}>
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </Div>
        </Div>
        <Spacing lg="90" md="45" />
        <Div className="row">
          {portfolioData.slice(0, itemShow).map((item, index) => (
            <Div
              className={`${
                index === 3 || index === 6 ? 'col-lg-8' : 'col-lg-4'
              } ${
                active === 'all'
                  ? ''
                  : !(active === item.category)
                  ? 'd-none'
                  : ''
              }`}
              key={index}
            >
              <Portfolio
                title={item.title}
                subtitle={item.subtitle}
                href={item.href}
                src={item.src}
                variant="cs-style1 cs-type1"
              />
              <Spacing lg="25" md="25" />
            </Div>
          ))}
        </Div>

        <Div className="text-center">
          {portfolioData.length <= itemShow ? (
            ''
          ) : (
            <>
              <Spacing lg="65" md="40" />
              <span
                className="cs-text_btn"
                onClick={() => setItemShow(itemShow + 3)}
              >
                <span>Mehr laden</span>
                <Icon icon="bi:arrow-right" />
              </span>
            </>
          )}
        </Div>
      </Div>
      <Spacing lg="145" md="80" />
      <Cta
        title="info@medicalinnhair.de"
        bgSrc="/images/cta_bg_2.jpeg"
        variant="rounded-0"
      />
    </>
  );
}