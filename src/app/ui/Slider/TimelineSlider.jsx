import { Icon } from '@iconify/react';
import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import Timeline from '../Timeline';
const benefitsData = [
  [
    {
      year: 'Hotel',
      name: 'Hotelkooperationen',
      position: 'Exklusive Partnerschaft mit ausgewählten Hotels in der Nähe',
      type: '',
    },
    {
      year: 'Bahnhof',
      name: 'Nähe zum Bahnhof',
      position: 'Bequeme Anreise mit öffentlichen Verkehrsmitteln',
      type: '',
    },
  ],
  [
    {
      year: 'Parken',
      name: 'Kostenlose Parkplätze',
      position: 'Parkplätze direkt vor Ort für unsere Patienten',
      type: '',
    },
    {
      year: 'Zugang',
      name: 'Barrierefreier Zugang',
      position: 'Vollständig zugänglich für alle Patienten',
      type: '',
    },
  ],
  [
    {
      year: 'WIFI',
      name: 'Kostenloses WIFI',
      position: 'Highspeed-Internet während Ihres gesamten Aufenthalts',
      type: '',
    },
    {
      year: 'Personal',
      name: 'Multilinguales Personal',
      position: 'Betreuung auf Deutsch, Englisch, Türkisch und Russisch',
      type: '',
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
