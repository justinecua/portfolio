import { skills } from "../../data/data";
import GithubActivity from "../work/Githubactivity";
function InfoTab() {
  return (
    <div className="tab-content">
      <div className="info-tab">
        {/* ─── ABOUT ─── */}
        <section>
          <p className="info-eyebrow">About</p>
          <h2 className="info-name">Justine Cua</h2>
          <p className="info-role">Web Developer / Mobile Developer</p>
          <p className="info-bio">
            Wassup! My portfolio's pretty basic. I know you can build it
            yourself. : )
          </p>
          {/* <div className="info-divider" /> */}

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
              href="https://www.facebook.com/justine.cua.2024/"
              target="_blank"
              rel="noreferrer"
              className="clink"
            >
              <span className="clink-label">Facebook</span>
              <span className="clink-val">facebook.com/justine.cua.2024 ↗</span>
            </a>
            <a
              href="https://www.instagram.com/jaazzztin/"
              target="_blank"
              rel="noreferrer"
              className="clink"
            >
              <span className="clink-label">Instagram</span>
              <span className="clink-val">instagram.com/jaazzztin ↗</span>
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
            Available now — responds within 24h
          </p>
        </section>
      </div>
    </div>
  );
}

export default InfoTab;
