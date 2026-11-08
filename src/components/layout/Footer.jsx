import BrandMark from "./BrandMark";
import { offices, socials, studio } from "../../data/studio";
import { footerLinks } from "../../data/navigation";
/** Footer with regional offices, site links and official social profile. */
export default function Footer({ toTop = true }) {
  return (
    <section data-bg="dark" className="section theme_on-dark">
      <div className="container">
        <div className="footer-w">
          {toTop && (
            <a href="#hero" className="footer-s_s-top w-inline-block">
              <div className="l2">To top</div>
              <div className="s-down_arrow w-embed">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 48 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M40.6345 9C40.8959 8.45299 41.1486 7.97436 41.3926 7.56411C41.6541 7.15385 41.9068 6.81197 42.1508 6.53846L2.99981 6.53846L2.99981 5.46154L42.1508 5.46154C41.9068 5.17094 41.6541 4.82051 41.3926 4.41026C41.1486 4 40.8959 3.52992 40.6345 3L41.5495 3C42.6475 4.24787 43.7979 5.17094 45.0005 5.76923L45.0005 6.23077C43.7979 6.81197 42.6475 7.73504 41.5495 9L40.6345 9Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </a>
          )}
          <div className="footer-s">
            <div className="footer-s_t" />
            <div className="footer-s_c">
              <div className="grid">
                <div className="footer-s_contact">
                  <div className="s_logo">
                    <div data-text="ctn" className="logo_symbol ico-64">
                      <div className="logo w-embed">
                        <BrandMark />
                      </div>
                    </div>
                  </div>
                  <div className="u-32" />
                  <div className="contact-cms w-dyn-list">
                    <div role="list" className="contact-cms_list w-dyn-items">
                      <div
                        role="listitem"
                        className="contact-cms_list_item w-dyn-item"
                      >
                        <a
                          href={studio.phoneHref}
                          target="_blank"
                          className="nav-item w-inline-block"
                          rel="noopener noreferrer"
                        >
                          <div data-text="h" className="h2 a-center">
                            {studio.phone}
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="u-48" />
                </div>
                <div className="footer-s_address">
                  <div className="loc-cms w-dyn-list">
                    <div role="list" className="loc-cms_list w-dyn-items">
                      {offices.map((item, i) => (
                        <div
                          key={item.id || i}
                          data-text="ctn"
                          role="listitem"
                          className="loc-cms_list_item w-dyn-item"
                        >
                          <h3 className="l1 reg a-center">{item.region}</h3>
                          <div className="u-4" />
                          <a
                            hover-nav-item=""
                            aria-label={`${item.region} — ${item.address.join(", ")}`}
                            href={item.map}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-item w-inline-block"
                          >
                            <div className="nav-item_label">
                              <div className="nav-item_label_text">
                                <div hover="text" className="l1">
                                  {item.address[0]}
                                </div>
                              </div>
                              <div className="nav-item_label_text is-2">
                                <div hover="text" className="l1">
                                  {item.address[0]}
                                </div>
                              </div>
                            </div>
                          </a>
                          <div className="u-4" />
                          <a
                            hover-nav-item=""
                            aria-label={`Email ${item.region}`}
                            href={`mailto:${item.email}`}
                            className="nav-item w-inline-block"
                          >
                            <div className="nav-item_label">
                              <div className="nav-item_label_text">
                                <div hover="text" className="l1 reg">
                                  {item.email}
                                </div>
                              </div>
                              <div className="nav-item_label_text is-2">
                                <div hover="text" className="l1 reg">
                                  {item.email}
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-s_b">
              <div className="grid">
                <div className="footer-s_info">
                  <div data-text="p" className="l1">
                    Luxury Antonovich Design.
                  </div>
                  <div data-text="p" className="l1 reg no-wrap">
                    ©<span className="year">2026</span> All rights reserved
                  </div>
                  <div data-text="p" className="l1 reg">
                    {studio.descriptor}
                  </div>
                  <div className="u-12" />
                  <div data-text="p" className="legal-cms w-dyn-list">
                    <div
                      data-comma-list=""
                      role="list"
                      className="legal-cms_list w-dyn-items"
                    >
                      {footerLinks.map((item, i) => (
                        <div
                          key={item.id || i}
                          role="listitem"
                          className="legal-cms_list_item w-dyn-item"
                        >
                          <a
                            hover-nav-item=""
                            aria-label={item.label}
                            href={item.href}
                            className="nav-item w-inline-block"
                          >
                            <div className="nav-item_label">
                              <div className="nav-item_label_text">
                                <div hover="text" className="l1">
                                  {item.label}
                                </div>
                              </div>
                              <div className="nav-item_label_text is-2">
                                <div hover="text" className="l1">
                                  {item.label}
                                </div>
                              </div>
                            </div>
                          </a>
                          <div data-comma="" className="l1">
                            ,
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="footer-s_credits">
                  <div hover-nav-item-trigger="" className="credits">
                    <a
                      aria-label="Luxury Antonovich Design on Instagram"
                      href={socials[0].href}
                      target="_blank"
                      className="credits_link w-inline-block"
                      rel="noopener noreferrer"
                    />
                    <div
                      data-text="ctn"
                      data-scrub-reveal="ctn"
                      className="credits_logo-w"
                    >
                      <div className="studio-credit-mark" aria-hidden="true">
                        LAD
                      </div>
                    </div>
                    <div className="u-12" />
                    <div data-text="p" className="l1 reg a-right">
                      Follow us on
                    </div>
                    <div data-text="p">
                      <a
                        hover-nav-item=""
                        aria-label="Instagram"
                        href={socials[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-item w-inline-block"
                      >
                        <div className="nav-item_label">
                          <div className="nav-item_label_text">
                            <div hover="text" className="l1">
                              Instagram
                            </div>
                          </div>
                          <div className="nav-item_label_text is-2">
                            <div hover="text" className="l1">
                              Instagram
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="u-48" />
            </div>
          </div>
          <div className="footer-w_bg" />
        </div>
      </div>
    </section>
  );
}
