import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Unable to connect to the backend server. Please ensure the backend API is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">PROJECTS</h2>

      <p className="section-description">
        A few projects that showcase my learning journey.
      </p>

      {loading && (
        <div className="loading-screen" style={{ minHeight: "300px" }}>
          <div className="loader"></div>
          <p>Loading projects from backend...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-container">
          <h3>Backend Unreachable</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchProjects}>
            Retry Connection
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              image={project.image}
              link={project.link}
            />
          ))}
        </div>
      )}

      <div className="certificate-box">
        <h3>Certificates</h3>

        <div className="certificate-grid">
          <div className="certificate-card">Oracle SQL</div>
          <div className="certificate-card">NPTEL</div>
          <div className="certificate-card">Coursera</div>
        </div>
      </div>
    </section>
  );
}

export default Projects;