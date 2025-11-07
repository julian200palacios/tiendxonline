// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleMouseEnter = (category) => {
    setActiveDropdown(category);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleMobileDropdown = (category) => {
    if (mobileDropdown === category) {
      setMobileDropdown(null);
    } else {
      setMobileDropdown(category);
    }
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileDropdown(null);
  };

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = "+573249598631";
    const message = "Hola, me interesa conocer más sobre sus productos";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Array de anuncios - puedes modificar estos mensajes
  const announcements = [
    "Descuentos del 50% en toda la tienda",
    "Envío gratis en compras superiores a $50",
    "Gran oferta: 2x1 en productos seleccionados",
    "Nuevas colecciones disponibles",
    "12 meses sin intereses con todas las tarjetas"
  ];

  // Cambiar anuncios automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [announcements.length]);

  const dropdownItems = {
    hombres: [
      { name: "Camisas", path: "/hombres/camisas" },
      { name: "Pantalones", path: "/hombres/pantalones" },
      { name: "Zapatos", path: "/hombres/zapatos" },
      { name: "Accesorios", path: "/hombres/accesorios" }
    ],
    mujeres: [
      { name: "Vestidos", path: "/mujeres/vestidos" },
      { name: "Blusas", path: "/mujeres/blusas" },
      { name: "Faldas", path: "/mujeres/faldas" },
      { name: "Bolsos", path: "/mujeres/bolsos" }
    ],
    niños: [
      { name: "Ropa Bebé", path: "/ninos/bebe" },
      { name: "Ropa Infantil", path: "/ninos/infantil" },
      { name: "Juguetes", path: "/ninos/juguetes" },
      { name: "Zapatos Niños", path: "/ninos/zapatos" }
    ]
  };

  return (
    <>
      {/* Barra de anuncios */}
      <div className="announcement-uno-navbar">
        <div className="announcement-uno-navbar-content">
          <div className="announcement-uno-navbar-text">
            {announcements[currentAnnouncement]}
          </div>
        </div>
      </div>

      {/* Navbar principal */}
      <nav className="uno-navbar">
        <div className="uno-navbar-content">
          <div className="uno-navbar-main">
            <div className="uno-navbar-logo">
              <Link to="/" onClick={closeMobileMenu}>ti3ndx 0nline</Link>
            </div>

            <div className="uno-navbar-toggle" onClick={toggleMenu}>
              ☰
            </div>
          </div>

          <div className={`uno-navbar-links ${menuOpen ? "uno-navbar-open" : ""}`}>
            <div className="uno-navbar-item">
              <Link to="/" className="uno-navbar-link" onClick={closeMobileMenu}>
                Inicio
              </Link>
            </div>

            <div className="uno-navbar-item">
              <Link to="/" className="uno-navbar-link" onClick={closeMobileMenu}>
                ¡Ofertas!
              </Link>
            </div>

            {/* Enlace de WhatsApp */}
            <div className="uno-navbar-item">
              <span 
                className="uno-navbar-link uno-navbar-whatsapp-link"
                onClick={openWhatsApp}
              >
                <span className="uno-navbar-whatsapp-icon">💬</span>
                WhatsApp
              </span>
            </div>
            
            {/* Dropdown Hombres */}
            <div 
              className="uno-navbar-dropdown-container uno-navbar-item"
              onMouseEnter={() => handleMouseEnter('hombres')}
              onMouseLeave={handleMouseLeave}
            >
              <span 
                className={`uno-navbar-dropdown-trigger uno-navbar-link ${mobileDropdown === 'hombres' ? 'uno-navbar-active' : ''}`}
                onClick={() => handleMobileDropdown('hombres')}
              >
                Hombres
                <span className="uno-navbar-dropdown-arrow">▼</span>
              </span>
              <div className={`uno-navbar-dropdown-menu ${activeDropdown === 'hombres' ? 'uno-navbar-active' : ''}`}>
                {dropdownItems.hombres.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path} 
                    className="uno-navbar-dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dropdown Mujeres */}
            <div 
              className="uno-navbar-dropdown-container uno-navbar-item"
              onMouseEnter={() => handleMouseEnter('mujeres')}
              onMouseLeave={handleMouseLeave}
            >
              <span 
                className={`uno-navbar-dropdown-trigger uno-navbar-link ${mobileDropdown === 'mujeres' ? 'uno-navbar-active' : ''}`}
                onClick={() => handleMobileDropdown('mujeres')}
              >
                Mujeres
                <span className="uno-navbar-dropdown-arrow">▼</span>
              </span>
              <div className={`uno-navbar-dropdown-menu ${activeDropdown === 'mujeres' ? 'uno-navbar-active' : ''}`}>
                {dropdownItems.mujeres.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path} 
                    className="uno-navbar-dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dropdown Niños */}
            <div 
              className="uno-navbar-dropdown-container uno-navbar-item"
              onMouseEnter={() => handleMouseEnter('niños')}
              onMouseLeave={handleMouseLeave}
            >
              <span 
                className={`uno-navbar-dropdown-trigger uno-navbar-link ${mobileDropdown === 'niños' ? 'uno-navbar-active' : ''}`}
                onClick={() => handleMobileDropdown('niños')}
              >
                Niños
                <span className="uno-navbar-dropdown-arrow">▼</span>
              </span>
              <div className={`uno-navbar-dropdown-menu ${activeDropdown === 'niños' ? 'uno-navbar-active' : ''}`}>
                {dropdownItems.niños.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path} 
                    className="uno-navbar-dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;