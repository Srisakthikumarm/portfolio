import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import { Carousel } from "react-bootstrap";
import ExternalLinks from "./ExternalLinks";

const spotlightProjects = {
  "Flow": {
    title: "Flow — Enterprise B2B Logistics Platform",
    desc: "End-to-end redesign: 20+ Figma screens, full design system, responsive HTML/CSS/JS frontend — 35% engagement lift and 25% task-completion improvement post-launch (Google Analytics). Implemented WCAG 2.1 AA accessibility and interaction design patterns.",
    techStack: "FIGMA • HTML5/CSS3 • JAVASCRIPT • WCAG 2.1 AA • GOOGLE ANALYTICS",
    link: "https://www.linkedin.com/in/srisakthikumar",
    open: "https://srisakthikumar.framer.website",
    image: "/assets/flow.png",
  },
  "AcadIntern": {
    title: "AcadIntern — Internship Discovery Platform",
    desc: "Designed 15+ Figma screens; conducted 3 rounds of usability testing with 10+ students; resolved key onboarding friction — platform is publicly live with zero post-launch critical UX bugs.",
    techStack: "UX RESEARCH • FIGMA • USABILITY TESTING • RESPONSIVE UI",
    link: "https://acadintern.mathi.live",
    open: "https://acadintern.mathi.live",
    image: "/assets/acadintern.png",
  },
  "Trekzy": {
    title: "Trekzy — Travel Planning SaaS",
    desc: "Mobile-first SaaS design: complete user flows, customer journey mapping, high-fidelity Figma prototype, and full design system covering all screens and interaction states; 20% usability improvement in peer-review sessions.",
    techStack: "MOBILE-FIRST UI/UX • FIGMA • DESIGN SYSTEM • JOURNEY MAPPING",
    link: "https://srisakthikumar.framer.website/work/trekzy",
    open: "https://srisakthikumar.framer.website/work/trekzy",
    image: "/assets/trekzy.png",
  },
};

const projects = {
  "Logistics Design System & Component Library": {
    desc: "Built a standardized Figma component library and design system for B2B logistics, cutting per-feature design and development effort by 40%.",
    techStack: "Figma, Design Systems, Handoff",
    link: "https://srisakthikumar.framer.website",
    open: "https://srisakthikumar.framer.website",
  },
  "AI-Assisted UI/UX Workflows": {
    desc: "Integrated Claude, ChatGPT, and Codex to accelerate user interface prototyping and responsive HTML/CSS generation, compressing delivery timelines by 25%.",
    techStack: "Claude, ChatGPT, Codex, HTML5/CSS3",
    link: "https://srisakthikumar.framer.website",
    open: "https://srisakthikumar.framer.website",
  },
  "Accessibility & Heuristic Audit Framework": {
    desc: "Identified 8 usability friction points via heuristic evaluation and WCAG 2.1 AA audits across form screens, reducing completion times by 25%.",
    techStack: "Heuristic Evaluation, WCAG AA, Auditing",
    link: "https://srisakthikumar.framer.website",
    open: "https://srisakthikumar.framer.website",
  },
};

const Projects = () => {
  return (
    <div id="projects">
      <div className="section-header">
        <div className="section-title">
          <span className="section-title-prefix">03.</span>
          <span>Featured Work & Case Studies</span>
        </div>
        <a
          href="https://srisakthikumar.framer.website"
          className="explore-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Framer Portfolio
        </a>
      </div>

      {/* Desktop Showcase */}
      <div className="spotlight-projects-desktop">
        <Carousel interval={null} indicators={true} controls={true}>
          {Object.keys(spotlightProjects).map((key, i) => (
            <Carousel.Item key={i}>
              <div className="spotlight-slide-content">
                <div className="spotlight-image-wrap">
                  <img
                    className="d-block w-100"
                    src={spotlightProjects[key]["image"]}
                    alt={key}
                  />
                </div>
                <div className="spotlight-info-card">
                  <span className="spotlight-badge">FEATURED CASE STUDY</span>
                  <h3 className="spotlight-title">{spotlightProjects[key]["title"]}</h3>
                  <p className="spotlight-desc">{spotlightProjects[key]["desc"]}</p>
                  <div className="techStack">{spotlightProjects[key]["techStack"]}</div>
                  <div className="spotlight-links">
                    <ExternalLinks
                      githubLink={spotlightProjects[key]["link"]}
                      openLink={spotlightProjects[key]["open"]}
                    />
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Mobile Showcase */}
      <div className="spotlight-projects-mobile">
        {Object.keys(spotlightProjects).map((key, i) => (
          <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
            <div className="projects-card spotlight-mobile-card">
              <div className="card-header">
                <div className="folder-icon">
                  <FolderOpenRoundedIcon sx={{ fontSize: 32 }} />
                </div>
                <ExternalLinks
                  githubLink={spotlightProjects[key]["link"]}
                  openLink={spotlightProjects[key]["open"]}
                />
              </div>

              <a
                href={spotlightProjects[key]["open"] || spotlightProjects[key]["link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
              >
                <div className="card-title">{spotlightProjects[key]["title"]}</div>
                <div className="spotlight-mobile-image">
                  <img src={spotlightProjects[key]["image"]} alt={key} />
                </div>
              </a>
              <div className="card-desc">{spotlightProjects[key]["desc"]}</div>
              <div className="card-tech">{spotlightProjects[key]["techStack"]}</div>
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Secondary Project Grid */}
      <div className="project-container">
        <h4 className="secondary-projects-heading">Other Featured Work & Systems</h4>
        <ul className="projects-grid">
          {Object.keys(projects).map((key, i) => (
            <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
              <li className="projects-card">
                <div className="card-header">
                  <div className="folder-icon">
                    <FolderOpenRoundedIcon sx={{ fontSize: 32 }} />
                  </div>
                  <ExternalLinks
                    githubLink={projects[key]["link"]}
                    openLink={projects[key]["open"]}
                  />
                </div>

                <div className="card-title">{key}</div>
                <div className="card-desc">{projects[key]["desc"]}</div>
                <div className="card-tech">{projects[key]["techStack"]}</div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
