import { useState } from "react";
import ProjectInfo from "./ProjectInfo";

function ProjectCard({
  title,
  description,
  techStack,
  image,
  link,
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article className="project-card">

      <h3>{title}</h3>

      <p>{description}</p>

      <ProjectInfo techStack={techStack} />

      {showDetails && (
        <p>
          More details about this project.
        </p>
      )}

      <button
        className="project-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide Details" : "View Details"}
      </button>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="project-btn"
      >
        View Project →
      </a>

    </article>
  );
}

export default ProjectCard;