import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { playFunnyClickSound } from "./utils/soundEffects";
import { Analytics } from "@vercel/analytics/react";

// Global click listener to attach the click sound to all buttons across the app
document.addEventListener('click', (e) => {
  const target = e.target.closest('button, .omori-btn-white, .omori-btn-black, .omori-back-btn, .omori-nav-btn, .archive-filter-btn, .omori-view-all-btn, .file-upload-btn, .grid-sub-col a, .method-card, .social-box-item, .project-tab-btn');
  if (target) {
    playFunnyClickSound();
  }
});

console.log("App mounting...");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
      {/* 
        Vercel Analytics: 
        To manually disable analytics, simply comment out or remove the <Analytics /> line below.
      */}
      <Analytics />
    </HashRouter>
  </React.StrictMode>
);
