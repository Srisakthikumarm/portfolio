import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Projects.css";
import FadeInSection from "./FadeInSection";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export const RetroPixelToolsIcon = ({ style }) => (
  <svg
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    fill="currentColor"
    style={{ shapeRendering: "crispEdges", display: "inline-block", verticalAlign: "middle", ...style }}
  >
    <path d="M1 1h5v2H3v2h3v2H4v2H1V1zm9 0h5v8h-2V5h-3V1zM6 6h4v4H6V6zm-5 5h3v2h2v3H1v-5zm10 0h2v3h3v2h-5v-5z" />
  </svg>
);

const BehanceIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.836 3-3.054 0-4.89-2.007-4.89-4.823 0-3.068 1.942-5.177 4.808-5.177 2.986 0 4.542 2.052 4.417 4.908h-6.757c.075 1.156.848 1.982 2.373 1.982 1.218 0 1.996-.447 2.275-1.127l2.61.237zm-2.483-4.004c-.062-.971-.723-1.68-1.849-1.68-1.077 0-1.782.684-1.943 1.68h3.792zm-12.243-5.996h-9v14h8.568c2.894 0 5.432-1.348 5.432-4.489 0-1.987-1.175-3.328-2.618-3.901 1.258-.619 2.086-1.748 2.086-3.414 0-2.67-2.188-2.196-4.468-2.196zm-5.5.945h2.88c1.229 0 2.233.32 2.233 1.488 0 1.173-1.004 1.567-2.233 1.567h-2.88v-3.055zm0 5.055h3.084c1.378 0 2.416.398 2.416 1.704 0 1.348-1.038 1.741-2.416 1.741h-3.084v-3.445z"/>
  </svg>
);

const MediumIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42s-3.38-2.88-3.38-6.42 1.51-6.42 3.38-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

const DribbbleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M12 0c-6.627 0-12 5.372-12 12 0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12zm9.946 11.026c-.344-.08-2.871-.634-5.754-.253.308-.823.585-1.684.821-2.576 2.846 1.053 4.678 2.588 4.933 2.829zm-1.892-4.148c-.282-.266-2.14-1.921-5.074-2.868.966-1.536 1.83-3.218 2.55-5.006 1.127.424 2.181 1.082 3.09 1.936 1.171 1.1 2.015 2.474 2.474 4.02-.132.176-1.341 1.391-3.04 1.918zm-8.054-6.078c-.751 1.829-1.649 3.547-2.646 5.122-3.13-1.042-6.529-1.077-6.852-1.079 1.258-2.029 3.125-3.559 5.352-4.27 1.34-.428 2.767-.478 4.146.227zm-10.957 5.656c.361.002 3.518.032 6.559 1.058-.291.56-.566 1.135-.823 1.724-3.921-.137-7.618 1.164-7.989 1.298-.415-1.353-.448-2.784-.093-4.08.109-.4 2.346 0 2.346 0zm.832 5.706c.386-.134 3.753-1.328 7.553-1.121-.299.882-.572 1.764-.816 2.647-3.411 1.175-6.195 3.784-6.446 4.025-1.111-1.332-1.745-3.003-1.785-4.733.002-.274.894-.818 1.494-.818zm8.016 6.038c.287-.275 2.766-2.673 6.082-3.805.539 1.442.942 2.923 1.205 4.425-1.674.802-3.551.989-5.327.525-1.776-.464-3.371-1.579-4.52-3.097.897-.563 1.758-1.189 2.56-1.876z"/>
  </svg>
);

// =================================================================================
//  EASY TEMPLATE GUIDE: HOW TO ADD A NEW PROJECT TO YOUR WEBSITE
// =================================================================================
//  To add a new project card:
//  1. Put your project image inside the `public/assets/` folder.
//  2. Copy the template block below, paste it inside `featuredProjects`, and edit your text/links!
//
//  /* --- START NEW PROJECT TEMPLATE (COPY FROM HERE) ---
//  {
//    id: "my-new-project-id",                              // 1. Unique ID name
//    title: "YOUR NEW PROJECT TITLE GOES HERE",             // 2. Project Title
//    year: "2026",                                         // 3. Year or "IN DEVELOPMENT"
//    // inDevelopment: true,                               // 4. Uncomment if currently in development
//    desc: "Short 1-2 line summary of what you built.",
//    fullDetails: "Detailed summary for the View Details popup modal.",
//    tech: ["FIGMA", "REACT", "UI/UX DESIGN"],              // List of tech tags in quotes
//    image: "/assets/your_image_name.jpg",                  // Image inside public/assets/
//    
//    // Links (Leave as "" if you don't have a link):
//    link: "https://www.behance.net/gallery/your-link",
//    behanceLink: "https://www.behance.net/gallery/your-link",
//    mediumLink: "https://medium.com/@your-link",
//    dribbbleLink: "https://dribbble.com/shots/your-link",
//    figmaLink: "https://www.figma.com/design/your-link",
//    githubLink: "https://github.com/your-repo-link",
//    demo: "https://your-live-demo-website.com",
//  },
//  --- END NEW PROJECT TEMPLATE (COPY TO HERE) --- */
// =================================================================================

const featuredProjects = [
  {
    id: "aether-analytics",
    title: "AETHER ANALYTICS - LANDING PAGE UI/UX CASE STUDY",
    year: "2026",
    desc: "Building Trust in the Dark: High-conversion dark theme SaaS landing page for Aether Analytics—Supercharge Your Database Analytics with Aether. Features active user growth charts, scalable database analytics, and dark UI trust architecture.",
    fullDetails: "Designed a high-conversion dark mode SaaS landing page and UI/UX case study titled 'Aether Analytics' ('Supercharge Your Database Analytics with Aether - Unlock hidden insights, predict trends, and optimize performance with our next-generation analytics platform'). Engineered dark theme trust architecture, active user growth graphs (+34% growth rate metrics), interactive feature cards, database telemetry integration badges, and responsive desktop/mobile layouts. Published on Behance and Medium.",
    tech: ["SaaS LANDING PAGE", "DARK MODE UI", "ANALYTICS UX", "MEDIUM CASE STUDY", "BEHANCE SHOWCASE"],
    image: "/assets/aether_analytics.jpg",
    link: "https://www.behance.net/gallery/253674709/Aether-Analytics-Design-Assignment",
    behanceLink: "https://www.behance.net/gallery/253674709/Aether-Analytics-Design-Assignment",
    mediumLink: "https://medium.com/@srisakthikumar03/building-trust-in-the-dark-the-aether-analytics-landing-page-case-study-8cee7acde97d",
    demo: "https://www.behance.net/gallery/253674709/Aether-Analytics-Design-Assignment",
  },
  {
    id: "logistics-alert-dashboard",
    title: "LOGISTICS COMMAND - LOGISTICS ALERT DASHBOARD",
    year: "2026",
    desc: "Designing for the 3 AM Alert: Enterprise logistics exception dashboard designed for high-stress operational resolution, critical temperature/route alert triage, and fleet status.",
    fullDetails: "Designed an enterprise logistics exception management dashboard titled 'Logistics Command' (Cartflow Active Alerts & Operation Resolution: 'Designing for the 3 AM Alert'). Engineered high-stress operational workflows for critical route deviation and temperature failure triage, live GPS map tracking, vehicle telemetry, driver response metrics, and incident resolution drawers.",
    tech: ["ENTERPRISE UX", "DASHBOARD UI", "LOGISTICS UX", "MEDIUM CASE STUDY", "BEHANCE SHOWCASE"],
    image: "/assets/logistics_command.jpg",
    link: "https://www.behance.net/gallery/253673989/Logistic-Alert-Dashboard",
    behanceLink: "https://www.behance.net/gallery/253673989/Logistic-Alert-Dashboard",
    mediumLink: "https://medium.com/@srisakthikumar03/designing-for-the-3-am-alert-a-logistics-exception-dashboard-case-study-8b186ba9eb92",
    demo: "https://www.behance.net/gallery/253673989/Logistic-Alert-Dashboard",
  },
  {
    id: "aether-ad-poster",
    title: "AETHER ANALYTICS - AD POSTER DESIGN & SOCIAL CAMPAIGN",
    year: "2026",
    desc: "Social Campaign & Ad Poster Design: 'See issues before they slow you down — Database analytics, not dashboards built for developers.' High-impact dark grid promotional campaign, developer hooks, and ad collateral.",
    fullDetails: "Designed a high-impact promotional ad poster series and social media campaign for Aether Analytics ('Social Campaign — UI/UX Case Study: See issues before they slow you down. Real-time AI analytics for database developers. Ship faster, sleep better'). Engineered dark theme grid layout architecture, privacy-first developer hooks, comparison ad carousels ('Still flying blind with your data? Traditional tools slow you down'), and high-conversion ad collateral. Published on Behance.",
    tech: ["AD POSTER DESIGN", "SOCIAL CAMPAIGN", "GRAPHIC DESIGN", "FIGMA", "BEHANCE SHOWCASE"],
    image: "/assets/aether_ad_poster.jpg",
    link: "https://www.behance.net/gallery/253677007/Aether-Analytics-Ad-Poster-Design-Design-Assignment",
    behanceLink: "https://www.behance.net/gallery/253677007/Aether-Analytics-Ad-Poster-Design-Design-Assignment",
    mediumLink: "https://medium.com/@srisakthikumar03/from-interface-to-feed-the-aether-analytics-social-campaign-case-study-4c3900febf9c",
    demo: "https://www.behance.net/gallery/253677007/Aether-Analytics-Ad-Poster-Design-Design-Assignment",
  },
  {
    id: "video-editor-portfolio",
    title: "VIDEO EDITOR PORTFOLIO",
    year: "2026",
    desc: "Personal brand and landing page design for a video editor built for growth and performance. Designed in Figma and fully developed in Framer.",
    fullDetails: "Designed and developed a personal brand and landing page titled 'Video Editor Portfolio'. Designed the high-impact interface and user experience in Figma, and built the fully responsive, animated website in Framer to showcase video editing work with high-performance visuals.",
    tech: ["UI/UX DESIGN", "FIGMA", "FRAMER", "PORTFOLIO DESIGN", "BEHANCE SHOWCASE"],
    image: "/assets/video_editor_portfolio.png",
    link: "https://www.behance.net/gallery/254287793/Vedio-Editor-Porfolio",
    behanceLink: "https://www.behance.net/gallery/254287793/Vedio-Editor-Porfolio",
    demo: "https://sakthivideoeditor.framer.website/",
  },
  {
    id: "flow",
    title: "FLOW B2B LOGISTICS PLATFORM",
    year: "IN DEVELOPMENT",
    inDevelopment: true,
    desc: "Architected and designed an enterprise-grade B2B logistics management platform currently in active development at Flow Logistics Solution LLP. Engineered complex dispatch matrices, real-time vehicle tracking UI, driver assignment workflows, and automated billing forms.",
    fullDetails: "Architected and designed an enterprise-grade B2B logistics management platform at Flow Logistics Solution LLP. Currently under active development in office. Engineered complex dispatch matrices, real-time vehicle tracking UI, driver assignment workflows, and automated billing forms. Built a robust Figma design system with tokens for typography, color palettes, and component states, ensuring 100% WCAG 2.1 AA accessibility compliance across all 20+ desktop & mobile screens.",
    tech: ["FIGMA", "HTML5/CSS3", "JAVASCRIPT", "WCAG 2.1 AA", "DESIGN SYSTEM", "B2B LOGISTICS", "IN DEVELOPMENT"],
    image: "/assets/flow.png",
  },
  {
    id: "monster-404",
    title: "CONFUSING MONSTER ANIMATION - 404 PAGE",
    year: "2026",
    desc: "First Figma motion animation experiment: interactive 404 error page featuring a confused fluffy blue monster mascot, sky gradient, and smooth UI transitions.",
    fullDetails: "Created my first Figma motion animation for a 404 error page titled 'Confusing Monster Animation 404' on Cutestor ('Oops, I think we're lost—Let's get you back to somewhere familiar...'). Engineered custom 3D fluffy monster mascot keyframe animations, sky cloud backdrop gradients, interactive hover states, and smooth navigation micro-interactions.",
    tech: ["FIGMA MOTION", "UI ANIMATION", "404 PAGE DESIGN", "DRIBBBLE SHOT", "MICRO-INTERACTIONS"],
    image: "/assets/monster_404.png",
    link: "https://dribbble.com/shots/27613026-Confusing-Monster-Animation-404",
    dribbbleLink: "https://dribbble.com/shots/27613026-Confusing-Monster-Animation-404",
    demo: "https://dribbble.com/shots/27613026-Confusing-Monster-Animation-404",
  },
  {
    id: "sakthi-framer-portfolio-main",
    title: "SRI SAKTHIKUMAR - MAIN CURRENT FRAMER PORTFOLIO",
    year: "2026",
    desc: "My main current personal UI/UX portfolio website live on Framer (srisakthikumar.framer.website): 'Unlimited Design for Solid Startups', light-grey layout, and interactive product showcases.",
    fullDetails: "Designed and published my main current personal portfolio website in Framer titled 'SRI SAKTHIKUMAR' ('Unlimited Design for Solid Startups - I help startups and brands create beautiful, functional products—fast and hassle-free'). Engineered clean light-grey typography layouts, interactive project showcase carousels, and responsive Framer components live at srisakthikumar.framer.website.",
    tech: ["FRAMER", "FIGMA", "PORTFOLIO DESIGN", "WEB APPLICATION", "LIVE PORTFOLIO"],
    image: "/assets/framer_portfolio_main.png",
    link: "https://srisakthikumar.framer.website/",
    demo: "https://srisakthikumar.framer.website/",
  },
  {
    id: "sakthi-framer-portfolio-2",
    title: "SAKTHI PORTFOLIO - SECOND FRAMER PORTFOLIO",
    year: "2026",
    desc: "My second personal UI/UX portfolio website built in Framer: interactive bento grid showcases, custom animations, case study breakdowns, and smooth responsiveness.",
    fullDetails: "Designed and published my second official personal portfolio website in Framer (srisakthikumarm.framer.website). Architected an elevated bento grid design showcasing product design case studies, design systems, micro-interactions, contact forms, and client testimonials.",
    tech: ["FRAMER", "FIGMA", "BENTO GRID", "PORTFOLIO DESIGN", "BEHANCE SHOWCASE"],
    image: "/assets/framer_portfolio_2.png",
    link: "https://www.behance.net/gallery/231713531/My-Portfolio",
    demo: "https://srisakthikumarm.framer.website/",
  },
  {
    id: "acadintern",
    title: "ACADINTERN - FROM CLASSROOM TO CAREER UX CASE STUDY",
    year: "2026",
    desc: "Full-stack edtech internship & career discovery platform: 116k+ students, 50k+ listings, 95% placement metrics, 8 modules, and end-to-end UX research.",
    fullDetails: "Led end-to-end product design and UX strategy for AcadIntern ('From Classroom to Career'). Engineered a full-stack internship portal bridging student ambition with real-world opportunities at scale—featuring personalized student dashboards, company placement matrices, application wizards, and iterative usability testing with 116k+ simulated users.",
    tech: ["PRODUCT STRATEGY", "UX RESEARCH", "FIGMA", "DESIGN SYSTEM", "BEHANCE SHOWCASE"],
    image: "/assets/acadintern.png",
    link: "https://www.behance.net/gallery/245848273/AcadIntern",
    behanceLink: "https://www.behance.net/gallery/245848273/AcadIntern",
    demo: "https://acadintern.mathi.live",
  },
  {
    id: "freelance-poster",
    title: "CODER'S SPACE - FREELANCE POSTER DESIGN",
    year: "2025",
    desc: "Freelance promotional poster design for Coder's Space Summer Coding Bootcamp: course syllabus grid, tech stack icons, real-time project highlights, and print-ready layout.",
    fullDetails: "Designed a vibrant and engaging promotional poster for Coder's Space Summer Coding Bootcamp ('Let's make your children's future bright'). Highlighted key offerings including Web Development, Google Tools, Microsoft Office, Photoshop, Scratch, Git, and ChatGPT. Crafted in Figma and Canva as a freelance graphic design piece paid in tea, not cash!",
    tech: ["POSTER DESIGN", "FIGMA", "CANVA", "GRAPHIC DESIGN", "BEHANCE SHOWCASE"],
    image: "/assets/poster_design.png",
    link: "https://www.behance.net/gallery/231185647/Freelance-Poster-Design",
    demo: "https://www.behance.net/gallery/231185647/Freelance-Poster-Design",
  },
  {
    id: "icecube-branding",
    title: "ICECUBE RESTAURANT BRANDING",
    year: "2025",
    desc: "Complete restaurant brand identity & graphic design portfolio: logo design, mascot illustration, menu layouts, social media collateral, and brand guidelines.",
    fullDetails: "Created a comprehensive brand identity and graphic design showcase titled 'Icecube Restaurant Branding'. Designed custom mascot illustrations, logo assets, typography systems, restaurant menu cards, promotional banners, and visual brand guidelines in Illustrator and Photoshop.",
    tech: ["BRANDING", "LOGO DESIGN", "GRAPHIC DESIGN", "ILLUSTRATOR", "BEHANCE SHOWCASE"],
    image: "/assets/icecube.png",
    link: "https://www.behance.net/gallery/231498217/Icecube-Restaurant-Branding",
    demo: "https://www.behance.net/gallery/231498217/Icecube-Restaurant-Branding",
  },
  {
    id: "edash-dashboard",
    title: "E-DASH - E-COMMERCE ANALYTICS DASHBOARD",
    year: "2025",
    desc: "Real-time e-commerce analytics dashboard: sales, orders, customer acquisition metrics, revenue charts, and admin management UI.",
    fullDetails: "Designed a comprehensive e-commerce analytics dashboard titled 'E-Dash' ('Clear, real-time overview of sales, orders, customers, and performance metrics in one place'). Engineered high-density data visualizations, earnings breakdown graphs, new vs returning customer pie charts, product inventory lists, and responsive admin sidebar navigation created in Figma and Illustrator.",
    tech: ["DASHBOARD UI", "FIGMA", "E-COMMERCE ANALYTICS", "DATA VISUALIZATION", "BEHANCE SHOWCASE"],
    image: "/assets/edash.png",
    link: "https://www.behance.net/gallery/231486333/E-Dash-Dashboard-Portfolio",
    demo: "https://www.behance.net/gallery/231486333/E-Dash-Dashboard-Portfolio",
  },
  {
    id: "interplan-ui",
    title: "INTER PLAN - UI CASE STUDY",
    year: "2025",
    desc: "Comprehensive UI design system and visual component suite for InterPlan daily money management app: high-fidelity UI screens, color systems, micro-interactions, and design tokens.",
    fullDetails: "High-fidelity UI case study and visual design system for InterPlan daily money management mobile app. Features complete UI kit documentation, custom iconography, dark/light component variants, transaction cards, and interactive prototype flows created in Figma, Illustrator, and Miro.",
    tech: ["UI DESIGN SYSTEM", "FIGMA", "FINTECH UI", "MOBILE UI KIT", "BEHANCE SHOWCASE"],
    image: "/assets/interplan_ui.png",
    link: "https://www.behance.net/gallery/231485143/InterPlan-UI-Case-Study",
    demo: "https://www.behance.net/gallery/231485143/InterPlan-UI-Case-Study",
  },
  {
    id: "interplan-ux",
    title: "INTER PLAN - DAILY MONEY MANAGEMENT UX CASE STUDY",
    year: "2025",
    desc: "Fintech & daily expense management mobile app UX case study: balance tracking dashboards, income/expense breakdown charts, quick money transfers, and investment analytics.",
    fullDetails: "Led end-to-end UX research, wireframing, and mobile app design for InterPlan ('A Clear Starting Point for Daily Money Management'). Engineered intuitive financial dashboards, income/expense analytics graphs, instant peer-to-peer money transfers, and portfolio tracking UI built in Figma and Illustrator.",
    tech: ["UX CASE STUDY", "FIGMA", "FINTECH APP", "MOBILE UI", "BEHANCE SHOWCASE"],
    image: "/assets/interplan.png",
    link: "https://www.behance.net/gallery/231183969/InterPlan-UX-Case-Study",
    demo: "https://www.behance.net/gallery/231183969/InterPlan-UX-Case-Study",
  },
  {
    id: "skill-marketing",
    title: "SKILL MARKETING AGENCY WEBSITE",
    year: "2025",
    desc: "Data-driven digital marketing agency landing page: performance campaign dashboards, Google/Meta ad integration badges, skill-building session booking, and pink grid aesthetic.",
    fullDetails: "Designed a modern digital marketing agency website titled 'Skill Marketing Agency' ('Elevate Your Brand with Data-Driven Digital Marketing'). Engineered high-impact hero sections featuring Google & Meta ad integrations, interactive campaign performance charts, service package cards, and client lead generation forms.",
    tech: ["UI/UX DESIGN", "FIGMA", "MARKETING AGENCY", "LANDING PAGE", "BEHANCE SHOWCASE"],
    image: "/assets/skill_marketing.png",
    link: "https://www.behance.net/gallery/227907857/Skill-Marketing-Agency",
    demo: "https://www.behance.net/gallery/227907857/Skill-Marketing-Agency",
  },
  {
    id: "trekzy",
    title: "TREKZY - TOUR ORGANIZE WEB APPLICATION",
    year: "2025",
    desc: "World's best travel organizer web application: custom itinerary curation, flight/destination discovery matrices, interactive travel styles, and high-fidelity Figma design system.",
    fullDetails: "Designed a full-featured web application and travel SaaS titled 'Trekzy' ('World's Best Travel Organizer Web Application'). Engineered intuitive getaway planning flows, destination search filters, custom trip itinerary builders, flight deal comparisons, and interactive hero carousel components yielding a 20% usability score improvement.",
    tech: ["UI/UX DESIGN", "FIGMA", "TRAVEL SAAS", "TOUR ORGANIZER", "BEHANCE SHOWCASE"],
    image: "/assets/trekzy.png",
    link: "https://www.behance.net/gallery/231489357/Trekzy-Tour-Organize-Web-Application",
    demo: "https://www.behance.net/gallery/231489357/Trekzy-Tour-Organize-Web-Application",
  },
  {
    id: "skilldragon-community",
    title: "SKILLDRAGON COMMUNITY WEBSITE",
    year: "2024",
    desc: "EdTech & skill accelerator community platform design: course catalog UI, career growth dashboard, student testimonials, and responsive navigation.",
    fullDetails: "Designed the official web interface and student community portal for SkillDragon ('Tamil Nadu No. 1 EdTech Platform'). Engineered user-centered course catalog filters, interactive career growth roadmaps, student review cards, and streamlined registration workflows optimized for desktop and mobile learning.",
    tech: ["UI/UX DESIGN", "FIGMA", "EDTECH PLATFORM", "COMMUNITY UI", "BEHANCE SHOWCASE"],
    image: "/assets/skilldragon.png",
    link: "https://www.behance.net/gallery/215573891/Skill-Dragon-Community-Website",
    demo: "https://www.behance.net/gallery/215573891/Skill-Dragon-Community-Website",
  },
  {
    id: "organic-tea",
    title: "ORGANIC TEA LEAF E-COMMERCE",
    year: "2024",
    desc: "Handpicked organic tea e-commerce web platform: glassmorphism navigation, hero product showcase, farm-to-cup story section, and streamlined checkout.",
    fullDetails: "Designed an organic e-commerce web platform titled 'Tea Leaf' ('Savor Nature in Every Sip'). Engineered high-conversion product showcase pages, farm-to-cup brand storytelling sections, glassmorphism floating header bars, and responsive shopping cart UI optimized for organic tea lovers.",
    tech: ["UI/UX DESIGN", "FIGMA", "E-COMMERCE UI", "BRANDING", "BEHANCE SHOWCASE"],
    image: "/assets/organic_tea.jpg",
    link: "https://www.behance.net/gallery/227907613/Organic-Tea",
    demo: "https://www.behance.net/gallery/227907613/Organic-Tea",
  },
  {
    id: "supako-music",
    title: "SUPAKO - MUSIC STREAMING PLATFORM",
    year: "2024",
    desc: "Dark-themed music streaming web platform: custom artist hero interface, ad-free streaming presentation, interactive audio controls, and responsive song discovery layout.",
    fullDetails: "Designed a dark-mode music streaming web platform titled SUPAKO ('Music Without Limits'). Engineered a high-contrast hero interface showcasing featured artists, ad-free streaming tier presentation, intuitive audio playback controls, and responsive navigation for seamless song discovery across desktop and mobile devices.",
    tech: ["UI/UX DESIGN", "FIGMA", "MUSIC STREAMING", "DARK MODE UI", "BEHANCE SHOWCASE"],
    image: "/assets/supako_music.png",
    link: "https://www.behance.net/gallery/202637277/music-web-design",
    demo: "https://www.behance.net/gallery/202637277/music-web-design",
  },
  {
    id: "sakthi-framer-portfolio",
    title: "SAKTHI PORTFOLIO - FIRST FRAMER PORTFOLIO",
    year: "2024",
    desc: "Sri Sakthi Kumar's v1 personal portfolio website designed in Figma & Framer featuring clean bento grid layout, typography system, interactive project cards, and responsive web animations.",
    fullDetails: "Designed and built my first personal portfolio website in Framer titled 'SAKTHI' (sakthisportfolio.framer.website). Architected a clean bento grid layout showcasing UI/UX design capabilities, artist case studies, known tools, and work experience. Built responsive component variants and smooth hover animations.",
    tech: ["FRAMER", "FIGMA", "BENTO GRID", "PORTFOLIO DESIGN", "BEHANCE SHOWCASE"],
    image: "/assets/framer_portfolio.png",
    link: "https://www.behance.net/gallery/209724449/My-website",
    demo: "https://sakthisportfolio.framer.website",
  },
];

const ConstructionOverlay = () => (
  <div className="sleek-dev-overlay">
    <div className="blueprint-corner top-left" />
    <div className="blueprint-corner top-right" />
    <div className="blueprint-corner bottom-left" />
    <div className="blueprint-corner bottom-right" />

    <div className="sleek-scanline" />

    <div className="sleek-dev-pill">
      <span className="sleek-pulse-amber" />
      <span>ACTIVE SPRINT • B2B SYSTEM IN DEV</span>
    </div>

    <div className="sleek-dev-bottom-bar">
      <div className="sleek-dev-info">
        <span>FLOW LOGISTICS SOLUTION LLP</span>
      </div>
      <div className="sleek-dev-progress">
        <span className="progress-label">SYSTEM BUILD</span>
        <div className="progress-track">
          <div className="progress-fill" />
        </div>
        <span className="progress-pct">85%</span>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setSelectedProject(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <div id="projects">
      {/* Pixelated Section Header (Title Left, Number Right) */}
      <div className="section-header">
        <span className="section-title">FEATURED PROJECTS</span>
        <span className="section-number">03</span>
      </div>

      {/* 2-Column Side-by-Side Projects Grid - Displays ONLY the Latest 4 Projects */}
      <div className="omori-projects-grid">
        {featuredProjects.slice(0, 4).map((proj, idx) => (
          <FadeInSection key={proj.id} delay={`${(idx + 1) * 150}ms`}>
            <div
              className="omori-project-card"
              onClick={() => setSelectedProject(proj)}
            >
              {/* Image Preview Container */}
              <div className="omori-proj-img-wrap">
                <img src={proj.image} alt={proj.title} />
                {proj.inDevelopment && (
                  <>
                    <ConstructionOverlay />
                    <span className="omori-proj-year dev-badge">IN DEVELOPMENT</span>
                  </>
                )}
              </div>

              {/* Title & Year */}
              <div className="omori-card-body">
                <div className="omori-proj-header-row">
                  <h3 className="omori-proj-title">{proj.title}</h3>
                  {!proj.inDevelopment && (
                    <span className="omori-proj-year">{proj.year}</span>
                  )}
                </div>

                <p className="omori-proj-desc">{proj.desc}</p>

                {/* Tech Pills Row */}
                <div className="omori-tech-pills-row">
                  {proj.tech.slice(0, 4).map((t, tIdx) => (
                    <span key={tIdx} className="omori-tech-pill">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="omori-card-divider" />

                {/* Action Buttons Row */}
                <div className="omori-action-btn-row" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="omori-btn-black primary-action-btn"
                    onClick={() => setSelectedProject(proj)}
                  >
                    <span>VIEW DETAILS</span>
                  </button>

                  <div className="omori-sub-action-btns">
                    {proj.inDevelopment ? (
                      <span className="omori-btn-white" style={{ cursor: "default" }}>
                        <span className="retro-icon-frame amber">
                          <RetroPixelToolsIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                        </span>
                        <span>IN DEVELOPMENT</span>
                      </span>
                    ) : (
                      <>
                        {proj.dribbbleLink || proj.link?.includes("dribbble") ? (
                          <a
                            href={proj.dribbbleLink || proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="omori-btn-white"
                          >
                            <span className="retro-icon-frame dribbble">
                              <DribbbleIcon />
                            </span>
                            <span>DRIBBBLE</span>
                          </a>
                        ) : null}

                        {proj.behanceLink || (proj.link?.includes("behance") && !proj.link?.includes("dribbble")) ? (
                          <a
                            href={proj.behanceLink || proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="omori-btn-white"
                          >
                            <span className="retro-icon-frame blue">
                              <BehanceIcon />
                            </span>
                            <span>BEHANCE</span>
                          </a>
                        ) : null}

                        {proj.mediumLink ? (
                          <a
                            href={proj.mediumLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="omori-btn-white"
                          >
                            <span className="retro-icon-frame medium">
                              <MediumIcon />
                            </span>
                            <span>MEDIUM</span>
                          </a>
                        ) : null}

                        {proj.demo && !proj.demo.includes("behance") && !proj.demo.includes("medium") && !proj.demo.includes("dribbble") ? (
                          <a
                            href={proj.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="omori-btn-white"
                          >
                            <span className="retro-icon-frame emerald">
                              <OpenInNewRoundedIcon style={{ fontSize: 12, color: "#FFFFFF" }} />
                            </span>
                            <span>LIVE DEMO</span>
                          </a>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Centered Bottom View All Projects Button */}
      <div className="omori-bottom-btn-row">
        <Link to="/projects" className="omori-view-all-btn">
          <span>VIEW ALL PROJECTS</span>
          <span className="retro-icon-frame blue">
            <ArrowForwardRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
          </span>
        </Link>
      </div>

      {/* Interactive Case Study Detail Modal Overlay (Matching Screenshot) */}
      {selectedProject && (
        <div
          className="omori-modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="omori-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="omori-modal-header">
              <div className="modal-header-info">
                <h2 className="modal-proj-title">{selectedProject.title}</h2>
                <span className="modal-proj-year">{selectedProject.year}</span>
              </div>
              <button
                className="omori-modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close Modal"
              >
                <CloseRoundedIcon style={{ fontSize: 20 }} />
              </button>
            </div>

            <div className="modal-header-divider" />

            {/* Modal Image Preview */}
            <div className="modal-img-container">
              <img src={selectedProject.image} alt={selectedProject.title} />
              {selectedProject.inDevelopment && (
                <>
                  <ConstructionOverlay />
                  <span className="omori-proj-year dev-badge">IN DEVELOPMENT</span>
                </>
              )}
            </div>

            {/* Extended Case Study Details */}
            <div className="modal-details-body">
              <h4 className="modal-section-heading">PROJECT OVERVIEW & ARCHITECTURE</h4>
              <p className="modal-full-details-text">
                {selectedProject.fullDetails}
              </p>

              <h4 className="modal-section-heading">TOOLS & METHODOLOGY</h4>
              <div className="omori-tech-pills-row modal-pills">
                {selectedProject.tech.map((t, tIdx) => (
                  <span key={tIdx} className="omori-tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-bottom-divider" />

            {/* Modal Action Buttons */}
            <div className="modal-actions-row">
              {selectedProject.inDevelopment ? (
                <span className="omori-btn-white" style={{ cursor: "default" }}>
                  <span className="retro-icon-frame amber">
                    <RetroPixelToolsIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                  </span>
                  <span>IN DEVELOPMENT</span>
                </span>
              ) : (
                <>
                  {selectedProject.dribbbleLink || selectedProject.link?.includes("dribbble") ? (
                    <a
                      href={selectedProject.dribbbleLink || selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="omori-btn-black"
                    >
                      <span className="retro-icon-frame dribbble">
                        <DribbbleIcon />
                      </span>
                      <span>DRIBBBLE SHOT</span>
                    </a>
                  ) : null}

                  {selectedProject.behanceLink || (selectedProject.link?.includes("behance") && !selectedProject.link?.includes("dribbble")) ? (
                    <a
                      href={selectedProject.behanceLink || selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="omori-btn-black"
                    >
                      <span className="retro-icon-frame blue">
                        <BehanceIcon />
                      </span>
                      <span>BEHANCE CASE STUDY</span>
                    </a>
                  ) : null}

                  {selectedProject.mediumLink ? (
                    <a
                      href={selectedProject.mediumLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="omori-btn-white"
                    >
                      <span className="retro-icon-frame medium">
                        <MediumIcon />
                      </span>
                      <span>MEDIUM CASE STUDY</span>
                    </a>
                  ) : null}

                  {selectedProject.demo && !selectedProject.demo.includes("behance") && !selectedProject.demo.includes("medium") && !selectedProject.demo.includes("dribbble") ? (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="omori-btn-white"
                    >
                      <span className="retro-icon-frame green">
                        <OpenInNewRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                      </span>
                      <span>
                        {selectedProject.demo.includes("framer.website")
                          ? "LIVE FRAMER SITE"
                          : "VISIT LIVE WEBSITE"}
                      </span>
                    </a>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
