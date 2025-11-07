// src/components/layout/Footer.jsx
import React from "react";
import "../../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="footer-inner">
        {/* LEFT - logo + newsletter + socials + payments */}
        <div className="footer-left">
          <div className="footer-logo">
            {/* Si tienes un logo svg/png, reemplaza el texto por <img src="/ruta/logo.png" alt="..." /> */}
            <span className="logo-script">beauty bakerie.</span>
          </div>

          <h3 className="newsletter-title">LET'S KEEP IN TOUCH</h3>

          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="footer-email" className="visually-hidden">Email</label>
            <input id="footer-email" type="email" placeholder="E-mail" className="newsletter-input" />
            <button className="newsletter-btn" aria-label="Suscribirme" type="submit">›</button>
          </form>

          <div className="socials-row" aria-hidden="false">
            <a className="social" href="#" aria-label="TikTok"><FaTiktok /></a>
            <a className="social" href="#" aria-label="Instagram"><FaInstagram /></a>
            <a className="social" href="#" aria-label="YouTube"><FaYoutube /></a>
            <a className="social" href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a className="social" href="#" aria-label="Pinterest"><FaPinterestP /></a>
          </div>

          <div className="payments-row" aria-hidden="true">
            {/* Usa imágenes reales de tus logos de pago aquí si las tienes */}
            <span className="pay-badge">AMEX</span>
            <span className="pay-badge">APPLE PAY</span>
            <span className="pay-badge">DISCOVER</span>
            <span className="pay-badge">PAYPAL</span>
            <span className="pay-badge">VISA</span>
            <span className="pay-badge">MC</span>
          </div>
        </div>

        {/* RIGHT - columnas de enlaces (Our Story / Support / General) */}
        <div className="footer-right">
          <div className="footer-column">
            <h4 className="col-title">Our Story</h4>
            <p className="col-text">Founded in 2011, <a href="#">learn more here</a>.</p>
          </div>

          <div className="footer-column">
            <h4 className="col-title">Support</h4>
            <ul className="col-list">
              <li><a href="#">Customer Care</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Opt Out</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="col-title">General</h4>
            <ul className="col-list">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer-column footer-right-extra">
            <div className="country-select">
              <span className="flag">🇨🇴</span> Colombia (USD $) <span className="chev">▾</span>
            </div>
            <div className="contrast-toggle">
              <span className="contrast-dot">⚪</span> High Contrast Mode
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} beauty bakerie. — All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
