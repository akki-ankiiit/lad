import FlowerVideo from "../media/FlowerVideo";
/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function Architecture() {
  return (
    <section className="section clip">
      <div className="container">
        <div data-video-playpause="" className="arch-scroll-area">
          <div className="arch-intro-s b-desk">
            <div className="w_bg">
              <div className="arch-intro-s_bg_l" />
              <div className="arch-intro-s_bg_r">
                <div className="w-embed" />
              </div>
              <div className="flower arch-intro-l">
                <FlowerVideo variant="05" />
              </div>
              <div className="flower arch-intro-r">
                <FlowerVideo variant="07" />
              </div>
            </div>
          </div>
          <div className="arch-w theme_on-color">
            <div className="arch-s">
              <div className="arch-s_t">
                <div className="u-48" />
                <h2 data-text="h" data-fit-text="" className="h1 a-center">
                  Bespoke
                </h2>
                <div className="u-32" />
                <div className="grid">
                  <div className="arch-s_desc">
                    <p data-text="p" className="l1 a-center" />
                  </div>
                </div>
              </div>
              <div className="arch-s_b">
                <div className="grid">
                  <div className="arch-s_quote w-clearfix">
                    <div className="red-line" />
                    <h3 data-part="p" className="h5">
                      Crafted to belong. Designed to last. Furniture, lighting,
                      curtains and decor of own production — created to
                      complement the architecture and character of each project.
                    </h3>
                    <div className="u-64" />
                    <div className="grid _4-columns">
                      <div className="arch-s_author">
                        <div data-part="p" className="l1">
                          Furniture production
                        </div>
                        <div data-part="p" className="l1 reg">
                          Showroom · Jumeirah, Dubai
                        </div>
                      </div>
                    </div>
                    <div className="u-160 b-desk" />
                  </div>
                  <div data-part="ctn" className="arch-s_btn b-desk">
                    <div
                      data-modal-cta-btn="book-a-call"
                      data-magnetic-btn=""
                      hover-nav-item-trigger=""
                      hover-btn-circle=""
                      className="btn-circle"
                    >
                      <div data-magnetic-inner="" className="btn-circle_label">
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
                <div className="u-96" />
              </div>
            </div>
            <div className="w_bg">
              <div data-desk="off" data-parallax="w" className="img-w">
                <img
                  className="img"
                  src="/assets/antonovich/miscellaneous/antonovich-services-12.webp"
                  alt="Bespoke sofa and carpet from the Luxury Antonovich Design furniture collection"
                  data-parallax="img"
                  loading="eager"
                />
                <div className="img-over-grad bot _100vh" />
                <div className="img-over-grad bot _100vh" />
              </div>
            </div>
          </div>
          <div className="_100vh b-desk" />
          <div className="_100vh b-desk" />
          <div className="arch_themes">
            <div data-bg="light" className="arch_themes_light b-desk" />
            <div data-bg="color" className="arch_themes_color" />
          </div>
        </div>
      </div>
    </section>
  );
}
