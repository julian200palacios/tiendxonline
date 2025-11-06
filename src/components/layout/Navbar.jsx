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
      <div className="announcement-bar">
        <div className="announcement-content">
          <div className="announcement-text">
            {announcements[currentAnnouncement]}
          </div>
        </div>
      </div>

      {/* Navbar principal */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-main">
            <div className="navbar-logo">
              <Link to="/" onClick={closeMobileMenu}>ti3ndx 0nline</Link>
            </div>

            <div className="navbar-toggle" onClick={toggleMenu}>
              ☰
            </div>
          </div>

          <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
            <div className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMobileMenu}>
                Inicio
              </Link>
            </div>

            <div className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMobileMenu}>
                ¡Ofertas!
              </Link>
            </div>

            {/* Enlace de WhatsApp */}
            <div className="nav-item">
              <span 
                className="nav-link whatsapp-link"
                onClick={openWhatsApp}
              >
                <span className="whatsapp-icon">💬</span>
                WhatsApp
              </span>
            </div>
            
            {/* Dropdown Hombres */}
            <div 
              className="dropdown-container nav-item"
              onMouseEnter={() => handleMouseEnter('hombres')}
              onMouseLeave={handleMouseLeave}
            >
              <span 
                className={`dropdown-trigger nav-link ${mobileDropdown === 'hombres' ? 'active' : ''}`}
                onClick={() => handleMobileDropdown('hombres')}
              >
                Hombres
                <span className="dropdown-arrow">▼</span>
              </span>
              <div className={`dropdown-menu ${activeDropdown === 'hombres' ? 'active' : ''}`}>
                {dropdownItems.hombres.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path} 
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dropdown Mujeres */}
            <div 
              className="dropdown-container nav-item"
              onMouseEnter={() => handleMouseEnter('mujeres')}
              onMouseLeave={handleMouseLeave}
            >
              <span 
                className={`dropdown-trigger nav-link ${mobileDropdown === 'mujeres' ? 'active' : ''}`}
                onClick={() => handleMobileDropdown('mujeres')}
              >
                Mujeres
                <span className="dropdown-arrow">▼</span>
              </span>
              <div className={`dropdown-menu ${activeDropdown === 'mujeres' ? 'active' : ''}`}>
                {dropdownItems.mujeres.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path} 
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dropdown Niños */}
            <div 
              className="dropdown-container nav-item"
              onMouseEnter={() => handleMouseEnter('niños')}
              onMouseLeave={handleMouseLeave}
            >
              <span 
                className={`dropdown-trigger nav-link ${mobileDropdown === 'niños' ? 'active' : ''}`}
                onClick={() => handleMobileDropdown('niños')}
              >
                Niños
                <span className="dropdown-arrow">▼</span>
              </span>
              <div className={`dropdown-menu ${activeDropdown === 'niños' ? 'active' : ''}`}>
                {dropdownItems.niños.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path} 
                    className="dropdown-item"
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