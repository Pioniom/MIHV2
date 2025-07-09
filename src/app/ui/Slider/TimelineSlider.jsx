import { Icon } from '@iconify/react';
import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import Timeline from '../Timeline';
const benefitsData = [
  [
    {
      year: 'Hotel',
      name: 'Komfortable Unterkünfte',
      position: 'Partnerhotels in Düsseldorf',
      type: 'Übernachtung inkludiert',
    },
    {
      year: 'Transport',
      name: 'Kostenfreie Transfers',
      position: 'Flughafen & Bahnhof',
      type: 'Abholung und Rückfahrt',
    },
  ],
  [
    {
      year: 'Parken',
      name: 'Kostenlose Parkplätze',
      position: 'Direkt vor der Klinik',
      type: 'Sichere Stellplätze',
    },
    {
      year: 'Barrierefreiheit',
      name: 'Zugängliche Räumlichkeiten',
      position: 'Rollstuhlgerechte Ausstattung',
      type: 'Für alle Patienten',
    },
  ],
  [
    {
      year: 'WLAN',
      name: 'Kostenfreies Internet',
      position: 'Hochgeschwindigkeits-WLAN',
      type: 'Überall verfügbar',
    },
    {
      year: 'Sprachen',
      name: 'Mehrsprachiges Team',
      position: 'Deutsch, Englisch, Türkisch',
      type: 'Individuelle Betreuung',
    },
  ],
];

export default function BenefitsSlider() {
  /** Slider Settings **/
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
    >
      <Icon icon="bi:arrow-left" />
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'slick-next slick-arrow' +
        (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
    >
      <Icon icon="bi:arrow-right" />
    </div>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    arrows: false,
    responsive: [
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className="cs-arrow_style3">
      {benefitsData.map((item, index) => (
        <Div key={index}>
          <Timeline columnData={item} />
        </Div>
      ))}
    </Slider>
  );
}
