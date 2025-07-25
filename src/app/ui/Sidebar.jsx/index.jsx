import React from 'react'
import Div from '../Div'
import AuthorWidget from '../Widget/AuthorWidget'
import RecentPost from '../Widget/RecentPost'
import SearchWidget from '../Widget/SearchWidget'
import SideMenuWidget from '../Widget/SideMenuWidget'
import TagWidget from '../Widget/TagWidget'
import { getCategories, getRecentPosts, formatDateGerman } from '@/app/lib/blogData'

export default function Sidebar() {
  const categories = getCategories();
  const recentPosts = getRecentPosts(4);
  
  const categoryData = categories.map(category => ({
    title: category.name,
    url: `/blog/kategorie/${category.slug}`
  }));
  
  const recentPostData = recentPosts.map(post => ({
    title: post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title,
    thumb: post.thumb,
    href: `/blog/${post.slug}`,
    date: formatDateGerman(post.date)
  }));
  
  const medicalTags = [
    {
      title: 'Haartransplantation',
      url: '/blog'
    },
    {
      title: 'FUE Technik',
      url: '/blog'
    },
    {
      title: 'DHI Methode',
      url: '/blog'
    },
    {
      title: 'PRP Therapie',
      url: '/blog'
    },
    {
      title: 'Nachsorge',
      url: '/blog'
    },
    {
      title: 'Haarausfall',
      url: '/blog'
    },
    {
      title: 'Düsseldorf',
      url: '/blog'
    },
  ]
  return (
    <>
      <Div className="cs-sidebar_item">
        <AuthorWidget 
          src='/images/assistent_medicalinnhair.webp'
          name='Medical Inn Hair' 
          description='Ihr Spezialist für moderne Haartransplantationen in Düsseldorf. Natürliche Ergebnisse mit FUE-Saphir und DHI-Technik.'
        />
      </Div>
      <Div className="cs-sidebar_item">
        <SearchWidget title='Suche'/>
      </Div>
      <Div className="cs-sidebar_item">
        <SideMenuWidget title='Kategorien' data={categoryData}/>
      </Div>
      <Div className="cs-sidebar_item">
        <RecentPost title='Aktuelle Artikel' data={recentPostData}/>
      </Div>
      <Div className="cs-sidebar_item">
        <TagWidget title='Tags' data={medicalTags}/>
      </Div>
    </>
  )
}
