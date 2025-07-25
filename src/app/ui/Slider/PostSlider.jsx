import React from 'react';
import AccessibleSlider from '../AccessibleSlider/AccessibleSlider';
import Div from '../Div';
import Post from '../Post';
import { getRecentPosts, formatDateGerman } from '@/app/lib/blogData';

// Verwende die echten Blog-Daten
const blogPosts = getRecentPosts(3);
const postData = blogPosts.map(post => {
  // Titel für konsistente Darstellung kürzen (max 60 Zeichen)
  const truncatedTitle = post.title.length > 60 
    ? post.title.substring(0, 60) + '...' 
    : post.title;
    
  return {
    url: `/blog/${post.slug}`,
    src: post.thumb,
    alt: post.title,
    date: formatDateGerman(post.date),
    title: truncatedTitle,
  };
});

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
