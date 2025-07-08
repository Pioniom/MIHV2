'use client'
import Accordion from "@/app/ui/Accordion";
import Button from "@/app/ui/Button";
import Cta from "@/app/ui/Cta";
import Div from "@/app/ui/Div";
import PageHeading from "@/app/ui/PageHeading";
import Spacing from "@/app/ui/Spacing";
import { Icon } from "@iconify/react";

export default function FaqPage() {
  return (
    <>
      <PageHeading
        title="Häufig gestellte Fragen"
        bgSrc="/images/about_hero_bg.jpeg"
        pageLinkText="FAQ"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-4">
            <Div className="cs-faq_nav cs-radius_15">
              <h2 className="cs-faq_nav_title cs-m0">FAQ Kategorien</h2>
              <Div className="cs-height_30 cs-height_lg_30" />
              <ul className="cs-list cs-style1 cs-mp0">
                <li>
                  <Button
                    variant="cs-type2"
                    btnLink="/faq"
                    btnText="Behandlungsmethoden"
                    icon={
                      <Icon icon="material-symbols:content-copy-outline-rounded" />
                    }
                  />
                </li>
                <li>
                  <Button
                    variant="cs-type2"
                    btnLink="/faq"
                    btnText="Kosten & Finanzierung"
                    icon={
                      <Icon icon="material-symbols:content-copy-outline-rounded" />
                    }
                  />
                </li>
                <li>
                  <Button
                    variant="cs-type2"
                    btnLink="/faq"
                    btnText="Nachsorge & Heilung"
                    icon={
                      <Icon icon="material-symbols:content-copy-outline-rounded" />
                    }
                  />
                </li>
                <li>
                  <Button
                    variant="cs-type2"
                    btnLink="/faq"
                    btnText="Allgemeine Fragen"
                    icon={
                      <Icon icon="material-symbols:content-copy-outline-rounded" />
                    }
                  />
                </li>
              </ul>
            </Div>
          </Div>
          <Div className="col-lg-7 offset-lg-1">
            <Spacing lg="0" md="40" />
            <Accordion />
          </Div>
        </Div>
      </Div>
      <Spacing lg="150" md="80" />
      {/* Start CTA Section */}
      <Div className="container">
        <Cta
          title="Haben Sie weitere Fragen? <br />Lassen Sie uns <i>sprechen</i>"
          btnText="Beratung buchen"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}