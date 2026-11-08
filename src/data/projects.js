import { projects as source, projectCategories } from "./antonovich-projects";

/** Portfolio entries adapted to the original card/detail components. */
export const projects = source.map((project, index) => ({
  ...project,
  number: String(index + 1).padStart(2, "0"),
  alt: `${project.name}${project.location ? `, ${project.location}` : ""} — ${project.discipline} by Luxury Antonovich Design`,
}));

// Only offer categories that currently have high-resolution portfolio projects.
export const projectTypes = [
  { value: "*", label: "All projects" },
  ...projectCategories.filter((category) =>
    source.some((project) => project.category === category.value),
  ),
];
