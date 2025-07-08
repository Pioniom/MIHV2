'use client'

import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import Pagination from "@/app/ui/Pagination";
import PostStyle2 from "@/app/ui/Post/PostStyle2";
import Sidebar from "@/app/ui/Sidebar.jsx/index.jsx";
import Spacing from "@/app/ui/Spacing";

const postData = [
  {
    thumb: '/images/post_4.jpeg',
    title: 'FUE vs. DHI: Welche Haartransplantations-Methode ist die richtige für Sie?',
    subtitle:
      'Die Wahl der richtigen Haartransplantations-Methode ist entscheidend für ein optimales Ergebnis. FUE und DHI sind die modernsten Techniken, die jeweils ihre spezifischen Vorteile bieten. In diesem Ratgeber erklären wir die Unterschiede, Vor- und Nachteile beider Methoden und helfen Ihnen bei der Entscheidung für die passende Behandlung.',
    date: '15 März 2024',
    category: 'Behandlungsmethoden',
    categoryHref: '/blog',
    href: '/blog/blog-details',
  },
  {
    thumb: '/images/post_5.jpeg',
    title: 'Nachsorge bei Haartransplantation: 10 wichtige Tipps für optimale Ergebnisse',
    subtitle:
      'Die richtige Nachsorge ist entscheidend für den Erfolg Ihrer Haartransplantation. Von der ersten Woche nach dem Eingriff bis zu den folgenden Monaten gibt es wichtige Regeln zu beachten. Erfahren Sie, wie Sie die Heilung fördern, Komplikationen vermeiden und das bestmögliche Ergebnis erzielen.',
    date: '20 Februar 2024',
    category: 'Nachsorge',
    categoryHref: '/blog',
    href: '/blog/blog-details',
  },
  {
    thumb: '/images/post_6.jpeg',
    title: 'PRP-Therapie: Natürliche Haarwachstumsförderung ohne Operation',
    subtitle:
      'Die PRP-Therapie (Platelet Rich Plasma) ist eine innovative, nicht-operative Behandlung zur Förderung des Haarwachstums. Mit Ihrem eigenen Blutplasma stimulieren wir die Haarfollikel natürlich. Erfahren Sie mehr über den Ablauf, die Vorteile und für wen diese Therapie geeignet ist.',
    date: '05 Januar 2024',
    category: 'Therapien',
    categoryHref: '/blog',
    href: '/blog/blog-details',
  },
];

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
                  href={item.href}
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