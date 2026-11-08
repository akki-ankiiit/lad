import BrandMark from "../layout/BrandMark";
import FlowerVideo from "../media/FlowerVideo";
/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function ConceptAndLocation() {
  return (
    <section
      id="about"
      data-bg="light"
      data-slow-scroll=""
      className="section clip"
    >
      <div className="container loc">
        <div
          data-video-playpause=""
          data-scroll-horizontal=""
          className="loc-scroll-area"
        >
          <div className="loc-scroll-area_screen">
            <div className="loc-scroll-area_track">
              <div data-parallax="w" className="loc-info-w">
                <div data-parallax="img-in" className="loc-info-s">
                  <div className="loc-info-s_t">
                    <div className="u-48" />
                    <div className="u-160 b-mob" />
                  </div>
                  <div className="loc-info-s_c">
                    <div className="grid">
                      <div className="s_title">
                        <h2 data-part="p" className="l1 a-center">
                          The company
                        </h2>
                      </div>
                    </div>
                    <div className="u-32 b-desk" />
                    <div className="u-160 b-mob" />
                    <div className="grid">
                      <div className="info-s_lead">
                        <h3 data-part="p" className="h4 a-center">
                          Creating extraordinary spaces through vision and
                          precision
                        </h3>
                      </div>
                    </div>
                    <div className="u-96 b-mob" />
                  </div>
                  <div className="loc-info-s_b">
                    <div className="grid">
                      <div className="info-s_desc">
                        <p data-part="p" className="p1 a-center">
                          Luxury Antonovich Design is an international
                          architecture and interior design company delivering
                          comprehensive solutions for distinguished residential,
                          commercial and hospitality projects. Under the
                          creative leadership of Katrina Antonovich, the company
                          brings together architecture, interior design,
                          engineering, furniture production and construction
                          expertise.
                        </p>
                        <div className="u-32" />
                        <div className="s_logo">
                          <div data-part="ctn" className="logo_symbol ico-48">
                            <div className="logo w-embed">
                              <BrandMark />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="u-48" />
                  </div>
                </div>
                <div data-parallax="ctn-down" className="flower loc-info">
                  <FlowerVideo variant="01" />
                </div>
              </div>
              <div className="loc-intro-w">
                <div className="loc-intro-s">
                  <div className="u-48 b-desk" />
                  <div className="u-160 b-mob" />
                  <div className="grid _13-columns fill">
                    <div className="loc-intro-s_cap">
                      <h4 data-scroll-reveal="h" className="c1 a-center">
                        Global
                      </h4>
                    </div>
                    <div className="loc-intro-s_title">
                      <h3 data-scroll-reveal="h" className="h1">
                        <span className="loc-intro-s_title_line is-1">
                          Design{" "}
                        </span>
                        <span className="loc-intro-s_title_line is-2 mob_a-right">
                          Without{" "}
                        </span>
                        <span className="loc-intro-s_title_line">Borders</span>
                      </h3>
                    </div>
                    <div className="loc-intro-s_img">
                      <div className="u-32 b-mob" />
                      <div data-scroll-reveal="slide" className="img-w">
                        <img
                          loading="eager"
                          src="/assets/antonovich/hospitality/top-hotel-design-01.webp"
                          alt="Luxury hotel courtyard and swimming pool designed by Luxury Antonovich Design"
                          className="img"
                        />
                      </div>
                    </div>
                    <div className="loc-intro-s_desc">
                      <div className="u-32 b-mob" />
                      <h3 data-scroll-reveal="p" className="h5">
                        Headquartered in Dubai, Miami and Riyadh.
                      </h3>
                      <div className="u-16" />
                      <p data-scroll-reveal="p" className="p1">
                        Luxury Antonovich Design brings architectural and
                        interior design expertise to projects across
                        international markets — the Middle East, the United
                        States, Europe including the United Kingdom and Russia,
                        Africa and China — combining global design perspectives
                        with an understanding of local requirements.
                      </p>
                      <div className="u-96 b-mob" />
                    </div>
                    <div data-scroll-reveal="ctn" className="loc-intro-s_btn">
                      <div
                        hover-btn-circle=""
                        data-magnetic-btn=""
                        hover-nav-item-trigger=""
                        className="btn-circle"
                      >
                        <div
                          data-magnetic-inner=""
                          className="btn-circle_label"
                        >
                          <a
                            hover-nav-item=""
                            aria-label="Explore our projects"
                            href="/projects"
                            className="nav-item w-inline-block"
                          >
                            <div className="nav-item_label">
                              <div className="nav-item_label_text">
                                <div hover="text" className="l1">
                                  Explore our projects
                                </div>
                              </div>
                              <div className="nav-item_label_text is-2">
                                <div hover="text" className="l1">
                                  Explore our projects
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
                          aria-label="Explore our projects"
                          href="/projects"
                          className="btn-circle_link w-inline-block"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="u-48" />
                </div>
                <div className="flower loc-intro">
                  <FlowerVideo variant="02" />
                </div>
              </div>
              <div className="loc-path-w">
                <div className="loc-path-s">
                  <div className="loc-path-s_t">
                    <div className="u-48 b-desk" />
                    <div className="u-160 b-mob" />
                  </div>
                  <div className="loc-path-s_c">
                    <div className="grid">
                      <div className="loc-path-s_title">
                        <h2 className="h3 a-center">
                          <span
                            data-scroll-reveal="h"
                            className="loc-path-s_title_line"
                          >
                            From vision{" "}
                          </span>
                          <span
                            data-scroll-reveal="a"
                            className="loc-path-s_title_a a2"
                          >
                            to reality{" "}
                          </span>
                          <span
                            data-scroll-reveal="h"
                            className="loc-path-s_title_line"
                          >
                            one integrated journey
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="loc-path-s_b">
                    <div className="u-48 b-mob" />
                    <div className="grid">
                      <div className="loc-path-s_path scrollbar-none">
                        <div className="loc-path-s_path_c">
                          <img
                            loading="eager"
                            src="/assets/studio/process-path.svg"
                            alt=""
                            className="img loc-path"
                          />
                          <img
                            data-scroll-reveal="ctn"
                            loading="eager"
                            alt="01 Consultation, 02 Concept development, 03 Architecture & engineering, 04 Interior design, 05 Production & procurement, 06 Construction & fit-out, 07 Final styling & handover"
                            src="/assets/studio/process-labels.svg"
                            className="img h-auto"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="u-48" />
                  </div>
                </div>
                <div className="loc-path-w_flower">
                  <div className="flower loc-path">
                    <FlowerVideo variant="03" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div data-slow-scroll="" className="slow-scroll-trigger" />
        </div>
      </div>
    </section>
  );
}
