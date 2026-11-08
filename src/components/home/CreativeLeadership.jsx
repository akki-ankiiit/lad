import { founder } from "../../data/studio";

/**
 * Founder section — markup and styles restored from the original live site
 * (section.studio-founders), with the official biography from the About page.
 */
export default function CreativeLeadership() {
  return (
    <section className="section clip studio-founders">
      <div className="container">
        <div className="founders_intro">
          <p data-scroll-reveal="p" className="l1 a-center">
            Creative leadership
          </p>
          <div className="u-24" />
          <h2 data-scroll-reveal="h" className="h2 a-center">
            Creative vision
            <span className="founders_intro_a">Architectural excellence</span>
          </h2>
          <div className="u-48" />
          <p data-scroll-reveal="p" className="p1 a-center founders_intro_lead">
            The work of Luxury Antonovich Design is carried out under the
            guidance of Katrina and Elena Antonovich — bringing together
            architecture, interior design, furniture and turnkey execution.
          </p>
        </div>
        <div className="founders_list">
          <article className="founder">
            <figure className="founder_media">
              <div data-scroll-reveal="slide" className="img-w founder_img">
                <img
                  width="1202"
                  height="1800"
                  loading="lazy"
                  decoding="async"
                  alt="Katrina Antonovich, CEO, Chief Designer, Architect and Engineer of Luxury Antonovich Design"
                  className="img"
                  src="/assets/antonovich/team/katrina-antonovich-portrait-01.webp"
                />
              </div>
            </figure>
            <div className="founder_body">
              <p data-scroll-reveal="p" className="l1 founder_role">
                {founder.role}
              </p>
              <h3 data-scroll-reveal="h" className="h4 founder_name">
                {founder.name}
              </h3>
              <div className="founder_rule">
                <div data-scroll-reveal="line" className="line-h" />
              </div>
              <p data-scroll-reveal="p" className="p1 founder_bio">
                {founder.bio[0]}
              </p>
              <blockquote data-scroll-reveal="p" className="founder_quote">
                “Turnkey projects to prime residential, commercial sectors,
                palaces and high-profile residences.”
              </blockquote>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
