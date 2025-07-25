'use client';

import Div from "@/app/ui/Div";
import Spacing from "@/app/ui/Spacing";
import { Icon } from "@iconify/react";

export default function CommentForm() {
  return (
    <>
      {/* Start Comment Section */}
      <Spacing lg='30' md='30'/>
      <h2 className="cs-font_50 cs-m0">Kommentar hinterlassen</h2>
      <Spacing lg='5' md='5'/>
      <p className="cs-m0">Ihre E-Mail-Adresse wird nicht veröffentlicht. Erforderliche Felder sind markiert *</p>
      <Spacing lg='40' md='30'/>
      <form className="row">
        <Div className="col-lg-6">
          <label>Vollständiger Name*</label>
          <input type="text" className="cs-form_field" />
          <Div className="cs-height_20 cs-height_lg_20" />
          <Div data-lastpass-icon-root="true" style={{position: 'relative !important', height: '0px !important', width: '0px !important', float: 'left !important'}} />
        </Div>
        <Div className="col-lg-6">
          <label>E-Mail*</label>
          <input type="text" className="cs-form_field" />
          <Div className="cs-height_20 cs-height_lg_20" />
        </Div>
        <Div className="col-lg-12">
          <label>Website*</label>
          <input type="text" className="cs-form_field" />
          <Div className="cs-height_20 cs-height_lg_20" />
        </Div>
        <Div className="col-lg-12">
          <label>Ihr Kommentar*</label>
          <textarea cols={30} rows={7} className="cs-form_field" />
          <Div className="cs-height_25 cs-height_lg_25" />
        </Div>
        <Div className="col-lg-12">
          <button className="cs-btn cs-style1">
            <span>Kommentar senden</span>
            <Icon icon="bi:arrow-right" />               
          </button>
        </Div>
      </form>
      {/* End Comment Section */}
    </>
  );
}