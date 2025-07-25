'use client'
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import Pagination from "@/app/ui/Pagination";
import PostStyle2 from "@/app/ui/Post/PostStyle2";
import Sidebar from "@/app/ui/Sidebar.jsx/index.jsx";
import Spacing from "@/app/ui/Spacing";
import { getPostsByCategory, getCategories } from "@/app/lib/blogData";
import { notFound } from 'next/navigation';
import { use } from 'react';

export default function CategoryPage({ params }) {
  const { categorySlug } = use(params);
  
  // Find the category
  const categories = getCategories();
  const category = categories.find(cat => cat.slug === categorySlug);
  
  if (!category) {
    notFound();
  }
  
  // Get posts for this category
  const posts = getPostsByCategory(categorySlug);

  return (
    <>
      <PageHeading
        title={`Kategorie: ${category.name}`}
        bgSrc="/images/blog_hero_bg.jpeg"
        pageLinkText={`kategorie-${categorySlug}`}
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            {posts.length > 0 ? (
              posts.map((item, index) => (
                <Div key={index}>
                  <PostStyle2
                    thumb={item.thumb}
                    title={item.title}
                    subtitle={item.subtitle}
                    date={item.date}
                    category={item.category}
                    categoryHref={item.categoryHref}
                    href={`/blog/${item.slug}`}
                  />
                  {posts.length > index + 1 && <Spacing lg="95" md="60" />}
                </Div>
              ))
            ) : (
              <Div>
                <h2>Keine Artikel in dieser Kategorie gefunden</h2>
                <p>Derzeit sind keine Artikel in der Kategorie "{category.name}" verfügbar.</p>
              </Div>
            )}
            <Spacing lg="60" md="40" />
            <Pagination />
          </Div>
          <Div className="col-xl-3 col-lg-4 offset-xl-1">
            <Spacing lg="0" md="80" />
            <Sidebar />
          </Div>
        </Div>
      </Div>
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Cta
          title="Lassen Sie uns Ihre <br />Haar<i>transformation</i> besprechen"
          btnText="Beratung buchen"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
    </>
  );
}