const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function ProjectCard({ project, eager = false }) {
  return (
    <div
      data-filter-item=""
      data-sort-item=""
      role="listitem"
      className="apart-cms_list_item"
    >
      <a
        href={`/projects/${project.slug}`}
        hover-apart-card=""
        hover-img-card=""
        data-sort-relevant={project.number}
        className="apart-card portfolio-card"
      >
        <div className="apart-card_c">
          <div className="apart-card_t">
            <p data-type={project.category} className="l2 a-center">
              {project.categoryLabel}
            </p>
            <div className="u-4" />
            <p
              data-city={project.location ? slug(project.location) : ""}
              className="l2 reg a-center"
            >
              {project.location || project.discipline}
            </p>
          </div>
          <div className="u-24" />
          <div className="portfolio-card-image">
            <img
              hover="img"
              src={project.image}
              alt={project.alt}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
          <div className="u-24" />
          <div className="apart-card_b">
            <h2
              data-sort-name={project.name.toLowerCase()}
              className="h5 a-center portfolio-card-title"
            >
              {project.name}
            </h2>
            <div className="u-16" />
            <div className="apart-card_data-list">
              <span className="l2 reg">{project.discipline}</span>
            </div>
            <div className="u-16" />
            <p className="l2 reg a-center">
              View project <span aria-hidden="true">↗</span>
            </p>
          </div>
        </div>
        <div className="portfolio-card-frame" />
        <div hover="shadow" className="apart-card_shadow" />
      </a>
    </div>
  );
}
