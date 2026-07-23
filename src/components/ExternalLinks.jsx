import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";

const ExternalLinks = ({ githubLink, openLink }) => {
  return (
    <span className="external-links">
      {githubLink && (
        <a
          className="github-icon"
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          title={githubLink.includes("linkedin.com") ? "LinkedIn Profile" : "Live Site"}
        >
          {githubLink.includes("linkedin.com") ? (
            <LinkedInIcon sx={{ fontSize: 20, color: "inherit" }} />
          ) : (
            <LanguageRoundedIcon sx={{ fontSize: 20, color: "inherit" }} />
          )}
        </a>
      )}
      {openLink && openLink !== githubLink && (
        <a
          className="open-icon"
          href={openLink}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Live Showcase"
        >
          <OpenInBrowserIcon sx={{ fontSize: 20, color: "inherit" }} />
        </a>
      )}
    </span>
  );
};

export default ExternalLinks;
