import { Icon } from '@iconify/react';
import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
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
  {
    avatarImgUrl: '/images/avatar_6.png',
    testimonialText:
      'Ich kann Medical Inn Hair nur weiterempfehlen! Die Beratung war ausführlich und ehrlich. Die Transplantation verlief ohne Komplikationen und nach 10 Monaten bin ich mit dem natürlichen Ergebnis mehr als zufrieden.',
    avatarName: 'Markus Bauer',
    avatarDesignation: 'Architekt',
    ratings: '5',
  },
  {
    avatarImgUrl: '/images/avatar_7.png',
    testimonialText:
      'Professionelle Betreuung von A bis Z! Das Team von Medical Inn Hair hat mich durch den gesamten Prozess begleitet. Die Nachsorge war vorbildlich und das Ergebnis spricht für sich.',
    avatarName: 'Stefan Lehmann',
    avatarDesignation: 'Consultant',
    ratings: '5',
  },
];

export default function TestimonialSliderStyle4() {
  /** Team Member Data **/

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
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
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
    <Slider {...settings} className="cs-gap-24 cs-arrow_style2">
      {testimonialData.map((item, index) => (
        <Div key={index}>
          <TestimonialStyle2 {...item} />
        </Div>
      ))}
    </Slider>
  );
}
