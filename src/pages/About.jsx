import Skills from "../components/Skills";

function About() {
  return (
    <>
      <section id="about" className="about-section">
        <h2 className="section-title">
          ABOUT ME
        </h2>

        <div className="about-grid">
          <div className="about-card">
            <h3>About Me</h3>

            <p>
              Hello! I'm Tanmayee, a Computer Science student
              passionate about Web Development, Data Structures &
              Algorithms, Machine Learning, DBMS, Operating Systems
              and Computer Networks.
            </p>

            <br />

            <h3>Interests</h3>

            <ul>
              <li>Web Development</li>
              <li>Machine Learning</li>
              <li>Problem Solving</li>
              <li>UI Design</li>
            </ul>
          </div>

          <div className="about-card">
            <h3>Education</h3>

            <div className="timeline">
              <div className="timeline-box">
                <span>2024 – Present</span>

                <h4>
                  B.Tech - Computer Science Engineering
                </h4>

                <p>
                  NIT Warangal
                </p>
              </div>

              <div className="timeline-box">
                <span>2022</span>

                <h4>
                  Intermediate
                </h4>

                <p>
                  Prathibha Junior College
                </p>
              </div>

              <div className="timeline-box">
                <span>2020</span>

                <h4>
                  SS
                </h4>

                <p>
                  Narayana School
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Skills />
    </>
  );
}

export default About;