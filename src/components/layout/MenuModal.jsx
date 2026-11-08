import BrandMark from "./BrandMark";
import { menuLinks } from "../../data/navigation";
/** Full-screen menu. `current` marks the active route. */
export default function MenuModal({ current = "/" }) {
  return (
    <div data-modal-menu="mob" className="modal menu theme_on-dark">
      <div className="modal_c">
        <div data-modal-container="" className="modal_menu">
          <div className="modal_menu_t">
            <div className="u-48 b-desk" />
            <div className="u-272 b-mob" />
            <div className="grid">
              <div className="modal_menu_title">
                <div className="modal_menu_a">
                  <div data-part="a" className="a1 a-center">
                    The
                  </div>
                </div>
                <div data-part="h" className="h1 a-center">
                  Menu
                </div>
              </div>
            </div>
          </div>
          <div className="modal_menu_c">
            <div className="grid">
              <div className="modal_menu_list">
                {menuLinks.map((link) => (
                  <a
                    key={link.label}
                    data-part="ctn"
                    aria-label={link.label}
                    hover-link=""
                    data-modal-close="mob"
                    {...(link.cta
                      ? { "data-modal-cta-btn": "book-a-call" }
                      : {})}
                    href={link.href}
                    {...(link.href === current
                      ? { "aria-current": "page" }
                      : {})}
                    className={`link w-inline-block${link.href === current ? " w--current" : ""}`}
                  >
                    <div className="link_label">
                      <div className="link_label_text">
                        <div hover="text" className="h6">
                          {link.label}
                        </div>
                      </div>
                      <div className="link_label_text is-2">
                        <div hover="text" className="h6">
                          {link.label}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="modal_menu_b">
            <div className="s_logo">
              <div data-part="ctn" className="logo_symbol ico-48">
                <div className="logo w-embed">
                  <BrandMark />
                </div>
              </div>
            </div>
            <div className="u-48" />
          </div>
        </div>
      </div>
      <div data-modal-close="" data-modal-over="" className="modal_bg" />
    </div>
  );
}
