import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import FadeInSection from "./FadeInSection";

function TabPanel(props) {
  const { children, value, index, isMobile, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={isMobile ? `full-width-tabpanel-${index}` : `vertical-tabpanel-${index}`}
      aria-labelledby={isMobile ? `full-width-tab-${index}` : `vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  isMobile: PropTypes.bool
};

function a11yProps(index, isMobile) {
  if (isMobile) {
    return {
      id: "full-width-tab-" + index,
      "aria-controls": "full-width-tabpanel-" + index,
    };
  } else {
    return {
      id: "vertical-tab-" + index,
      "aria-controls": "vertical-tabpanel-" + index,
    };
  }
}

const JobList = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const experienceItems = {
    "Flow Logistics Solution LLP": {
      jobTitle: "UI/UX Designer & UI Developer (AI Workflows) @",
      company: "Flow Logistics Solution LLP",
      location: "Bengaluru, India",
      duration: "AUGUST 2025 - PRESENT",
      desc: [
        "Redesigned 20+ screens of a legacy B2B logistics platform in Figma; built responsive HTML5/CSS3 frontend achieving 35% engagement lift and 25% task-completion improvement (measured via Google Analytics).",
        "Designed 10+ form screens with custom validation UI and error states, reducing form-completion time by 25%; identified 8 usability friction points via heuristic evaluation and shipped fixes across 2 Agile sprints.",
        "Built a standardised Figma component library and design system, cutting per-feature design and development effort by 40%.",
        "Implemented WCAG 2.1 AA accessibility guidelines and scalable interaction design patterns across all modules.",
      ],
    },
    "Freelance Projects": {
      jobTitle: "UI/UX Designer @",
      company: "Freelance & Collaborative Projects",
      location: "Self-Initiated Remote",
      duration: "NOVEMBER 2024 - JULY 2025",
      desc: [
        "Delivered 3+ responsive web interfaces across travel, edtech, and fintech using Figma, Framer, and Webflow; built scalable design systems reducing revision cycles by 40%.",
        "Applied AI-assisted workflows (Claude, ChatGPT, Codex) to accelerate prototyping, compressing delivery timelines by 25% across multiple projects.",
        "Conducted 3+ rounds of usability testing with 10+ participants, resolving critical onboarding and navigation friction points before production handoff.",
      ],
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      bgcolor: "transparent", 
      display: "flex", 
      flexDirection: isMobile ? "column" : "row",
      height: "auto",
      minHeight: 300
    }}>
      <Tabs
        orientation={!isMobile ? "vertical" : "horizontal"}
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        onChange={handleChange}
        sx={{ 
          width: !isMobile ? 250 : "100%",
          minWidth: !isMobile ? 250 : "100%",
          flexShrink: 0,
          borderRight: isMobile ? 0 : "1px solid rgba(255, 255, 255, 0.08)", 
          borderBottom: isMobile ? "1px solid rgba(255, 255, 255, 0.08)" : 0,
          "& .MuiTabs-indicator": {
            backgroundColor: "var(--accent-cyan, #00E5FF)",
            width: isMobile ? "100%" : "3px"
          }
        }}
      >
        {Object.keys(experienceItems).map((key, i) => (
          <Tab 
            key={i} 
            label={key} 
            {...a11yProps(i, isMobile)} 
            sx={{
              color: "var(--text-muted, #94A3B8)",
              fontFamily: "var(--font-heading, 'Outfit', sans-serif)",
              fontSize: "15px",
              fontWeight: 600,
              textAlign: isMobile ? "center" : "left",
              alignItems: isMobile ? "center" : "flex-start",
              textTransform: "none",
              padding: "16px 20px",
              minHeight: "52px",
              width: !isMobile ? "250px" : "auto",
              minWidth: !isMobile ? "250px" : "120px",
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: 1.3,
              "&.Mui-selected": {
                color: "var(--accent-cyan, #00E5FF)",
                backgroundColor: "rgba(0, 229, 255, 0.06)"
              },
              "&:hover": {
                color: "var(--accent-cyan, #00E5FF)",
                backgroundColor: "rgba(0, 229, 255, 0.04)"
              }
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: !isMobile ? 3 : 0 }}>
        {Object.keys(experienceItems).map((key, i) => (
          <TabPanel key={i} value={value} index={i} isMobile={isMobile}>
            <div className="joblist-header-block">
              <span className="joblist-job-title">
                {experienceItems[key]["jobTitle"] + " "}
              </span>
              <span className="joblist-job-company">
                {experienceItems[key]["company"]}
              </span>
            </div>
            <div className="joblist-duration">
              {experienceItems[key]["duration"]}
            </div>
            <ul className="job-description">
              {experienceItems[key]["desc"].map(function (descItem, i) {
                return (
                  <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
                    <li>{descItem}</li>
                  </FadeInSection>
                );
              })}
            </ul>
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default JobList;
