function ProjectInfo({ techStack }) {
  return (
    <div className="project-info">
      <strong>Tech Stack:</strong>{" "}
      {techStack.join(", ")}
    </div>
  );
}

export default ProjectInfo;