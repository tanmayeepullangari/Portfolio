import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import profileImage from "../assets/gif.webp";
import resume from "../assets/resume.pdf";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <section className="loading-screen">
        <div className="loader"></div>
        <p>Loading Portfolio...</p>
      </section>
    );
  }

  return (
    <section id="home" className="hero">
      <h1 className="background-text">
        PORTFOLIO
      </h1>

      <div className="hero-container">
        <div className="hero-left">
          <p className="hero-text2">
            DIGITAL PORTFOLIO
          </p>

          <h2 className="name">
            TANMAYEE
            <br />
            PULLANGARI
          </h2>

          <div className="hero-line"></div>

          <p className="course">
            Computer Science Student
          </p>

          <p className="typing">
            Welcome to my Portfolio...
          </p>

          <div className="buttons">
            <Link to="/about" className="btn-first">
              Explore
            </Link>

            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-second"
            >
              Resume
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="photo-card">
            <img
              src={profileImage}
              alt="Tanmayee Pullangari"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;