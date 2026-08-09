function Skills() {
  return (
    <>
      <section id="skills" className="portfolio-section skills-section">
        <h2 className="section-title">SKILLS</h2>

        <p className="section-description">
          Technologies and subjects that I'm currently learning
          and working with.
        </p>

        <div className="skills-grid">
          <div className="skill-card">
            <h3>Programming</h3>

            <ul>
              <li>C</li>
              <li>C++</li>
              <li>Java</li>
              <li>Python + Libraries</li>
            </ul>
          </div>

          <div className="skill-card">
            <h3>Frontend</h3>

            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
          </div>

          <div className="skill-card">
            <h3>Core Subjects</h3>

            <ul>
              <li>DBMS</li>
              <li>Operating Systems</li>
              <li>Computer Networks</li>
              <li>Object Oriented Programming</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="tools" className="portfolio-section tools-section">
        <h2 className="section-title">TOOLS I USE</h2>

        <p className="section-description">
          Some of the software and platforms I use while building
          projects.
        </p>

        <div className="tools-grid">
          <div className="tool-card">VS Code</div>
          <div className="tool-card">Git</div>
          <div className="tool-card">GitHub</div>
          <div className="tool-card">Canva</div>
          <div className="tool-card">MySQL</div>
          <div className="tool-card">Oracle SQL</div>
          <div className="tool-card">Jupyter Notebook</div>
          <div className="tool-card">Anti Gravity</div>
        </div>
      </section>
    </>
  );
}

export default Skills;