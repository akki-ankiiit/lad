import StudioLayout from "../components/layout/StudioLayout";
import { studio } from "../data/studio";

export default function LegalPage({ type }) {
  const privacy = type === "privacy";
  return (
    <StudioLayout showCta={false} breadcrumb="Luxury Antonovich Design">
      <section className="section studio-legal">
        <div className="container">
          <p className="l2">Luxury Antonovich Design</p>
          <h1 className="h2">{privacy ? "Privacy" : "Terms of use"}</h1>
          {privacy ? (
            <>
              <p>
                When you contact Luxury Antonovich Design, the information you
                choose to share — your name, contact details, project location
                and description — is used only to respond to your inquiry.
              </p>
              <p>
                Your cookie preference is stored in your browser. This website
                does not add advertising or analytics trackers. Fonts are
                delivered by Adobe Fonts.
              </p>
              <p>
                If an online inquiry service is not configured, the inquiry form
                opens your own email application addressed to {studio.email};
                nothing is sent until you choose to send it.
              </p>
            </>
          ) : (
            <>
              <p>
                Project names, locations, descriptions and photography are
                presented as published on antonovich-design.com. Where
                information is not published, it is not stated here.
              </p>
              <p>
                Design scope, fees, timelines and deliverables are agreed
                separately in a written proposal for each project and region.
              </p>
              <p>
                All photography, renderings and other materials remain the
                property of Luxury Antonovich Design and their respective
                owners.
              </p>
            </>
          )}
          <a className="h5" href="/contact">
            Contact us ↗
          </a>
        </div>
      </section>
    </StudioLayout>
  );
}
