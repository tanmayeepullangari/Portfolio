import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";

function Projects() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">
        PROJECTS
      </h2>

      <p className="section-description">
        A few projects that showcase my learning journey.
      </p>

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

      <div className="certificate-box">
        <h3>Certificates</h3>

        <div className="certificate-grid">
          <div className="certificate-card">
            Oracle SQL
          </div>

          <div className="certificate-card">
            NPTEL
          </div>

          <div className="certificate-card">
            Coursera
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;