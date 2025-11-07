import React, { useEffect, useRef, useState } from "react";
import "../../styles/Home.css";

// Desktop images
import index1 from "../../assets/img-index/index1.jpg";
import index2 from "../../assets/img-index/index2.jpg";
// Mobile images
import index1Movil from "../../assets/img-index/index1Movil.jpg";
import index2Movil from "../../assets/img-index/index2Movil.jpg";

// Features images
import forma1 from "../../assets/img-index/2formas1.png";
import forma2 from "../../assets/img-index/2formas2.png";
import forma3 from "../../assets/img-index/2formas3.png";
import forma4 from "../../assets/img-index/2formas4.png";

const AUTOPLAY_MS = 3000;

const slides = [
  {
    desktop: index1,
    mobile: index1Movil,
    alt: "Slide 1",
  },
  {
    desktop: index2,
    mobile: index2Movil,
    alt: "Slide 2",
  },
];

const features = [
  {
    image: forma1,
    title: "CRUELTY-FREE",
    color: "#8B4513" // Marrón para todos
  },
  {
    image: forma2,
    title: "SMUDGE-PROOF OFFERINGS",
    color: "#8B4513" // Marrón para todos
  },
  {
    image: forma3,
    title: "VEGAN-FRIENDLY",
    color: "#8B4513" // Marrón para todos
  },
  {
    image: forma4,
    title: "GLUTEN FREE",
    color: "#8B4513" // Marrón para todos
  }
];

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const tickRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Reinicia el progreso (y reinicia el timer)
  const resetProgress = (start = 0) => {
    setProgress(start);
    if (tickRef.current) clearInterval(tickRef.current);

    const intervalMs = 100;
    const steps = AUTOPLAY_MS / intervalMs;
    const increment = 100 / steps;

    tickRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + increment;
        if (next >= 100) {
          setActiveIndex((prev) => (prev + 1) % slides.length);
          return 0;
        }
        return next;
      });
    }, intervalMs);
  };

  // inicia autoplay en mount
  useEffect(() => {
    resetProgress(0);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Si cambia la imagen manualmente, reiniciamos el progreso
  const handleClick = (index) => {
    setActiveIndex(index);
    setProgress(0);
    resetProgress(0);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Touch events para móvil - CORREGIDO
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swipe izquierda - siguiente
        setActiveFeatureIndex(prev => 
          prev === features.length - 1 ? 0 : prev + 1
        );
      } else {
        // Swipe derecha - anterior
        setActiveFeatureIndex(prev => 
          prev === 0 ? features.length - 1 : prev - 1
        );
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="home-page no-text">
      <section className="hero-section">
        {/* Contenedor para las imágenes */}
        <div className="hero-image-container">
          {/* Imagen para DESKTOP */}
          <img
            src={slides[activeIndex].desktop}
            alt={slides[activeIndex].alt}
            className={`hero-image hero-image--desktop fade-in ${imageLoaded ? 'loaded' : ''}`}
            draggable={false}
            onLoad={handleImageLoad}
          />

          {/* Imagen para MOBILE */}
          <img
            src={slides[activeIndex].mobile}
            alt={slides[activeIndex].alt + " mobile"}
            className={`hero-image hero-image--mobile fade-in ${imageLoaded ? 'loaded' : ''}`}
            draggable={false}
            onLoad={handleImageLoad}
          />
        </div>

        {/* Overlay para controles */}
        <div className="controls-overlay"></div>

        {/* Controles: botones 1 y 2 - CORREGIDO */}
        <div className="slider-controls" aria-hidden="false">
          {slides.map((_, index) => {
            const progressForButton =
              index === activeIndex ? Math.min(Math.max(progress, 0), 100) : 0;
            return (
              <button
                key={index}
                className={`slider-btn ${activeIndex === index ? "active" : ""}`}
                onClick={() => handleClick(index)}
                aria-label={`Ir a imagen ${index + 1}`}
                style={{ ["--p"]: `${progressForButton}%` }}
                type="button"
              >
                <span className="slider-btn-number">{index + 1}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          {/* Desktop View - Todas las features en línea */}
          <div className="features-desktop">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-image-container">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="feature-image"
                  />
                </div>
                <h3 
                  className="feature-title"
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Mobile View - Carousel CORREGIDO */}
          <div 
            className="features-mobile"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="features-carousel-wrapper">
              <div className="feature-slide active">
                <div className="feature-image-container">
                  <img 
                    src={features[activeFeatureIndex].image} 
                    alt={features[activeFeatureIndex].title}
                    className="feature-image"
                  />
                </div>
                <h3 
                  className="feature-title"
                  style={{ color: features[activeFeatureIndex].color }}
                >
                  {features[activeFeatureIndex].title}
                </h3>
              </div>
            </div>

            {/* Indicadores de puntos */}
            <div className="feature-indicators">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`feature-indicator ${index === activeFeatureIndex ? 'active' : ''}`}
                  onClick={() => setActiveFeatureIndex(index)}
                  aria-label={`Ir a feature ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;