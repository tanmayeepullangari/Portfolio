import { Link, useParams } from "react-router-dom";
import projects from "../data/projects";

function ProjectDetails() {
  const { projectId } = useParams();

  const project = projects.find(
    (item) => item.id === projectId
  );

  if (!project) {
    return (
      <section className="not-found">
        <h1>Project Not Found</h1>

        <p>
          The project you're looking for does not exist.
        </p>

        <Link to="/projects" className="btn-first">
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section className="project-details">
      <div className="project-details-card">
        <p className="details-label">
          PROJECT DETAILS
        </p>

        <h1>{project.title}</h1>

        <p className="details-description">
          {project.description}
        </p>

        <div className="details-section">
          <h2>Technology Stack</h2>

          <div className="tech-list">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="details-section">
          <h2>About This Project</h2>

          <p>
            {project.details}
          </p>
        </div>

        <div className="details-actions">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-first"
          >
            View GitHub →
          </a>

          <Link
            to="/projects"
            className="btn-second"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;