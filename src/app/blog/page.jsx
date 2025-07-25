import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import Pagination from "@/app/ui/Pagination";
import PostStyle2 from "@/app/ui/Post/PostStyle2";
import Sidebar from "@/app/ui/Sidebar.jsx/index.jsx";
import Spacing from "@/app/ui/Spacing";
import { getAllPosts } from "@/app/lib/blogData";

export const metadata = {
  title: 'Ratgeber - Haartransplantation & Haarausfall | Medical Inn Hair',
  description: 'Expertenwissen zu Haartransplantation, Haarausfall & Behandlungsmethoden ✓ FUE & DHI ✓ PRP Therapie ✓ Jetzt informieren!',
  keywords: 'Haartransplantation Ratgeber, Haarausfall, FUE, DHI, PRP Therapie, SMP, Haartransplantation Düsseldorf, Medical Inn Hair Blog',
  openGraph: {
    title: 'Ratgeber - Haartransplantation & Haarausfall | Medical Inn Hair',
    description: 'Expertenwissen zu Haartransplantation, Haarausfall & Behandlungsmethoden ✓ FUE & DHI ✓ PRP Therapie ✓ Jetzt informieren!',
    type: 'website',
    locale: 'de_DE',
    siteName: 'Medical Inn Hair',
    images: [{
      url: '/images/blog_hero_bg.jpeg',
      width: 1200,
      height: 630,
      alt: 'Haartransplantation Ratgeber Medical Inn Hair'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ratgeber - Haartransplantation & Haarausfall | Medical Inn Hair',
    description: 'Expertenwissen zu Haartransplantation, Haarausfall & Behandlungsmethoden ✓ FUE & DHI ✓ PRP Therapie ✓ Jetzt informieren!',
    images: ['/images/blog_hero_bg.jpeg']
  },
  alternates: {
    canonical: 'https://medical-inn-hair.de/blog'
  }
};

const postData = getAllPosts();

export default function BlogPage() {
  return (
    <>
      <PageHeading
        title="Ratgeber"
        bgSrc="/images/blog_hero_bg.jpeg"
        pageLinkText="Ratgeber"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            {postData.map((item, index) => (
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
                {postData.length > index + 1 && <Spacing lg="95" md="60" />}
              </Div>
            ))}
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