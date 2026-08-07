import React, { useState, useEffect } from "react";
import "../styles/Contact.css";
import FadeInSection from "./FadeInSection";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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
  const [popupState, setPopupState] = useState({ show: false, message: "", type: "success" });

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
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const clearFile = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, file: null }));
    // Also clear the file input value so the same file can be selected again
    const fileInput = document.getElementById("brief-upload");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const data = new FormData();
    data.append("access_key", "d1ba120c-a4aa-4456-82e7-cffdfab0f308");
    data.append("name", formData.name || "N/A");
    data.append("email", formData.email || "N/A");
    data.append("company", formData.company || "N/A");
    data.append("subject", "New Inquiry from Portfolio");
    data.append("message", `Name: ${formData.name || "N/A"}\nCompany: ${formData.company || "N/A"}\nProject Details: ${formData.subject || "N/A"}\nEmail: ${formData.email || "N/A"}\nPhone: ${formData.phone || "N/A"}`);
    
    if (formData.file) {
      data.append("attachment", formData.file);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      
      const result = await response.json();
      if (result.success) {
        setPopupState({ show: true, message: "Message sent successfully! I will get back to you soon.", type: "success" });
        setFormData({
          name: "",
          company: "",
          subject: "",
          email: "",
          phone: "",
          file: null,
        });
        setIsAutoTyping(true);
      } else {
        setPopupState({ show: true, message: "Failed to send message: " + result.message, type: "error" });
      }
    } catch (error) {
      console.error(error);
      setPopupState({ show: true, message: "Something went wrong! Please try again.", type: "error" });
    } finally {
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
          <form className="madlibs-form" onSubmit={handleSubmit} onBlur={handleBlur}>
            <div className="madlibs-text">
              Hello Sri Sakthi, my name is{" "}
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
                  onChange={handleFileChange}
                  className="file-input-hidden"
                />
                <label htmlFor="brief-upload" className="file-upload-btn">
                  <span className="retro-icon-frame blue">
                    <AttachFileRoundedIcon style={{ fontSize: 13, color: "#FFFFFF" }} />
                  </span>
                  <span>{formData.file ? formData.file.name : "ATTACH BRIEF"}</span>
                </label>
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
              <span className="submit-btn-text">OK</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
