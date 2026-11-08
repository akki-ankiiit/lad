import { lazy } from "react";

const HomePage = lazy(() => import("../pages/HomePage"));
const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));
// Project data (~150 KB) is only loaded with the project route chunk.
const ProjectRoute = lazy(() => import("../pages/ProjectRoute"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const LegalPage = lazy(() => import("../pages/LegalPage"));

export const routes = [
  {
    path: "/",
    title:
      "Luxury Antonovich Design | International Architecture & Interior Design",
    Component: HomePage,
  },
  {
    path: "/projects",
    title: "Our Works — Luxury Antonovich Design",
    Component: ProjectsPage,
  },
  {
    path: "/contact",
    title: "Contact & Regional Offices — Luxury Antonovich Design",
    Component: ContactPage,
  },
  {
    // Title is set by ProjectRoute once the project is resolved.
    match: (pathname) => /^\/projects\/[^/]+$/.test(pathname),
    Component: ProjectRoute,
  },
  {
    path: "/privacy",
    title: "Privacy — Luxury Antonovich Design",
    Component: () => <LegalPage type="privacy" />,
  },
  {
    path: "/terms",
    title: "Terms of Use — Luxury Antonovich Design",
    Component: () => <LegalPage type="terms" />,
  },
];
