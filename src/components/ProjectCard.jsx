import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectInfo from "./ProjectInfo";

function ProjectCard({
  id,
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
        <p className="card-details">
          Click below to view full details page or visit repository.
        </p>
      )}

      <div className="project-actions">
        {id && (
          <Link to={`/projects/${id}`} className="project-btn details-btn">
            Full Details Page
          </Link>
        )}

        <button
          className="project-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Quick Info" : "Quick Info"}
        </button>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-btn"
        >
          View GitHub →
        </a>
      </div>
    </article>
  );
}

export default ProjectCard;