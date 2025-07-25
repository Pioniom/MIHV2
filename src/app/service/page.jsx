'use client'
import Card from "../ui/Card";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import PricingTableList from "@/app/ui/PricingTable/PricingTableList";
import SectionHeading from "@/app/ui/SectionHeading";
import TestimonialSlider from "@/app/ui/Slider/TestimonialSlider";
import Spacing from "@/app/ui/Spacing";

export default function ServicesPage() {
  return (
    <>
      <PageHeading 
        title='Behandlungen'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='Behandlungen'
      />
      <Spacing lg='150' md='80'/>
      <Div className='cs-shape_wrap_4'>
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title='Medical Inn Hair Services' 
                subtitle='Unsere Leistungen'
              />
              <Spacing lg='90' md='45'/>
            </Div>
            <Div className='col-xl-8'>
              <Div className='cs-bento_grid'>
                <Div className='cs-bento_item cs-bento_large'>
                  <Card
                    title='AI Haar-Analyzer'
                    link='/ai-analyzer'
                    src='/images/service_5.webp'
                    alt='AI Analyse'
                  />
                </Div>
                <Div className='cs-bento_item cs-bento_medium'>
                  <Card
                    title='FUE Saphir'
                    link='/service/fue-saphir'
                    src='/images/service_1.webp'
                    alt='Service'
                  />
                </Div>
                <Div className='cs-bento_item cs-bento_medium'>
                  <Card
                    title='DHI Technik'
                    link='/service/dhi'
                    src='/images/service_2.webp'
                    alt='Service'
                  />
                </Div>
                <Div className='cs-bento_item cs-bento_small'>
                  <Card
                    title='PRP Therapie'
                    link='/service/prp'
                    src='/images/service_3.webp'
                    alt='Service'
                  />
                </Div>
                <Div className='cs-bento_item cs-bento_small'>
                  <Card
                    title='SMP'
                    link='/service/smp'
                    src='/images/service_4.webp'
                    alt='Service'
                  />
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <SectionHeading
          title='Transparente Preise <br/>für Ihre Behandlung' 
          subtitle='Preise & Pakete'
        />
        <Spacing lg='85' md='40'/>
        <PricingTableList/>
      </Div>
      <Spacing lg='125' md='55'/>
      <TestimonialSlider/>
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Cta 
          title='Lassen Sie uns Ihre <br />Haar<i>transformation</i> besprechen' 
          btnText='Beratung buchen' 
          btnLink='/contact' 
          bgSrc='/images/cta_bg.jpeg'
        />
      </Div>
    </>
  )
}