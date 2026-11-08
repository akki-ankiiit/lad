import { projects, projectTypes } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import FlowerVideo from "../media/FlowerVideo";

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
export default function Portfolio() {
  const locations = [
    { value: "*", label: "All locations" },
    ...[...new Set(projects.map((project) => project.location).filter(Boolean))]
      .sort()
      .map((location) => ({ value: slug(location), label: location })),
  ];
  return (
    <section data-bg="light" className="section clip">
      <div className="container">
        <div className="apart-w">
          <div className="apart-s">
            <div className="u-48" />
            <div className="u-272" />
            <div className="grid">
              <div data-sort="" data-filter="" className="apart-s_cms">
                <div className="apart-s_title">
                  <h1 data-scroll-reveal="h" className="h1">
                    Our works
                  </h1>
                  <div data-filter-count="" className="h1 b-desk">
                    {projects.length}
                  </div>
                </div>
                <div className="u-24" />
                <p className="p1 portfolio-intro">
                  Authentic residential, commercial, hospitality and
                  architectural projects by Luxury Antonovich Design — from
                  grand villas and palace-inspired interiors to hotels,
                  restaurants, offices and landscapes.
                </p>
                <div className="u-32" />
                <div className="apart-s_cms_filter">
                  <div className="apart-s_cms_filter_c">
                    <div className="grid _9-columns">
                      <ProjectFilter
                        label="Category"
                        group="type"
                        options={projectTypes}
                      />
                      <ProjectFilter
                        label="Location"
                        group="city"
                        options={locations}
                      />
                      <ProjectFilter
                        label="Sort"
                        sorting
                        options={[
                          {
                            value: "relevant",
                            label: "Selected",
                          },
                          {
                            value: "name",
                            label: "Name: A to Z",
                          },
                          {
                            value: "name",
                            order: "desc",
                            label: "Name: Z to A",
                          },
                        ]}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    data-reset=""
                    className="studio-reset l2"
                  >
                    Reset
                  </button>
                </div>
                <div className="u-16" />
                <div data-scroll-reveal="ctn" className="apart-cms">
                  <div
                    data-sort-list=""
                    data-filter-list=""
                    role="list"
                    className="apart-cms_list"
                  >
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.slug}
                        project={project}
                        eager={project.number <= "06"}
                      />
                    ))}
                  </div>
                </div>
                <div data-filter-empty="" className="portfolio-empty">
                  <h2 className="h4">No projects match.</h2>
                  <p className="p1">
                    Reset the filters to explore the complete portfolio.
                  </p>
                </div>
                <div className="u-160" />
              </div>
            </div>
          </div>
          <div className="flower apart">
            <FlowerVideo variant="05" />
          </div>
        </div>
      </div>
    </section>
  );
}
