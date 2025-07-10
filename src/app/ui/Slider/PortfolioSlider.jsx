import React from 'react';
import Portfolio from '../Portfolio';
import Div from '../Div';
import AccessibleSlider from '../AccessibleSlider/AccessibleSlider';

export default function PortfolioSlider({ data }) {
  /** Slider Settings **/
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 3,
    speed: 500,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <AccessibleSlider {...settings} className="cs-slider cs-style3 cs-gap-24">
      {data.map((item, index) => (
        <Div key={index}>
          <Portfolio
            title={item.title}
            subtitle={item.subtitle}
            href={item.href}
            src={item.src}
          />
        </Div>
      ))}
    </AccessibleSlider>
  );
}
