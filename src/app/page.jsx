'use client';
import Cta from '@/app/ui/Cta';
import Div from '@/app/ui/Div';
import FunFact from '@/app/ui/FunFact';
import Hero5 from '@/app/ui/Hero/Hero5';
import LogoList from '@/app/ui/LogoList';
import MovingText from '@/app/ui/MovingText';
import SectionHeading from '@/app/ui/SectionHeading';
import PortfolioSlider from '@/app/ui/Slider/PortfolioSlider';
import PostSlider from '@/app/ui/Slider/PostSlider';
import TeamSlider from '@/app/ui/Slider/TeamSlider';
import TestimonialSlider from '@/app/ui/Slider/TestimonialSlider';
import BenefitsSlider from '@/app/ui/Slider/TimelineSlider';
import Spacing from '@/app/ui/Spacing';
import VideoModal from '@/app/ui/VideoModal';
import Card from './ui/Card';
import Link from 'next/link';

// Hero Social Links
const heroSocialLinks = [
  {
    name: 'Instagram',
    links: '/',
  },
  {
    name: 'Facebook',
    links: '/',
  },
];
// FunFact Data
const funfaceData = [
  {
    title: 'Zufriedene Patienten',
    factNumber: '2000',
  },
  {
    title: 'Transplantierte Grafts',
    factNumber: '500K',
  },
  {
    title: 'Jahre Erfahrung',
    factNumber: '15',
  },
  {
    title: 'Erfolgsrate',
    factNumber: '98%',
  },
];
// Portfolio Data
const portfolioData = [
  {
    title: 'Vorher-Nachher FUE',
    subtitle: 'Details ansehen',
    href: '/portfolio/vorher-nachher-fue',
    src: '/images/portfolio_1.webp',
  },
  {
    title: 'DHI Ergebnis',
    subtitle: 'Details ansehen',
    href: '/portfolio/dhi-ergebnis',
    src: '/images/portfolio_2.webp',
  },
  {
    title: 'Natürliche Haarlinie',
    subtitle: 'Details ansehen',
    href: '/portfolio/natuerliche-haarlinie',
    src: '/images/portfolio_3webp.webp',
  },
  {
    title: 'Vollständige Abdeckung',
    subtitle: 'Details ansehen',
    href: '/portfolio/vollstaendige-abdeckung',
    src: '/images/portfolio_0.webp',
  },
];

export default function Home() {
  return (
    <>
      {/* Start Hero Section */}
      <Hero5
        subtitle="Modernste FUE und DHI Techniken für dauerhafte Ergebnisse. Vertrauen Sie auf unsere langjährige Erfahrung und Expertise."
        btnLink="/contact"
        btnText="Beratung buchen"
        socialLinksHeading="Folgen Sie uns"
        heroSocialLinks={heroSocialLinks}
      />
      {/* End Hero Section */}

      {/* Start FunFact Section */}
      <Spacing lg="35" md="20" />
      <div className="container">
        <FunFact
          variant="cs-type1"
          title="Zertifizierte Qualität"
          subtitle="Als staatlich anerkannte Privatklinik in Düsseldorf erfüllen wir höchste Hygiene- und Qualitätsstandards nach § 30 GewO. Alle Eingriffe nach deutschen medizinischen Standards für natürliche und dauerhafte Ergebnisse."
          data={funfaceData}
        />
      </div>
      {/* End FunFact Section */}

      {/* Start Service Section */}
      <Spacing lg="150" md="80" />
      <Div id="service">
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Medical Inn Hair Services"
                subtitle="Unsere Leistungen"
                btnText="Alle Behandlungen"
                btnLink="/service"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-8">
              <Div className="row">
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="AI Haar-Analyzer"
                    link="/ai-analyzer"
                    src="/images/service_1.webp"
                    alt="AI Analyse"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="FUE Saphir"
                    link="/service/fue-saphir"
                    src="/images/service_1.webp"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="DHI Technik"
                    link="/service/dhi"
                    src="/images/service_2.webp"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="PRP Therapie"
                    link="/service/prp"
                    src="/images/service_3.webp"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="SMP"
                    link="/service/smp"
                    src="/images/service_4.webp"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Service Section */}

      {/* Start MovingText Section */}
      <Spacing lg="60" md="40" />
      <MovingText 
        text="MEDICAL INN HAIR" 
        variant="cs-type3"
      />
      <Spacing lg="30" md="20" />
      {/* End MovingText Section */}

      {/* Start Portfolio Section */}
      <Spacing lg="80" md="40" />
      <Div>
        <Div className="container">
          <SectionHeading
            title="Unsere Ergebnisse"
            subtitle="Erfolgreiche Behandlungen"
            variant="cs-style1 text-center"
          />
          <Spacing lg="90" md="45" />
        </Div>
        <PortfolioSlider data={portfolioData} />
      </Div>
      {/* End Portfolio Section */}

      {/* Start AI Analyzer CTA Section */}
      <Spacing lg="100" md="60" />
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-lg-6">
            <SectionHeading
              title="Revolutionäre KI-Haaranalyse"
              subtitle="Kostenlose Erstanalyse"
              variant="cs-style1"
            />
            <Spacing lg="45" md="30" />
            <p className="cs-m0">
              Nutzen Sie unsere fortschrittliche KI-Technologie für eine präzise Analyse Ihrer Haarsituation. 
              Laden Sie einfach ein Foto hoch und erhalten Sie in wenigen Sekunden eine detaillierte Bewertung 
              mit Behandlungsempfehlungen von unserem spezialisierten AI-System.
            </p>
            <Spacing lg="45" md="30" />
            <Div className="cs-btn_group">
              <Link href="/ai-analyzer" className="cs-btn cs-style1">
                <span>Jetzt AI-Analyse starten</span>
              </Link>
              <Link href="/service/ai-analyzer" className="cs-btn cs-style2">
                <span>Mehr erfahren</span>
              </Link>
            </Div>
          </Div>
          <Div className="col-lg-6">
            <Spacing lg="0" md="40" />
            <Div className="cs-ai_analyzer_preview">
              <Div className="cs-ai_preview_icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m-4-7V9a2 2 0 0 1 2-2h4M5 11h4a2 2 0 0 1 2 2v3c0 1.1-.9 2-2 2H5m0-7h4"/>
                  <path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/>
                  <path d="M19 7h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1"/>
                </svg>
              </Div>
              <h4>🎯 95% Genauigkeit</h4>
              <p>Trainiert mit über 10.000 Haaranalyse-Bildern</p>
              <h4>⚡ Sofortige Ergebnisse</h4>
              <p>Detaillierte Analyse in wenigen Sekunden</p>
              <h4>📊 Norwood-Skala</h4>
              <p>Professionelle medizinische Bewertung</p>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg="50" md="40" />
      {/* End AI Analyzer CTA Section */}

      {/* Start Benefits Section */}
      <Spacing lg="100" md="40" />
      <Div className="cs-shape_wrap_2">
        <Div className="cs-shape_2">
          <Div />
        </Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Komfort & Annehmlichkeiten"
                subtitle="Medical Inn Hair Benefits"
                variant="cs-style1"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <BenefitsSlider />
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Benefits Section */}

      {/* Start Video Block Section */}
      <Spacing lg="130" md="70" />
      <Div className="container">
        <h2 className="cs-font_50 cs-m0 text-center cs-line_height_4">
          Natürliche Ergebnisse durch Expertise.
        </h2>
        <Spacing lg="70" md="70" />
        <VideoModal
          videoSrc="https://www.youtube.com/watch?v=p4kKWn5s93E"
          bgUrl="/images/video_bg.webp"
        />
      </Div>
      {/* End Video Block Section */}

      {/* Start Team Section */}
      <Spacing lg="145" md="80" />
      <Div className="container">
        <SectionHeading
          title="Unser erfahrenes <br/>Expertenteam"
          subtitle="Unser Team"
          variant="cs-style1"
        />
        <Spacing lg="85" md="45" />
        <TeamSlider />
      </Div>
      <Spacing lg="150" md="80" />
      {/* End Team Section */}

      {/* Start Testimonial Section */}
      <TestimonialSlider />
      {/* End Testimonial Section */}

      {/* Start Blog Section */}
      <Spacing lg="150" md="80" />
      <Div className="cs-shape_wrap_4">
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Aktuelle Beiträge und Tipps"
                subtitle="Ratgeber"
                btnText="Mehr Artikel"
                btnLink="/blog"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <Div className="cs-half_of_full_width">
                <PostSlider />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Blog Section */}

      {/* Start MovingText Section */}
      <Spacing lg="125" md="70" />
      <MovingText text="Vertrauensvolle Partnerschaften für beste Ergebnisse" />
      <Spacing lg="105" md="70" />
      {/* End MovingText Section */}

      {/* Start LogoList Section */}
      <Div className="container">
        <LogoList />
      </Div>
      <Spacing lg="150" md="80" />
      {/* End LogoList Section */}

      {/* Start CTA Section */}
      <Div className="container">
        <Cta
          title="Lassen Sie uns Ihr <br />Haar<i>traum</i> verwirklichen"
          btnText="Beratungstermin"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}