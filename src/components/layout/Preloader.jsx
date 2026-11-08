import BrandMark from "./BrandMark";
/** Migrated reference markup. Interactions are managed by useSiteExperience. */
export default function Preloader() {
  return (
    <div data-preloader="" className="preloader theme_on-dark">
      <div className="preloader_ctn">
        <div className="preloader_t">
          <div className="u-48" />
          <div className="s_logo">
            <div data-part="ctn" className="logo_symbol ico-48">
              <div className="logo w-embed">
                <BrandMark />
              </div>
            </div>
          </div>
        </div>
        <div className="preloader_c">
          <div className="grid">
            <div className="preloader_title-l">
              <div data-part="h" className="c1 a-center">
                Architecture
              </div>
            </div>
            <div className="preloader_logo">
              <div data-part="h" className="h3 a-center">
                Luxury
                <br />
                Antonovich
              </div>
              <div className="preloader_logo_a">
                <div data-part="a" className="a2 preloader_a a-center">
                  Design
                </div>
              </div>
            </div>
            <div className="preloader_title-r">
              <div data-part="h" className="c1 a-center">
                Interiors
              </div>
            </div>
          </div>
        </div>
        <div className="preloader_b">
          <div className="grid">
            <div className="s_title">
              <div data-part="line" className="preloader_progress">
                <div className="preloader_progress_fill">
                  <div className="preloader_progress_track" />
                </div>
              </div>
              <div className="u-32" />
              <p data-part="p" className="l1 a-center">
                Luxury Antonovich Design
                <br />
                Where architecture becomes art.
              </p>
            </div>
          </div>
          <div className="u-48" />
        </div>
      </div>
      <div className="preloader_bg_arch">
        <div className="preloader_bg_arch_is-1" />
        <div className="preloader_bg_arch_is-2" />
      </div>
      <div className="preloader_bg">
        <div className="preloader_bg_a">
          <img
            src="/assets/images/preloader-bg.svg"
            loading="eager"
            alt=""
            className="img"
          />
        </div>
        <div className="preloader_bg_decor">
          <div className="decor">
            <div className="frame_l-tb w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_lt w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_t-lr w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_rt w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_r-tb w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="50%"
                  y1="0%"
                  x2="50%"
                  y2="100%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_rb w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_b-lr w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="frame_lb w-embed">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                  strokeWidth={1}
                  stroke="currentColor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
