'use client'
import Image from "next/image";
import Slider from 'react-slick';
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import FunFact from "@/app/ui/FunFact";
import PageHeading from "@/app/ui/PageHeading";
import SectionHeading from "@/app/ui/SectionHeading";
import TeamSlider from "@/app/ui/Slider/TeamSlider";
import Spacing from "@/app/ui/Spacing";
import aboutImg from '../../../public/images/about_img_1.webp'
import aboutImg2 from '../../../public/images/about_img_2.webp'
import aboutImg3 from '../../../public/images/about_img_3.webp'
import aboutImg4 from '../../../public/images/about_img_4.webp'




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

export default function AboutPage() {
  const aboutSliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    customPaging: function(i) {
      return <button style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#69cce6',
        border: 'none',
        margin: '0 5px'
      }}></button>;
    }
  };

  return (
    <>
      {/* Start Page Heading Section */}
      <PageHeading
        title="Über Medical Inn Hair"
        bgSrc="/images/about_hero_bg.jpeg"
        pageLinkText="Über uns"
      />
      {/* End Page Heading Section */}

      {/* Start About Section */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-xl-5 col-lg-7">
            <SectionHeading
              title="Ihr vertrauensvoller Partner für natürliche Haartransplantation"
              subtitle="Über Medical Inn Hair"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0">
                Medical Inn Hair ist eine der führenden Kliniken für Haartransplantation in Düsseldorf. 
                Wir unterscheiden uns durch unsere langjährige Erfahrung, modernste FUE und DHI Techniken 
                sowie unseren ganzheitlichen Ansatz. Unser Expertenteam sorgt für natürliche und dauerhafte 
                Ergebnisse mit höchsten Qualitätsstandards.
              </p>
              <Spacing lg="30" md="30" />
              <Div className="cs-separator cs-accent_bg"></Div>
              <Spacing lg="25" md="40" />
            </SectionHeading>
          </Div>
          <Div className="col-lg-5 offset-xl-2">
            <Image
              src={aboutImg}
              alt="Medical Inn Hair Klinik"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
          <Div className="col-lg-7">
            <Div style={{ position: 'relative', paddingBottom: '60px' }}>
              <Slider {...aboutSliderSettings}>
                <Div>
                  <Image
                    src={aboutImg2}
                    alt="FUE Haartransplantation"
                    className="w-100 cs-radius_15"
                  />
                </Div>
                <Div>
                  <Image
                    src={aboutImg3}
                    alt="DHI Technik"
                    className="w-100 cs-radius_15"
                  />
                </Div>
              </Slider>
            </Div>
            <Spacing lg="25" md="25" />
          </Div>
        </Div>
      </Div>
      <Spacing lg="75" md="55" />
      {/* End About Section */}

      {/* Start Fun Fact Section */}
      <Div className="container">
        <FunFact
          title="Unsere Erfolge sprechen für sich"
          subtitle="Mit über 15 Jahren Erfahrung in der Haartransplantation haben wir tausenden von Patienten zu neuem Selbstvertrauen verholfen. Unsere Zahlen spiegeln unser Engagement für Exzellenz und Patientenzufriedenheit wider."
          data={funfaceData}
        />
      </Div>
      {/* End Fun Fact Section */}

      {/* Start Why Choose Section */}
      <Spacing lg="100" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-image_layer cs-style1">
              <Div className="cs-image_layer_in">
                <Image
                  src={aboutImg4}
                  alt="Haartransplantation Experte"
                  className="w-100 cs-radius_15"
                />
              </Div>
            </Div>
            <Spacing lg="0" md="40" />
          </Div>
          <Div className="col-xl-5 offset-xl-1 col-lg-6">
            <SectionHeading
              title="Erfahrene Spezialisten für Ihre Haartransplantation"
              subtitle="Warum Medical Inn Hair?"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0">
                Unsere Klinik steht für höchste medizinische Standards und innovative Behandlungsmethoden. 
                Mit modernster FUE und DHI Technik erreichen wir natürliche Ergebnisse, die ein Leben lang halten. 
                Unser erfahrenes Team aus Ärzten und Spezialisten begleitet Sie von der ersten Beratung bis zur 
                vollständigen Heilung.
              </p>
              <Spacing lg="15" md="15" />
              <p className="cs-m0">
                In unserer Düsseldorfer Klinik kombinieren wir jahrelange Expertise mit den neuesten 
                Technologien der Haartransplantation. Jeder Patient erhält eine individuelle Behandlung, 
                die auf seine spezifischen Bedürfnisse zugeschnitten ist.
              </p>
              <Spacing lg="30" md="30" />
              <Div className="cs-separator cs-accent_bg"></Div>
              <Spacing lg="25" md="0" />
            </SectionHeading>
          </Div>
        </Div>
      </Div>
      {/* End Why Choose Section */}

      {/* Start Team Section */}
      <Spacing lg="145" md="80" />
      <Div className="container">
        <SectionHeading
          title="Unser Experten-<br/>Team"
          subtitle="Unser Team"
          variant="cs-style1"
        />
        <Spacing lg="85" md="45" />
        <TeamSlider />
      </Div>
      {/* End Team Section */}

      {/* Start CTA Section */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Cta
          title="Lassen Sie uns gemeinsam <br />Ihre <i>Haartransplantation</i> planen"
          btnText="Beratungstermin buchen"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}