import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProjectPage from "./ProjectPage";
import { projects } from "../data/projects";

/** Resolves /projects/:slug against the verified Antonovich portfolio. */
export default function ProjectRoute() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/\/$/, "").split("/").pop();
  const project = projects.find((item) => item.slug === slug);

  useEffect(() => {
    document.title = project
      ? `${project.name} — Luxury Antonovich Design`
      : "Project not found — Luxury Antonovich Design";
  }, [project]);

  if (!project)
    return (
      <main className="not-found">
        <p className="l2">LUXURY ANTONOVICH DESIGN</p>
        <h1 className="h2">Project not found</h1>
        <a className="h5" href="/projects">
          View all works ↗
        </a>
      </main>
    );
  return <ProjectPage project={project} />;
}
