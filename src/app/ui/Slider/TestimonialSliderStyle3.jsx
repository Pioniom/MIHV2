import React from 'react';
import Div from '../Div';
import AccessibleSlider from '../AccessibleSlider/AccessibleSlider';
import TestimonialStyle2 from '../Testimonial/TestimonialStyle2';
const testimonialData = [
  {
    avatarImgUrl: '/images/avatar_5.png',
    testimonialText:
      'Die Haartransplantation bei Medical Inn Hair hat mein Leben komplett verändert. Das Team war vom ersten Tag an professionell und einfühlsam. Die FUE-Methode war schmerzfrei und die Ergebnisse sind fantastisch.',
    avatarName: 'Michael Schmidt',
    avatarDesignation: 'Ingenieur',
    ratings: '5',
  },
  {
    avatarImgUrl: '/images/avatar_6.png',
    testimonialText:
      'Endlich wieder Selbstvertrauen! Bei Medical Inn Hair fühlte ich mich vom ersten Beratungsgespräch an sehr gut aufgehoben. Die DHI-Technik ist wirklich beeindruckend und das Ergebnis übertrifft alle Erwartungen.',
    avatarName: 'Sarah Müller',
    avatarDesignation: 'Marketing Managerin',
    ratings: '5',
  },
  {
    avatarImgUrl: '/images/avatar_7.png',
    testimonialText:
      'Beste Entscheidung meines Lebens! Medical Inn Hair in Düsseldorf war die perfekte Wahl. Kompetente Beratung, modernste Technik und ein Ergebnis, das einfach natürlich aussieht.',
    avatarName: 'Thomas Weber',
    avatarDesignation: 'Rechtsanwalt',
    ratings: '5',
  },
  {
    avatarImgUrl: '/images/avatar_5.png',
    testimonialText:
      'Unglaublich zufrieden mit dem Service und den Ergebnissen. Von der ersten Beratung bis zur Nachsorge war alles perfekt organisiert. Die Ärzte sind echte Experten auf ihrem Gebiet.',
    avatarName: 'Andreas Hoffmann',
    avatarDesignation: 'Geschäftsführer',
    ratings: '5',
  },
];

export default function TestimonialSliderStyle3() {
  /** Slider Settings **/
  const settings = {
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <AccessibleSlider {...settings} className="cs-slider cs-gap-24">
      {testimonialData.map((item, index) => (
        <Div key={index}>
          <TestimonialStyle2 {...item} />
        </Div>
      ))}
    </AccessibleSlider>
  );
}
