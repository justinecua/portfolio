import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheck,
  FiCopy,
  FiMessageCircle,
  FiGithub,
  FiMail,
  FiMonitor,
  FiServer,
  FiSmartphone,
} from "react-icons/fi";
import {
  SiJavascript,
  SiPython,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiPhp,
  SiLaravel,
  SiReact,
  SiDjango,
  SiFlutter,
  SiRedis,
  SiLinux,
} from "react-icons/si";
import { skills } from "../../data/data";
import PhotoLightbox from "./PhotoLightbox";
import Clock from "../layout/Clock";
import profileCutout from "../../assets/profile-cutout.png";
import profilePhoto from "../../assets/profile.jpeg";
import worklog from "../../assets/worklog.png";
import playstore from "../../assets/playstore3.png";

// Drop more photos into src/assets/about/ and they show up in About.
const ABOUT_PHOTOS = Object.entries(
  import.meta.glob("../../assets/about/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

const SKILL_ICONS = {
  Javascript: SiJavascript,
  Python: SiPython,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
  Php: SiPhp,
  Laravel: SiLaravel,
  "React Native": SiReact,
  React: SiReact,
  Django: SiDjango,
  Flutter: SiFlutter,
};

// How the stack strip groups the skills from data.js. Any skill not
// listed here falls into the last group.
const STACK_GROUPS = [
  { label: "Languages", items: ["Python", "Javascript", "Php"] },
  {
    label: "Frameworks",
    items: ["Django", "Laravel", "React Native", "Flutter"],
  },
  { label: "Data & tools", items: ["PostgreSQL", "MySQL", "Docker"] },
];

const SKILL_NAMES = { Javascript: "JavaScript", Php: "PHP" };

const stackGroups = (() => {
  const known = new Set(STACK_GROUPS.flatMap((g) => g.items));
  const groups = STACK_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((s) => skills.includes(s)),
  }));
  groups[groups.length - 1].items.push(...skills.filter((s) => !known.has(s)));
  return groups.filter((g) => g.items.length);
})();

const WORK = [
  {
    year: "Live on Google Play",
    kind: "Mobile app · Side project",
    title: "Worklog — OJT hours tracker",
    facts: [
      { big: "1k+", small: "Installs on Google Play" },
      { big: "10k+", small: "OJT hours logged by students" },
    ],
    stack: "React Native · JavaScript · Android",
    media: "worklog",
    href: "https://play.google.com/store/apps/details?id=com.justinecua.worklog",
    link: "https://play.google.com/store/apps/details?id=com.justinecua.worklog",
    linkLabel: "Get it on Google Play",
  },
  {
    year: "2025 — Now",
    kind: "Web system · St. Michael's College of Iligan",
    title: "Research archive system",
    facts: [
      { big: "Django", small: "Backend with PostgreSQL" },
      { big: "Docker", small: "Deployed on Linux servers" },
    ],
    stack: "Django · PostgreSQL · Docker · Linux",
    icons: [SiDjango, SiPostgresql, SiDocker, SiLinux],
    link: "", // add the project URL here
    linkLabel: "View project",
  },
  {
    year: "2025 — Now",
    kind: "Mobile app · Global Emergency Medical Registry",
    title: "AED training app",
    facts: [
      { big: "iOS + Android", small: "Tested and shipped on both" },
      { big: "Offline", small: "P2P hotspot sessions between devices" },
    ],
    stack: "React Native · Offline-first · Hotspot networking",
    icons: [SiReact, SiJavascript],
    link: "", // add the project URL here
    linkLabel: "View project",
  },
  {
    year: "2025",
    kind: "Internal tool · Iligan Light and Power Inc.",
    title: "Internal web app with live chat",
    facts: [
      { big: "Real-time", small: "Chat via WebSockets & Django Channels" },
      { big: "Redis", small: "Used to improve performance" },
    ],
    stack: "Django · React · PostgreSQL · Redis · MUI",
    icons: [SiDjango, SiReact, SiRedis, SiPostgresql],
    link: "", // add the project URL here
    linkLabel: "View project",
  },
];

const SERVICES = [
  {
    icon: FiMonitor,
    title: "Web apps",
    desc: "Admin panels, portals and archive systems.",
    tools: ["Django", "React", "PostgreSQL", "Laravel"],
  },
  {
    icon: FiSmartphone,
    title: "Mobile apps",
    desc: "iOS and Android apps that work offline.",
    tools: ["React Native", "Flutter"],
  },
  {
    icon: FiServer,
    title: "APIs & real-time",
    desc: "REST backends, WebSockets and Redis.",
    tools: ["Python", "Django", "MySQL"],
  },
  {
    icon: FiBookOpen,
    title: "Teaching",
    desc: "OOP and Databases for 2nd and 3rd year students.",
    tools: ["OOP", "Databases"],
  },
];

const STEPS = [
  { n: "01", t: "Talk", d: "Tell me what you need." },
  { n: "02", t: "Plan", d: "I scope it and give you a timeline." },
  { n: "03", t: "Build", d: "Regular updates and a preview link." },
  { n: "04", t: "Launch", d: "Deployed and handed over." },
];

const EXPERIENCE = [
  {
    role: "ICTC Staff & Faculty",
    org: "St. Michael's College of Iligan",
    meta: "Full-time · Teaches OOP & Databases",
    date: "Jul 2025 — Now",
  },
  {
    role: "Mobile Application Developer",
    org: "Global Emergency Medical Registry",
    meta: "Contract · Remote",
    date: "Jul 2025 — Now",
  },
  {
    role: "Web Developer Intern",
    org: "Iligan Light and Power Inc.",
    meta: "Internship · On-site",
    date: "Feb — Apr 2025",
  },
  {
    role: "BS Computer Science",
    org: "St. Michael's College",
    meta: "Iligan City",
    date: "Graduated 2024",
  },
];

function Section({ className = "", children, ...props }) {
  return (
    <section className={`fsec ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}

function WorkMedia({ item }) {
  if (item.media === "worklog") {
    return (
      <a
        className="pcard-media pcard-media-worklog"
        href={item.href}
        target="_blank"
        rel="noreferrer"
      >
        <img src={worklog} alt="Worklog app icon" className="wl-icon" />
        <div>
          <p className="wl-name">Worklog</p>
          <p className="wl-sub">OJT Progress Tracker</p>
        </div>
        <img src={playstore} alt="Get it on Google Play" className="wl-store" />
      </a>
    );
  }

  return (
    <div className="pcard-media pcard-media-icons">
      {item.icons.map((Icon, i) => (
        <span key={i} className="pcard-icon">
          <Icon size={30} />
        </span>
      ))}
    </div>
  );
}

const EMAIL = "jcua.dev@gmail.com";

function InfoTab() {
  const [copied, setCopied] = useState(false);
  const [viewing, setViewing] = useState(null); // index of the open photo

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <div className="tab-content home frame">
      {/* ─── HERO ─── */}
      <Section className="hero">
        <div className="hero-copy">
          <h1 className="hero-title">
            <em>Justine Cua</em>
          </h1>

          <p className="hero-text">
            Hi I’m Justine, a developer from Iligan City, Philippines. I build
            web systems for schools and offices, and mobile apps for students
            and medics.
          </p>
        </div>

        <div className="hero-photo" aria-hidden="true">
          <img src={profileCutout} alt="" />
        </div>
      </Section>

      {/* ─── STACK STRIP ─── */}
      <div className="stack-strip">
        {stackGroups.map((g) => (
          <div key={g.label} className="stack-group">
            <p className="stack-label">{g.label}</p>
            <div className="stack-items">
              {g.items.map((s) => {
                const Icon = SKILL_ICONS[s];
                return (
                  <span key={s} className="stack-item">
                    <span className="stack-icon">
                      {Icon && <Icon size={15} />}
                    </span>
                    {SKILL_NAMES[s] || s}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ─── WORK ─── */}
      <Section>
        <h2 className="sec-title">
          A few things <em>I’ve built</em>
        </h2>

        <div className="pcards">
          {WORK.map((w, i) => (
            <article key={w.title} className="pcard" style={{ "--i": i }}>
              <div className="pcard-top">
                <span>{w.year}</span>
                <span>{w.kind}</span>
              </div>

              <h3 className="pcard-title">{w.title}</h3>

              <div className="pcard-facts">
                {w.facts.map((f) => (
                  <div key={f.big}>
                    <p className="pcard-big">{f.big}</p>
                    <p className="pcard-small">{f.small}</p>
                  </div>
                ))}
              </div>

              <p className="pcard-stack">
                <span>Stack —</span> {w.stack}
              </p>

              <WorkMedia item={w} />

              {w.link && (
                <a
                  href={w.link}
                  target="_blank"
                  rel="noreferrer"
                  className="pcard-link"
                >
                  {w.linkLabel} <FiArrowUpRight size={15} />
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="center-row">
          <Link to="/projects" className="btn-outline">
            All projects <FiArrowUpRight size={15} />
          </Link>
        </div>
      </Section>

      {/* ─── STORY ─── */}
      <Section className="story">
        <h2 className="sec-title">About</h2>

        <div className="story-text">
          <p>
            I’m one of the staff of the{" "}
            <strong>ICTC Department at St. Michael’s College of Iligan</strong>,
            where I also teach <strong>OOP and Databases</strong> to 2nd and 3rd
            year students.
          </p>
        </div>

        <div className="photos">
          {ABOUT_PHOTOS.map((src, i) => (
            <button
              key={src}
              type="button"
              className="photo"
              onClick={() => setViewing(i)}
              aria-label={`View photo ${i + 1} of ${ABOUT_PHOTOS.length}`}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>

        {viewing !== null && (
          <PhotoLightbox
            photos={ABOUT_PHOTOS}
            index={viewing}
            onChange={setViewing}
            onClose={() => setViewing(null)}
          />
        )}

        <div className="story-text">
          <p>
            I graduated with a BS in Computer Science in 2024 and have two years
            of experience in software development. On the side I made{" "}
            <strong>Worklog</strong>, an OJT hours tracker with 1k+ installs.
          </p>
        </div>

        <ul className="exp-list">
          {EXPERIENCE.map((e) => (
            <li key={e.role + e.org} className="exp-item">
              <div>
                <p className="exp-role">{e.role}</p>
                <p className="exp-org">
                  {e.org} <span>· {e.meta}</span>
                </p>
              </div>
              <span className="exp-date">{e.date}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ─── WHAT I DO + HOW I WORK ─── */}
      <Section>
        <h2 className="sec-title">What I do</h2>

        <div className="do-grid">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <article key={svc.title} className="do-card">
                <span className="do-icon">
                  <Icon size={18} />
                </span>
                <h3 className="do-title">{svc.title}</h3>
                <p className="do-desc">{svc.desc}</p>
                <div className="do-tools">
                  {svc.tools.map((t) => {
                    const ToolIcon = SKILL_ICONS[t];
                    return (
                      <span key={t}>
                        {ToolIcon && <ToolIcon size={13} />}
                        {t}
                      </span>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <p className="flow-label">How I work</p>
        <ol className="flow">
          {STEPS.map((s) => (
            <li key={s.n} className="flow-step">
              <span className="flow-n">{s.n}</span>
              <h3 className="flow-t">{s.t}</h3>
              <p className="flow-d">{s.d}</p>
            </li>
          ))}
        </ol>

        <div className="center-row">
          <a href="mailto:jcua.dev@gmail.com" className="btn-outline">
            Work with me <FiArrowUpRight size={15} />
          </a>
        </div>
      </Section>

      {/* ─── CTA ─── */}
      <Section className="cta">
        <div className="cta-card">
          <div className="cta-who">
            <span className="cta-avatar">
              <img src={profilePhoto} alt="" />
            </span>
            <div>
              <p className="cta-name">Justine Cua</p>
              <div className="cta-meta">
                <span>Iligan City, PH</span>
                <Clock />
              </div>
            </div>
          </div>

          <h2 className="cta-title">Have a project in mind?</h2>

          <div className="cta-actions">
            <button
              className="btn-dark btn-lg"
              onClick={() => window.dispatchEvent(new Event("toggle-chat"))}
            >
              <FiMessageCircle size={16} /> Send a message
            </button>
            <button className="cta-copy" onClick={copyEmail}>
              <FiMail size={15} />
              <span>{EMAIL}</span>
              <span className="cta-copy-icon" aria-hidden="true">
                {copied ? <FiCheck size={15} /> : <FiCopy size={15} />}
              </span>
              <span className="sr-only">
                {copied ? "Copied" : "Copy email address"}
              </span>
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default InfoTab;
