import { Icon } from '@iconify/react';
import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import Timeline from '../Timeline';
const timelineData = [
  [
    {
      year: '2020',
      name: 'ISHRS Zertifizierung',
      position: 'International Society of Hair Restoration Surgery',
      type: 'FUE Spezialisierung',
    },
    {
      year: '2022',
      name: 'DHI Zertifikat',
      position: 'Direct Hair Implantation',
      type: 'Advanced Technique',
    },
  ],
  [
    {
      year: '2021',
      name: 'Qualitätssiegel Düsseldorf',
      position: 'Medizinische Exzellenz',
      type: 'Patientensicherheit',
    },
    {
      year: '2023',
      name: 'ISO 9001:2015',
      position: 'Qualitätsmanagement',
      type: 'Zertifizierte Prozesse',
    },
  ],
  [
    {
      year: '2019',
      name: 'Ärztekammer Zertifikat',
      position: 'Fachbereich Haartransplantation',
      type: 'Medizinische Qualifikation',
    },
    {
      year: '2024',
      name: 'Patient Choice Award',
      position: 'Beste Haarklinik Düsseldorf',
      type: 'Patientenzufriedenheit',
    },
  ],
];

export default function TimelineSlider() {
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
      {timelineData.map((item, index) => (
        <Div key={index}>
          <Timeline columnData={item} />
        </Div>
      ))}
    </Slider>
  );
}
