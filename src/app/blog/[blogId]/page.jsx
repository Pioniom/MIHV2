import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import Sidebar from "@/app/ui/Sidebar.jsx/index.jsx";
import Spacing from "@/app/ui/Spacing";
import CommentForm from "@/app/ui/CommentForm";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, formatDateGerman } from "@/app/lib/blogData";
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { blogId } = await params;
  const post = getPostBySlug(blogId);
  
  if (!post) {
    return {
      title: 'Artikel nicht gefunden | Medical Inn Hair',
      description: 'Der angeforderte Artikel konnte nicht gefunden werden.'
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.subtitle,
    keywords: post.keywords || 'Haartransplantation, Haarausfall, Medical Inn Hair, Düsseldorf',
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.subtitle,
      type: 'article',
      locale: 'de_DE',
      siteName: 'Medical Inn Hair',
      images: [{
        url: post.thumb,
        width: 1200,
        height: 630,
        alt: post.title
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.subtitle,
      images: [post.thumb]
    },
    alternates: {
      canonical: `https://medical-inn-hair.de/blog/${post.slug}`
    }
  };
}

export default async function BlogDetailsPage({ params }) {
  const { blogId } = await params;
  const post = getPostBySlug(blogId);
  
  if (!post) {
    notFound();
  }
  return (
    <>
    {/* Start Page Heading Section */}
      <PageHeading
        title={post.title}
        bgSrc='/images/blog_details_hero_bg.jpeg'
        pageLinkText={post.slug}
      />
      {/* End Page Heading Section */}

      {/* Start Blog Details */}
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">

            {/* Start Details Post Content */}
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <Image 
                  src={post.thumb} 
                  alt={post.title} 
                  width={800} 
                  height={400} 
                  className="w-100 cs-radius_15"
                  style={{ objectFit: 'cover' }}
                />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">{formatDateGerman(post.date)}</span>
                  <Link href={post.categoryHref} className="cs-post_avatar">{post.category}</Link>
                </Div>
                <h1 className="cs-post_title">{post.title}</h1>
                <p>{post.subtitle}</p>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </Div>
            </Div>
            {/* End Details Post Content */}

            <CommentForm />
          </Div>
          <Div className="col-xl-3 col-lg-4 offset-xl-1">
            {/* Start Sidebar */}
            <Spacing lg='0' md='80'/>
            <Sidebar />
            {/* End Sidebar */}
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      {/* Start Blog Details */}

      {/* Start CTA Section */}
      <Div className="container">
        <Cta 
          title='Lassen Sie uns Ihre <br />Haar<i>transformation</i> besprechen' 
          btnText='Beratung buchen' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
      {/* End CTA Section */}
    </>
  )
}