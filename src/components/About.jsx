import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";
import PaletteIcon from "@mui/icons-material/Palette";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import CodeIcon from "@mui/icons-material/Code";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const About = () => {
  const skillCategories = [
    {
      category: "Design & Prototyping",
      icon: <PaletteIcon style={{ color: "#00E5FF" }} />,
      skills: ["Figma", "Framer", "Adobe XD", "Photoshop", "Illustrator", "Webflow", "Miro"]
    },
    {
      category: "UX Research & Strategy",
      icon: <ManageSearchIcon style={{ color: "#A259FF" }} />,
      skills: ["User Research", "Persona Development", "Journey Mapping", "Usability Testing", "Heuristic Evaluation", "A/B Testing", "WCAG Accessibility"]
    },
    {
      category: "UI Development",
      icon: <CodeIcon style={{ color: "#00E676" }} />,
      skills: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Web", "Mobile-First Design", "Design Systems", "Component Libraries"]
    },
    {
      category: "AI & Modern Workflows",
      icon: <SmartToyIcon style={{ color: "#FFD166" }} />,
      skills: ["Claude", "ChatGPT", "GitHub Copilot", "Codex", "Midjourney", "Adobe Firefly"]
    }
  ];

  return (
    <div id="about">
      <FadeInSection>
        <div className="section-header">
          <div className="section-title">
            <span className="section-title-prefix">01.</span>
            <span>About Me & Competencies</span>
          </div>
        </div>
        <div className="about-content">
          <div className="about-bio-card">
            <p>
              I am a <strong>UI/UX Designer, Product Designer, and UI Developer</strong> with 1+ year of experience delivering production-ready web and mobile interfaces across logistics, travel, edtech, and fintech. I have worked on B2B logistics systems at <a href="https://www.linkedin.com/in/srisakthikumar" target="_blank" rel="noreferrer">Flow Logistics Solution LLP</a> as well as multiple freelance & collaborative web projects.
            </p>
            <p>
              My core strength lies in end-to-end user-centered design: conducting user research, crafting high-fidelity Figma prototypes & scalable design systems, verifying WCAG accessibility, and translating designs directly into clean HTML5/CSS3/JS frontend code with AI assistance.
            </p>
          </div>

          <h3 className="skills-heading">Key Technical Stack & Capabilities</h3>
          <div className="skills-grid">
            {skillCategories.map((cat, idx) => (
              <FadeInSection key={idx} delay={`${(idx + 1) * 100}ms`}>
                <div className="skill-category-card">
                  <div className="category-header">
                    <div className="category-icon-wrap">{cat.icon}</div>
                    <div className="category-title">{cat.category}</div>
                  </div>
                  <ul className="category-skills-list">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="skill-tag">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default About;
