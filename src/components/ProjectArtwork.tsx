import Image from "next/image";
import type { ProjectItem } from "@/data/portfolio";

// Shared image treatment for the landing preview and the full project catalogue.
export default function ProjectArtwork({ project }: { project: ProjectItem }) {
  return (
    <Image
      src={project.image}
      alt={project.imageAlt}
      fill
      sizes="(max-width: 767px) 88vw, 640px"
      className="project-image"
    />
  );
}
