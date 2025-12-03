"use client";

import Image from "next/image";
import smiley from "../../../public/icons/smiley.svg";
import logo from "../../../public/images/LIENDEA.png";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        {/* Explore */}
        <div className="footer-explore">
          <p>EXPLORE</p>
          <div className="footer-links">
            <a href="/projects" className="footer-link">
              Projects
            </a>
            <a href="/about" className="footer-link">
              About
            </a>
            <a href="#top" className="footer-link">
              Back to the top
            </a>
          </div>
        </div>

        {/* Socials */}
        <div className="footer-socials">
          <p>FOLLOW ME</p>
          <div className="footer-links">
            <a
              href="https://www.linkedin.com/in/bengtsson-linda/"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="#" className="footer-link">
              Instagram
            </a>
            <a
              href="https://github.com/Liendea"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <p>SAY HELLO</p>
          <a href="mailto:bengtsson-linda@outlook.com" className="footer-email">
            <span className="footer-smiley">
              <Image
                src={smiley}
                alt="smiley face"
                className="smiley"
                width={24}
                height={24}
              />
            </span>
            bengtsson-linda@outlook.com
          </a>
        </div>
      </div>

      {/* Logo + Copyright */}
      <div className="footer-logo-container">
        <Image
          src={logo}
          alt="Linda Bengtsson Logo"
          className="footer-logo"
          width={1000}
          height={500}
          priority
        />
        <p className="footer-copy">
          <span>© 2025 Linda Bengtsson. </span>
          <span>All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
}
