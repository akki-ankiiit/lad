import { services } from "../../data/studio";
/** Services — the complete design ecosystem, in the original amenities tabs. */
export default function Amenities() {
  return (
    <div id="services" className="amen-scroll-area">
      <div className="scroll-area_screen">
        <section className="section clip theme_on-color">
          <div className="container">
            <div className="amen-w">
              <div className="amen-s">
                <div
                  data-tabs-hilight="ver"
                  data-tabs=""
                  className="amen-s_cms"
                >
                  <div className="amen-cms w-dyn-list">
                    <div role="list" className="amen-cms_list w-dyn-items">
                      {services.map((item, i) => (
                        <div
                          key={item.id || i}
                          data-reveal-first=""
                          data-tab-content={item.id}
                          role="listitem"
                          className="amen-cms_list_item w-dyn-item"
                        >
                          <div data-parallax="w" className="amen-slide">
                            <div className="amen-slide_b">
                              <div className="grid">
                                <div className="amen-slide_title">
                                  <h3
                                    data-scroll-reveal="p"
                                    data-tab="p"
                                    className="l1"
                                  >
                                    {item.title}
                                  </h3>
                                  <div className="u-32" />
                                </div>
                                <div className="amen-slide_desc w-clearfix">
                                  <div className="red-line" />
                                  <h4
                                    data-scroll-reveal="p"
                                    data-tab="p"
                                    className="h5"
                                  >
                                    {item.text}
                                  </h4>
                                </div>
                              </div>
                              <div className="u-48" />
                            </div>
                            <div className="amen-slide_img">
                              <div data-tab="slide" className="img-w">
                                <div className="img-w">
                                  <img
                                    data-parallax="img-in"
                                    loading={i ? "lazy" : "eager"}
                                    alt={item.alt}
                                    src={item.image}
                                    className="img-p"
                                  />
                                </div>
                                <div className="img-over-grad from-top" />
                                <div className="img-over-grad from-bot _4x bot" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="amm-s_cms_tabs-w">
                    <div className="grid">
                      <div className="amm-s_cms_tabs">
                        <div className="amen-tabs-cms w-dyn-list">
                          <div
                            role="list"
                            className="amen-tabs-cms_list w-dyn-items"
                          >
                            {services.map((item, i) => (
                              <div
                                key={item.id || i}
                                role="listitem"
                                className="amen-tabs-cms_list_item w-dyn-item"
                              >
                                <div
                                  data-tab=""
                                  data-tab-trigger={item.id}
                                  className="amen-tab"
                                >
                                  <div data-scroll-reveal="p" className="h5">
                                    {item.title}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div
                          data-scroll-reveal="line"
                          className="amm-s_cms_tabs_line"
                        >
                          <div
                            data-tab-hilight=""
                            className="amm-s_cms_tabs_line_hilight"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="amm-s_cms_btn-w b-desk">
                    <div className="grid">
                      <div data-scroll-reveal="ctn" className="amm-s_cms_btn">
                        <div
                          data-modal-cta-btn="book-a-call"
                          data-magnetic-btn=""
                          hover-nav-item-trigger=""
                          hover-btn-circle=""
                          className="btn-circle"
                        >
                          <div
                            data-magnetic-inner=""
                            className="btn-circle_label"
                          >
                            <a
                              hover-nav-item=""
                              aria-label="Inquire now"
                              href="#"
                              className="nav-item w-inline-block"
                            >
                              <div className="nav-item_label">
                                <div className="nav-item_label_text">
                                  <div hover="text" className="l1">
                                    Inquire now
                                  </div>
                                </div>
                                <div className="nav-item_label_text is-2">
                                  <div hover="text" className="l1">
                                    Inquire now
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div className="btn-circle_bg w-embed">
                            <svg
                              data-circle=""
                              viewBox="0 0 208 208"
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                            >
                              <circle
                                data-arc=""
                                cx={104}
                                cy={104}
                                r="103.5"
                                stroke="currentColor"
                                strokeWidth={1}
                                fill="none"
                                transform="rotate(-150 104 104)"
                              />
                              <circle
                                data-arc=""
                                cx={104}
                                cy={104}
                                r="103.5"
                                stroke="currentColor"
                                strokeWidth={1}
                                fill="none"
                                transform="rotate(30 104 104)"
                              />
                              <circle
                                cx={104}
                                cy={104}
                                r="103.5"
                                stroke="var(--_colors---base-1000--line)"
                                strokeWidth={1}
                                fill="none"
                              />
                            </svg>
                          </div>
                          <a
                            aria-label="Inquire now"
                            href="#"
                            className="btn-circle_link w-inline-block"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="hero_themes">
        <div data-bg="color" className="hero_themes_color" />
        <div data-bg="light" className="hero_themes_light" />
      </div>
    </div>
  );
}
