import React from 'react';
import AccessibleSlider from '../AccessibleSlider/AccessibleSlider';
import Div from '../Div';
import Post from '../Post';
const postData = [
  {
    url: '/blog/blog-details',
    src: '/images/post_1.webp',
    alt: 'Post',
    date: '15 März 2024',
    title: 'FUE vs. DHI: Welche Haartransplantations-Methode ist die richtige für Sie?',
  },
  {
    url: '/blog/blog-details',
    src: '/images/post_2.webp',
    alt: 'Post',
    date: '20 Februar 2024',
    title: 'Nachsorge bei Haartransplantation: 10 wichtige Tipps für optimale Ergebnisse',
  },
  {
    url: '/blog/blog-details',
    src: '/images/post_3.webp',
    alt: 'Post',
    date: '05 Januar 2024',
    title: 'PRP-Therapie: Natürliche Haarwachstumsförderung ohne Operation',
  },
];

export default function PostSlider() {
  /** Slider Settings **/
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <AccessibleSlider {...settings} className="cs-gap-24">
      {postData.map((item, index) => (
        <Div key={index}>
          <Post
            url={item.url}
            src={item.src}
            alt={item.alt}
            date={item.date}
            title={item.title}
          />
        </Div>
      ))}
    </AccessibleSlider>
  );
}
