/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect, no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Contact.css";
import FadeInSection from "./FadeInSection";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { playFunnyClickSound } from "../utils/soundEffects";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    subject: "",
    email: "",
    phone: "",
    file: null,
  });

  const [isAutoTyping, setIsAutoTyping] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const location = useLocation();
  const [popupState, setPopupState] = useState({ show: false, message: "", type: "success" });

  const iframeRef = useRef(null);

  useEffect(() => {
    setShowPreviewModal(false);
  }, [location.pathname, location.hash]);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!isAutoTyping) return;

    const TARGETS = [
      { key: "name", text: "John Doe" },
      { key: "company", text: "Tech Solutions" },
      { key: "subject", text: "a new website" },
      { key: "email", text: "hello@example.com" },
      { key: "phone", text: "+1 234 567 8900" },
    ];

    let currentGlobalLength = 0;
    let isDeleting = false;
    let timeoutId;
    const maxGlobalLength = TARGETS.reduce((sum, t) => sum + t.text.length, 0);

    const typeStep = () => {
      let remaining = currentGlobalLength;
      const newVals = {};
      
      for (const t of TARGETS) {
        const take = Math.min(remaining, t.text.length);
        newVals[t.key] = t.text.slice(0, take);
        remaining -= take;
      }

      setFormData(prev => ({
        ...prev,
        ...newVals
      }));

      if (!isDeleting && currentGlobalLength === maxGlobalLength) {
        isDeleting = true;
        timeoutId = setTimeout(typeStep, 2000); // pause at end
      } else if (isDeleting && currentGlobalLength === 0) {
        isDeleting = false;
        timeoutId = setTimeout(typeStep, 1000); // pause at start
      } else {
        currentGlobalLength += isDeleting ? -1 : 1;
        const speed = isDeleting ? 20 : 70 + Math.random() * 40;
        timeoutId = setTimeout(typeStep, speed);
      }
    };

    timeoutId = setTimeout(typeStep, 1000);

    return () => clearTimeout(timeoutId);
  }, [isAutoTyping]);

  const handleFocus = () => {
    if (isAutoTyping) {
      setIsAutoTyping(false);
      setFormData({
        name: "",
        company: "",
        subject: "",
        email: "",
        phone: "",
        file: null,
      });
    }
  };

  const handleBlur = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) {
      return;
    }
    if (!formData.name && !formData.company && !formData.subject && !formData.email && !formData.phone && !formData.file) {
      setIsAutoTyping(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, file }));
      setFileType(file.type);
      
      // Cleanup previous preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearFile = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, file: null }));
    setFileType("");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    // Also clear the file input value so the same file can be selected again
    const fileInput = document.getElementById("brief-upload");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = (e) => {
    if (isAutoTyping) {
      e.preventDefault();
      handleFocus();
      setPopupState({ show: true, message: "Please fill in your actual details before sending.", type: "error" });
      return;
    }
    // We let the browser perform native form submission to the hidden iframe
    setIsSubmitting(true);
  };

  const handleIframeLoad = () => {
    if (isSubmitting) {
      setPopupState({ show: true, message: "Message sent successfully! I will get back to you soon.", type: "success" });
      setFormData({
        name: "",
        company: "",
        subject: "",
        email: "",
        phone: "",
        file: null,
      });
      setFileType("");
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setIsAutoTyping(true);
      setIsSubmitting(false);
    }
  };

  // Helper to dynamically size inputs based on content (using ch units for monospace)
  const getWidth = (text, minChars) => {
    return (Math.max(minChars, text.length) + 1) + "ch";
  };

  return (
    <div id="contact">
      <FadeInSection>
        <div className="section-header">
          <span className="section-number">06</span>
          <span className="section-title">LET'S TALK</span>
        </div>
        
        <div className="contact-wrapper">
          <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: "none" }} onLoad={handleIframeLoad}></iframe>
          <form 
            className="madlibs-form" 
            onSubmit={handleSubmit} 
            onBlur={handleBlur}
            action="https://formsubmit.co/srisakthikumar03@gmail.com"
            method="POST"
            encType="multipart/form-data"
            target="hidden_iframe"
          >
            <input type="hidden" name="_subject" value="New Inquiry from Portfolio" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="madlibs-text">
              Hello Sri Sakthi Kumar M, my name is{" "}
              <input
                type="text"
                name="name"
                placeholder="your name"
                value={formData.name}
                onChange={handleChange}
                onFocus={handleFocus}
                style={{ width: getWidth(formData.name, 9) }}
                required
              />
              {" "}from{" "}
              <input
                type="text"
                name="company"
                placeholder="company/brand"
                value={formData.company}
                onChange={handleChange}
                onFocus={handleFocus}
                style={{ width: getWidth(formData.company, 13) }}
              />
              {" "}and I would like to discuss{" "}
              <input
                type="text"
                name="subject"
                placeholder="project details"
                value={formData.subject}
                onChange={handleChange}
                onFocus={handleFocus}
                style={{ width: getWidth(formData.subject, 15) }}
                required
              />
              . Here's my project brief{" "}
              
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="brief-upload"
                  name="attachment"
                  onChange={handleFileChange}
                  className="file-input-hidden"
                />
                {!formData.file ? (
                  <label htmlFor="brief-upload" className="file-upload-btn">
                    <span className="retro-icon-frame blue">
                      <AttachFileRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                    </span>
                    <span>ATTACH BRIEF</span>
                  </label>
                ) : (
                  <div 
                    className="file-upload-btn attached-mode" 
                    onClick={() => setShowPreviewModal(true)}
                    title="Click to preview attachment"
                  >
                    <span className="retro-icon-frame blue">
                      <AttachFileRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                    </span>
                    <span>{formData.file.name}</span>
                  </div>
                )}
                {formData.file && (
                  <button type="button" className="clear-file-btn" onClick={clearFile} aria-label="Remove attachment" title="Remove attachment">
                    <CloseRoundedIcon style={{ fontSize: 20 }} />
                  </button>
                )}
              </div>

              {" "}You can reach me by email at{" "}
              <input
                type="email"
                name="email"
                placeholder="email address"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                style={{ width: getWidth(formData.email, 13) }}
                required
              />
              {" "}or by phone at{" "}
              <input
                type="tel"
                name="phone"
                placeholder="phone number"
                value={formData.phone}
                onChange={handleChange}
                onFocus={handleFocus}
                style={{ width: getWidth(formData.phone, 12) }}
              />
              .
            </div>



            <div className="contact-footer" style={{ justifyContent: "flex-end" }}>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                <span className="retro-icon-frame green">
                  <ArrowForwardRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                </span>
                <span className="submit-btn-text">
                  {isSubmitting ? "SENDING..." : "SEND INQUIRY"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </FadeInSection>

      {popupState.show && (
        <div className="retro-popup-overlay">
          <div className="retro-popup-box">
            <h3 className="retro-popup-title">
              {popupState.type === "success" ? "SUCCESS" : "ERROR"}
            </h3>
            <p className="retro-popup-message">{popupState.message}</p>
            <button 
              className="submit-btn" 
              onClick={() => setPopupState({ ...popupState, show: false })}
              style={{ marginTop: "24px", padding: "8px 24px" }}
            >
              <span className={`retro-icon-frame ${popupState.type === "success" ? "green" : "coral"}`}>
                {popupState.type === "success" ? (
                  <CheckRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                ) : (
                  <CloseRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                )}
              </span>
              <span className="submit-btn-text">OK</span>
            </button>
          </div>
        </div>
      )}

      {showPreviewModal && previewUrl && (
        <div className="retro-popup-overlay" onClick={() => setShowPreviewModal(false)}>
          <div className="retro-preview-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="retro-popup-title">ATTACHMENT PREVIEW</h3>
            <p className="preview-filename-modal">{formData.file?.name}</p>
            
            <div className="preview-modal-content">
              {(fileType || "").startsWith("image/") ? (
                <img src={previewUrl} alt="Attachment Preview" className="preview-image-large" />
              ) : (fileType || "") === "application/pdf" ? (
                <iframe src={previewUrl} title="PDF Preview" className="preview-iframe-large" />
              ) : (
                <div className="unsupported-preview-large">
                  <span>No visual preview available for {fileType || "this file type"}.</span>
                </div>
              )}
            </div>

            <div className="preview-modal-controls">
              <button 
                className="submit-btn cancel-btn" 
                onClick={() => { playFunnyClickSound(); setShowPreviewModal(false); }}
              >
                <span className="retro-icon-frame">
                  <CloseRoundedIcon style={{ fontSize: 13, color: "#000000" }} className="modal-icon" />
                </span>
                <span>CANCEL</span>
              </button>
              
              <button 
                className="submit-btn change-btn" 
                onClick={() => { playFunnyClickSound(); document.getElementById("brief-upload").click(); setShowPreviewModal(false); }}
              >
                <span className="retro-icon-frame blue">
                  <EditRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} className="modal-icon-change" />
                </span>
                <span>CHANGE</span>
              </button>

              <button 
                className="submit-btn modal-remove-btn" 
                onClick={(e) => { playFunnyClickSound(); clearFile(e); setShowPreviewModal(false); }}
              >
                <span className="retro-icon-frame coral">
                  <DeleteRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} className="modal-icon-remove" />
                </span>
                <span>REMOVE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
