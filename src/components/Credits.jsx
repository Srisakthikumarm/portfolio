import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Credits = () => {
  return (
    <FadeInSection>
      <div id="credits">
        <div className="credits-divider" />
        <div className="ending-credits">
          <div className="credits-brand">Sri Sakthi Kumar M</div>
          <div className="credits-sub">
            <span>Designed & Built with</span>
            <FavoriteIcon style={{ fontSize: 14, color: "#FF5252", margin: "0 2px" }} />
            <span>for UI/UX & Frontend Excellence</span>
          </div>
          <div className="credits-copy">
            © 2026 Sri Sakthi Kumar M. All rights reserved.
          </div>
        </div>
      </div>
    </FadeInSection>
  );
};

export default Credits;
