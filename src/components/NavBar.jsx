import React, { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import "../styles/NavBar.css";

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="navbar"
      data-bs-theme="dark"
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)}
    >
      <Container>
        <Navbar.Brand href="/" className="navbar-brand-custom">
          <img src="/favicon.svg" alt="Logo" className="navbar-logo-img" />
          <span>Sri Sakthi Kumar M</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onSelect={() => setExpanded(false)}>
            <Nav.Link href="/#intro">Home</Nav.Link>
            <Nav.Link href="/#about">About</Nav.Link>
            <Nav.Link href="/#experience">Experience</Nav.Link>
            <Nav.Link href="/#projects">Projects</Nav.Link>
            <Nav.Link href="/#education">Education</Nav.Link>
          </Nav>
          <Nav className="ms-auto" onSelect={() => setExpanded(false)}>
            <Nav.Link href="mailto:srisakthikumar03@gmail.com" title="Email">
              <EmailRoundedIcon style={{ fontSize: 20 }} />
            </Nav.Link>
            <Nav.Link
              href="https://srisakthikumar.framer.website"
              target="_blank"
              title="Framer Portfolio"
            >
              <LanguageRoundedIcon style={{ fontSize: 20 }} />
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/srisakthikumar"
              target="_blank"
              title="LinkedIn"
            >
              <LinkedInIcon style={{ fontSize: 21 }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
