import { useState, useEffect } from "react";
import { skills } from "../../data/data";
import GithubActivity from "../work/Githubactivity";
import worklog from "../../assets/worklog.png";
import playstore from "../../assets/playstore3.png";
import ios from "../../assets/ios_coming.png";
import Confetti from "../Confetti";
import { GridBackground } from "../GridBackground";

function InfoTab() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tab-content" style={{ position: "relative" }}>
      <GridBackground variant="grid" mask="fade-edges" fill="var(--border)" />
      {showConfetti && <Confetti />}
      <div className="info-tab">
        {/* ─── ABOUT ─── */}
        <section>
          <div className="featured-card-fav">
            <div className="worklog-cards">
              <div
                data-text="OJT Hours Tracked"
                style={{ "--r": -15 }}
                className="worklog-card"
              >
                <div className="card-stat">
                  <h1>10k+</h1>
                  <p>Hours</p>
                </div>
              </div>

              <div
                data-text="Worklog – OJT Progress Tracker"
                style={{ "--r": 5 }}
                className="worklog-card featured-card"
              >
                <img
                  src={worklog}
                  alt="Worklog OJT Progress Tracker logo"
                  className="worklog-logo"
                />
              </div>

              <div
                data-text="App Installs"
                style={{ "--r": 25 }}
                className="worklog-card"
              >
                <div className="card-stat">
                  <h1>1k+</h1>
                  <p>Installs</p>
                </div>
              </div>
            </div>
            {/* ─── APP PROMO ─── */}
            <div className="app-promo-container">
              <div className="app-promo">
                <img
                  src={worklog}
                  alt="Worklog app icon"
                  className="app-promo-icon"
                />
                <div className="app-promo-info">
                  <h3 className="app-promo-name">
                    Worklog – OJT Progress Tracker
                  </h3>
                  <p className="app-promo-desc">
                    Track your OJT hours, log daily tasks, and monitor your
                    internship progress in one simple app — built for students
                    who want a clear, no-hassle way to stay on top of their
                    required hours.
                  </p>
                </div>
              </div>
              <div className="app-promo-footer">
                <a href="https://play.google.com/store/apps/details?id=com.justinecua.worklog">
                  <div className="playstore-container">
                    <img src={playstore} />
                  </div>
                </a>
                <a href="">
                  <div className="playstore-container">
                    <img src={ios} />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <p className="info-eyebrow">Hi I'm</p>
          <h2 className="info-name">Justine Cua</h2>
          <p className="info-role">Web Developer / Mobile Developer</p>

          {/* ─── TECH STACK ─── */}
          <section className="info-stack">
            <p className="skills-label">Tech Stack</p>
            <div className="skills-wrap">
              {skills.map((s) => (
                <span key={s} className="skill">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* GitHub widget lives right under the bio */}
          <GithubActivity />
        </section>

        {/* ─── EDUCATION ─── */}
        <section>
          <p className="info-eyebrow">Education</p>
          <div className="exp-block">
            <div className="exp-top">
              <h3>St. Michael's College</h3>
              <span className="clink-val">Quezon Ave, Iligan City</span>
            </div>
            <p className="exp-role">Bachelor of Science in Computer Science</p>
            <p className="exp-date">June 2021 – May 2025</p>
          </div>
        </section>

        {/* ─── EXPERIENCE ─── */}
        <section>
          <p className="info-eyebrow">Experience</p>

          <div className="exp-block">
            <div className="exp-top">
              <h3>Web Developer</h3>
              <span className="clink-val">July 2025 – Present</span>
            </div>
            <p className="exp-company">
              St. Michael's College of Iligan — Full-time (On-site)
            </p>
            <ul className="exp-list">
              <li>
                Developed an article submission and research archive system for
                SMCII RMO.
              </li>
              <li>Built backend features using Django and PostgreSQL.</li>
              <li>
                Deployed production websites on Linux servers using Docker.
              </li>
            </ul>
          </div>

          <div className="exp-block">
            <div className="exp-top">
              <h3>Mobile Application Developer</h3>
              <span className="clink-val">July 2025 – Present</span>
            </div>
            <p className="exp-company">
              Global Emergency Medical Registry — Contract (Remote)
            </p>
            <ul className="exp-list">
              <li>
                Developed AED Simulation and Critical Response Training app
                using React Native.
              </li>
              <li>Built offline training flows and emergency scenarios.</li>
              <li>
                Implemented peer-to-peer hotspot-based simulation between
                devices.
              </li>
              <li>Tested and deployed on both iOS and Android platforms.</li>
            </ul>
          </div>

          <div className="exp-block">
            <div className="exp-top">
              <h3>Web Developer Intern</h3>
              <span className="clink-val">February 2025 – April 2025</span>
            </div>
            <p className="exp-company">
              Iligan Light and Power Inc. — Internship (On-site)
            </p>
            <ul className="exp-list">
              <li>
                Built internal web application using Django, React, and
                PostgreSQL.
              </li>
              <li>
                Implemented real-time chat using WebSockets and Django Channels.
              </li>
              <li>Improved performance using Redis.</li>
              <li>Developed responsive interfaces using Material-UI.</li>
              <li>Collaborated using GitLab version control.</li>
            </ul>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section>
          <p className="info-eyebrow">Contact</p>
          <div className="contact-links">
            <a href="mailto:jcua.dev@gmail.com" className="clink">
              <span className="clink-label">Email</span>
              <span className="clink-val">jcua.dev@gmail.com ↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/justine-cua-886701303/"
              target="_blank"
              rel="noreferrer"
              className="clink"
            >
              <span className="clink-label">LinkedIn</span>
              <span className="clink-val">linkedin.com/in/justine-cua ↗</span>
            </a>
            <a
              href="https://x.com/jazzzztin"
              target="_blank"
              rel="noreferrer"
              className="clink"
            >
              <span className="clink-label">Twitter / X</span>
              <span className="clink-val">@jazzzztin ↗</span>
            </a>
          </div>
          <p className="contact-note">
            <span className="avail-dot" />
            By Justine Cua
          </p>
        </section>
      </div>
    </div>
  );
}

export default InfoTab;
