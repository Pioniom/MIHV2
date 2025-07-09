'use client';
import { useEffect, useState } from 'react';
import Div from '../Div';
import Link from 'next/link';
import DropDown from './DropDown';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import Newsletter from '../Widget/Newsletter';
import SocialWidget from '../Widget/SocialWidget';

export default function Header({ variant }) {
  const [isSticky, setIsSticky] = useState(false);
  const [sideHeaderToggle, setSideHeaderToggle] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  }, []);

  return (
    <>
      <header
        className={`cs-site_header cs-style1 text-uppercase ${
          variant ? variant : ''
        } cs-sticky_header ${isSticky ? 'cs-sticky_header_active' : ''}`}
      >
        <Div className="cs-main_header">
          <Div className="container">
            <Div className="cs-main_header_in">
              <Div className="cs-main_header_left">
                <Link className="cs-site_branding" href="/">
                  <img src="/images/logo.webp" alt="Logo" />
                </Link>
              </Div>
              <Div className="cs-main_header_center">
                <Div className="cs-nav cs-primary_font cs-medium">
                  <ul
                    className="cs-nav_list"
                    style={{ display: `${mobileToggle ? 'block' : 'none'}` }}
                  >
                    <li>
                      <Link href="/" onClick={() => setMobileToggle(false)}>
                        Startseite
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        onClick={() => setMobileToggle(false)}
                      >
                        Über uns
                      </Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileToggle(false);
                        }}
                      >
                        Behandlungen
                      </Link>
                      <DropDown>
                        <ul>
                          <li>
                            <Link
                              href="/service/fue-saphir"
                              onClick={() => setMobileToggle(false)}
                            >
                              FUE Saphir
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/service/dhi"
                              onClick={() => setMobileToggle(false)}
                            >
                              DHI
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/service/prp"
                              onClick={() => setMobileToggle(false)}
                            >
                              PRP Therapie
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/service/smp"
                              onClick={() => setMobileToggle(false)}
                            >
                              SMP Mikropigmentierung
                            </Link>
                          </li>
                        </ul>
                      </DropDown>
                    </li>
                    <li className="menu-item-has-children">
                      <Link
                        href="/portfolio"
                        onClick={() => setMobileToggle(false)}
                      >
                        Galerie
                      </Link>
                      <DropDown>
                        <ul>
                          <li>
                            <Link
                              href="/portfolio/vorher-nachher-fue"
                              onClick={() => setMobileToggle(false)}
                            >
                              Vorher-Nachher FUE
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/portfolio/dhi-ergebnis"
                              onClick={() => setMobileToggle(false)}
                            >
                              DHI Ergebnis
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/portfolio/natuerliche-haarlinie"
                              onClick={() => setMobileToggle(false)}
                            >
                              Natürliche Haarlinie
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/portfolio/vollstaendige-abdeckung"
                              onClick={() => setMobileToggle(false)}
                            >
                              Vollständige Abdeckung
                            </Link>
                          </li>
                        </ul>
                      </DropDown>
                    </li>
                    <li>
                      <Link href="/blog" onClick={() => setMobileToggle(false)}>
                        Ratgeber
                      </Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link href="/" onClick={() => setMobileToggle(false)}>
                        Unternehmen
                      </Link>
                      <DropDown>
                        <ul>
                          <li>
                            <Link
                              href="/contact"
                              onClick={() => setMobileToggle(false)}
                            >
                              Kontakt
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/case-study/case-study-details"
                              onClick={() => setMobileToggle(false)}
                            >
                              Fallstudien Details
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/faq"
                              onClick={() => setMobileToggle(false)}
                            >
                              FAQ
                            </Link>
                          </li>
                        </ul>
                      </DropDown>
                    </li>
                  </ul>
                  <span
                    className={
                      mobileToggle
                        ? 'cs-munu_toggle cs-toggle_active'
                        : 'cs-munu_toggle'
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                </Div>
              </Div>
              <Div className="cs-main_header_right">
                <Div className="cs-toolbox">
                  <span
                    className="cs-icon_btn"
                    onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
                  >
                    <span className="cs-icon_btn_in">
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                  </span>
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </header>

      <Div
        className={
          sideHeaderToggle ? 'cs-side_header active' : 'cs-side_header'
        }
      >
        <button
          className="cs-close"
          onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
        />
        <Div
          className="cs-side_header_overlay"
          onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
        />
        <Div className="cs-side_header_in">
          <Div className="cs-side_header_shape" />
          <Link className="cs-site_branding" href="/">
            <img src="/images/logo.webp" alt="Logo" />
          </Link>
          <Div className="cs-side_header_box">
            <h2 className="cs-side_header_heading">
              Benötigen Sie eine <br /> Haartransplantation? Kontaktieren Sie uns.
            </h2>
          </Div>
          <Div className="cs-side_header_box">
            <ContactInfoWidget title="Contact Us" withIcon />
          </Div>
          <Div className="cs-side_header_box">
            <Newsletter
              title="Subscribe"
              subtitle="At vero eos et accusamus et iusto odio as part dignissimos ducimus qui blandit."
              placeholder="example@gmail.com"
            />
          </Div>
          <Div className="cs-side_header_box">
            <SocialWidget />
          </Div>
        </Div>
      </Div>
    </>
  );
}
