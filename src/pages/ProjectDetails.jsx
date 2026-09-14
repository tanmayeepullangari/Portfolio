import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchProjectDetails = async () => {
    setLoading(true);
    setError(null);
    setNotFound(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`);
      if (response.status === 404) {
        setNotFound(true);
        return;
      }
      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }
      const data = await response.json();
      setProject(data);
    } catch (err) {
      console.error("Error fetching project details:", err);
      setError("Unable to connect to the backend server. Please verify the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return (
      <section className="project-details">
        <div className="loading-screen" style={{ minHeight: "300px" }}>
          <div className="loader"></div>
          <p>Fetching project details from backend...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="project-details">
        <div className="error-container" style={{ maxWidth: "600px", width: "100%" }}>
          <h3>Server Connection Error</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchProjectDetails}>
            Retry Connection
          </button>
          <div style={{ marginTop: "15px" }}>
            <Link to="/projects" className="btn-second" style={{ textDecoration: "none" }}>
              Back to Projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (notFound || !project) {
    return (
      <section className="not-found">
        <h1>404</h1>
        <h2>Project Not Found</h2>
        <p>
          The project matching ID "<strong>{projectId}</strong>" does not exist in our backend records.
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
        <p className="details-label">PROJECT DETAILS</p>

        <h1>{project.title}</h1>

        <p className="details-description">{project.description}</p>

        <div className="details-section">
          <h2>Technology Stack</h2>

          <div className="tech-list">
            {project.techStack?.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="details-section">
          <h2>About This Project</h2>

          <p>{project.details || project.description}</p>
        </div>

        <div className="details-actions">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-first"
            >
              View GitHub →
            </a>
          )}

          <Link to="/projects" className="btn-second">
            Back to Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;