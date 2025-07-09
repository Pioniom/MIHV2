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
import TimelineSlider from '@/app/ui/Slider/TimelineSlider';
import Spacing from '@/app/ui/Spacing';
import VideoModal from '@/app/ui/VideoModal';
import Card from './ui/Card';

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
    factNumber: '2000+',
  },
  {
    title: 'Transplantierte Grafts',
    factNumber: '500K+',
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
          title="Unsere Erfolge"
          subtitle="Medical Inn Hair ist Ihr vertrauensvoller Partner für professionelle Haartransplantationen. Mit modernster Technik und langjähriger Erfahrung erzielen wir natürliche und dauerhafte Ergebnisse."
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
                title="Behandlungen die wir anbieten"
                subtitle="Unsere Leistungen"
                btnText="Alle Behandlungen"
                btnLink="/service"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-8">
              <Div className="row">
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="FUE Methode"
                    link="/service/service-details"
                    src="/images/service_1.webp"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="DHI Technik"
                    link="/service/service-details"
                    src="/images/service_2.webp"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="PRP Therapie"
                    link="/service/service-details"
                    src="/images/service_3.webp"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Nachsorge"
                    link="/service/service-details"
                    src="/images/service_4.webp"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
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

      {/* Start Awards Section */}
      <Spacing lg="150" md="80" />
      <Div className="cs-shape_wrap_2">
        <Div className="cs-shape_2">
          <Div />
        </Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Auszeichnungen und Zertifikate"
                subtitle="Unsere Qualität"
                variant="cs-style1"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <TimelineSlider />
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Awards Section */}

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