// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);

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
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-main">
          <div className="navbar-logo">
            <Link to="/" onClick={closeMobileMenu}>Me gusta tomar alcohol</Link>
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
            {/* Solo se muestra en PC con hover */}
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
            {/* Solo se muestra en PC con hover */}
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
            {/* Solo se muestra en PC con hover */}
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
  );
};

export default Navbar;