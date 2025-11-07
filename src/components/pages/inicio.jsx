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
    color: "#8B4513"
  },
  {
    image: forma3,
    title: "VEGAN-FRIENDLY",
    color: "#8B4513"
  },
  {
    image: forma4,
    title: "GLUTEN FREE",
    color: "#8B4513"
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

  useEffect(() => {
    resetProgress(0);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index);
    setProgress(0);
    resetProgress(0);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

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
        setActiveFeatureIndex(prev =>
          prev === features.length - 1 ? 0 : prev + 1
        );
      } else {
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
      {/* HERO - full-bleed (borde a borde) */}
      <section className="hero-section full-bleed" aria-label="Hero">
        <div className="hero-image-container" role="img" aria-hidden="true">
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

        <div className="controls-overlay" />

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

      {/* FEATURES */}
      <section className="features-section">
        <div className="features-container">
          {/* Inner centrado con max-width para controlar el ancho */}
          <div className="features-inner">
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

            {/* Mobile View - Carousel */}
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

        </div>
      </section>



       {/* ==================== SECCIÓN BEST SELLERS ==================== */}
{/* ==================== SECCIÓN BEST SELLERS ==================== */}
<section className="best-sellers">
  <div className="best-sellers-header">
    <h3 className="best-sellers-subtitle">Best Sellers</h3>
    <h2 className="best-sellers-title">what the girls love</h2>
    <a href="/productos" className="best-sellers-link">View all →</a>
  </div>

  <div className="best-sellers-grid">
    {/* Card 1 */}
    <a href="/listado_pantalones" className="product-card">
      <span className="tag tag--pink">Save $5.50</span>
      <img src={forma1} alt="Producto 1" className="product-img" />
      <h4 className="product-name">Cherry Flambé Matte Lip Whip</h4>
      <p className="product-price">
        <span className="price-current">$16.50</span>
        <span className="price-old">$22.00</span>
      </p>
    </a>

    {/* Card 2 */}
    <a href="/productos/2" className="product-card">
      <div className="tags">
        <span className="tag tag--green">Back in stock!</span>
        <span className="tag tag--pink">Save $5.50</span>
      </div>
      <img src={forma2} alt="Producto 2" className="product-img" />
      <h4 className="product-name">Cranberry Stiletto Matte Lip Whip</h4>
      <p className="product-price">
        <span className="price-current">$16.50</span>
        <span className="price-old">$22.00</span>
      </p>
    </a>

    {/* Card 3 */}
    <a href="/productos/3" className="product-card">
      <span className="tag tag--pink">Save $10.00</span>
      <img src={forma3} alt="Producto 3" className="product-img" />
      <h4 className="product-name">Cookie Jar Vegan Eyelash Collection</h4>
      <p className="product-price">
        <span className="price-current">$30.00</span>
        <span className="price-old">$40.00</span>
      </p>
    </a>

    {/* Card 4 */}
    <a href="/productos/4" className="product-card">
      <div className="tags">
        <span className="tag tag--pink">Save $7.50</span>
      </div>
      <img src={forma4} alt="Producto 4" className="product-img" />
      <h4 className="product-name">Double Dip Eyeshadow Duo</h4>
      <p className="product-price">
        <span className="price-current">$22.50</span>
        <span className="price-old">$30.00</span>
      </p>
    </a>
  </div>
</section>





{/* ==================== SECCIÓN SHOP CATEGORÍAS ==================== */}
<section className="productos-seccion-tres">
  <div className="productos-seccion-tres-container">
    {/* LADO IZQUIERDO - Dos tarjetas */}
    <div className="productos-seccion-tres-left">
      {/* Card FACE */}
      <a href="/categoria/face" className="productos-seccion-tres-card productos-seccion-tres-card--top">
        <div className="productos-seccion-tres-img-container">
          <img 
            src="/src/assets/img-index/seccion3/3seccion1.jpg" 
            alt="Shop Face" 
            className="productos-seccion-tres-img"
          />
        </div>
        <h3 className="productos-seccion-tres-title">SHOP FACE</h3>
      </a>

      {/* Card LIPS */}
      <a href="/categoria/lips" className="productos-seccion-tres-card productos-seccion-tres-card--bottom">
        <div className="productos-seccion-tres-img-container">
          <img 
            src="/src/assets/img-index/seccion3/3seccion2.jpg" 
            alt="Shop Lips" 
            className="productos-seccion-tres-img"
          />
        </div>
        <h3 className="productos-seccion-tres-title">SHOP LIPS</h3>
      </a>
    </div>

    {/* LADO DERECHO - Una tarjeta grande */}
    <div className="productos-seccion-tres-right">
      {/* Card EYES */}
      <a href="/categoria/eyes" className="productos-seccion-tres-card productos-seccion-tres-card--full">
        <div className="productos-seccion-tres-img-container">
          <img 
            src="/src/assets/img-index/seccion3/3seccion3.jpg" 
            alt="Shop Eyes" 
            className="productos-seccion-tres-img"
          />
        </div>
        <h3 className="productos-seccion-tres-title">SHOP EYES</h3>
      </a>
    </div>
  </div>
</section>







{/* ==================== SECCIÓN RECIPE ==================== */}
<section className="imagen-seccion-cuatro">
  <div className="imagen-seccion-cuatro-container">
    {/* Contenido principal */}
    <div className="imagen-seccion-cuatro-content">
      <h2 className="imagen-seccion-cuatro-title">
        THE RECIPE FOR A<br />
        BAKED BEAT
      </h2>
      
      <p className="imagen-seccion-cuatro-description">
        Discover a medley of gourmet ingredients that are vegan-friendly, clean & gluten-free. 
        Where uncompromising quality meets beauty and grace.
      </p>
      
      <a href="/productos" className="imagen-seccion-cuatro-button">
        I'm ready
      </a>
    </div>
  </div>
</section>



    </div>
  );
};

export default Index;
