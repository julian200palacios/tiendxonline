import React, { useMemo, useState, useEffect } from "react";
import pantalonesData from "../../../json/json-pantalones/pantalones.json";
import "../../../styles/ListadoPantalones.css";

const currency = (value) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(
    value
  );

const ListadoPantalones = () => {
  const listaOriginal = Array.isArray(pantalonesData)
    ? pantalonesData
    : [pantalonesData];

  const [filterTipo, setFilterTipo] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterPublico, setFilterPublico] = useState("");
  const [filterMarca, setFilterMarca] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("best");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 12 productos por página

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterTipo, filterCategoria, filterPublico, filterMarca, filterColor, inStockOnly, sortBy]);

  const opciones = useMemo(() => {
    const tipos = new Set();
    const categorias = new Set();
    const publicos = new Set();
    const marcas = new Set();
    const colores = new Set();
    
    listaOriginal.forEach((p) => {
      if (p.tipo_producto) tipos.add(p.tipo_producto);
      if (p.categoria_pantalon) categorias.add(p.categoria_pantalon);
      if (p.publico_orientado) publicos.add(p.publico_orientado);
      if (p.marca) marcas.add(p.marca);
      if (p.detalles && p.detalles.Color) colores.add(p.detalles.Color);
    });
    
    return {
      tipos: Array.from(tipos),
      categorias: Array.from(categorias),
      publicos: Array.from(publicos),
      marcas: Array.from(marcas),
      colores: Array.from(colores),
    };
  }, [listaOriginal]);

  const listaFiltrada = useMemo(() => {
    console.log("Filtrando con:", {
      filterTipo, filterCategoria, filterPublico, filterMarca, filterColor, inStockOnly
    });

    let items = listaOriginal.filter((p) => {
      // Filtro por tipo
      if (filterTipo && p.tipo_producto !== filterTipo) {
        console.log("Filtrado por tipo:", p.tipo_producto, filterTipo);
        return false;
      }
      
      // Filtro por categoría
      if (filterCategoria && p.categoria_pantalon !== filterCategoria) {
        console.log("Filtrado por categoría:", p.categoria_pantalon, filterCategoria);
        return false;
      }
      
      // Filtro por público
      if (filterPublico && p.publico_orientado !== filterPublico) {
        console.log("Filtrado por público:", p.publico_orientado, filterPublico);
        return false;
      }
      
      // Filtro por marca
      if (filterMarca && p.marca !== filterMarca) {
        console.log("Filtrado por marca:", p.marca, filterMarca);
        return false;
      }
      
      // Filtro por color
      if (filterColor && p.detalles && p.detalles.Color !== filterColor) {
        console.log("Filtrado por color:", p.detalles?.Color, filterColor);
        return false;
      }
      
      // Filtro por stock
      if (inStockOnly) {
        const stock = parseInt(p.inventario) || 0;
        if (stock <= 0) {
          console.log("Filtrado por stock:", stock);
          return false;
        }
      }
      
      return true;
    });

    console.log("Productos después de filtrar:", items.length);

    // Ordenamiento
    const getEffectivePrice = (p) => {
      const price = parseInt(p.precio) || 0;
      const pct = parseInt((p.porcentaje_descuento || "").toString().replace('%', '')) || 0;
      if (pct > 0) return Math.round(price * (1 - pct / 100));
      return price;
    };

    switch (sortBy) {
      case "price-asc":
        items.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
        break;
      case "price-desc":
        items.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
        break;
      case "a-z":
        items.sort((a, b) =>
          (a.producto || "").localeCompare(b.producto || "", "es", {
            sensitivity: "base",
          })
        );
        break;
      case "z-a":
        items.sort((a, b) =>
          (b.producto || "").localeCompare(a.producto || "", "es", {
            sensitivity: "base",
          })
        );
        break;
      default:
        // Best selling - por defecto
        break;
    }

    return items;
  }, [
    listaOriginal,
    filterTipo,
    filterCategoria,
    filterPublico,
    filterMarca,
    filterColor,
    inStockOnly,
    sortBy,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(listaFiltrada.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = listaFiltrada.slice(startIndex, startIndex + productsPerPage);

  const resetFilters = () => {
    setFilterTipo("");
    setFilterCategoria("");
    setFilterPublico("");
    setFilterMarca("");
    setFilterColor("");
    setInStockOnly(false);
    setSortBy("best");
    setCurrentPage(1);
  };

  const handleWhatsAppClick = (product) => {
    const message = `hola, estoy interesado en este producto ${product.id_producto} - ${product.producto}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/573249598631?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="page-pantalones lip-whip-style">

      <div>

        <h1>Hola</h1>
        <h1>Hola</h1>

        <h1>Hola</h1>
      </div>
      <div className="container lip-container">
        <div className="content-wrapper lip-content-wrapper">
          {/* Sidebar */}
          <aside className="sidebar-filters lip-sidebar">
            <div className="filters-title lip-filters-title">
              <svg className="icon-filter" viewBox="0 0 24 24" width="18" height="18">
                <path d="M3 5h18v2H3zM6 11h12v2H6zM10 17h4v2h-4z" fill="currentColor" />
              </svg>
              <span>Filter</span>
            </div>

            <div className="filter-section">
              <div className="filter-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  In stock only
                </label>
              </div>

              <div className="filter-category">
                <div className="filter-header">Tipo</div>
                <select 
                  value={filterTipo} 
                  onChange={(e) => setFilterTipo(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Todos</option>
                  {opciones.tipos.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-category">
                <div className="filter-header">Categoría</div>
                <select 
                  value={filterCategoria} 
                  onChange={(e) => setFilterCategoria(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Todas</option>
                  {opciones.categorias.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-category">
                <div className="filter-header">Público</div>
                <select 
                  value={filterPublico} 
                  onChange={(e) => setFilterPublico(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Todos</option>
                  {opciones.publicos.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-category">
                <div className="filter-header">Marca</div>
                <select 
                  value={filterMarca} 
                  onChange={(e) => setFilterMarca(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Todas</option>
                  {opciones.marcas.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-category">
                <div className="filter-header">Color</div>
                <select 
                  value={filterColor} 
                  onChange={(e) => setFilterColor(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Todos</option>
                  {opciones.colores.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-actions">
                <button className="btn-clear lip-clear-btn" onClick={resetFilters}>
                  Clear Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="main-products lip-main">
            <div className="top-bar lip-top-bar">
              <div className="sort-by lip-sort-by">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select-sort lip-select">
                  <option value="best">Best selling</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="a-z">A - Z</option>
                  <option value="z-a">Z - A</option>
                </select>
              </div>

              <div className="results-count lip-results">
                {listaFiltrada.length} result{listaFiltrada.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="grid-pantalones lip-grid">
              {currentProducts.length === 0 ? (
                <div className="no-results">No hay productos que coincidan</div>
              ) : (
                currentProducts.map((p) => {
                  const price = parseInt(p.precio) || 0;
                  const pct = parseInt((p.porcentaje_descuento || "").toString().replace('%', '')) || 0;
                  const discounted = pct > 0 ? Math.round(price * (1 - pct / 100)) : null;
                  const stock = parseInt(p.inventario) || 0;

                  return (
                    <article key={p.id_producto} className="card-pantalon lip-card">
                      <div className="img-wrap lip-img-wrap">
                        <img src={p.imagenes?.foto1 || ""} alt={p.producto} loading="lazy" />
                        <div className="badges lip-badges">
                          {pct > 0 && (
                            <span className="badge-discount lip-badge-discount">
                              Save {pct}%
                            </span>
                          )}
                          {stock > 0 ? (
                            <span className="badge-stock lip-badge-stock">In stock</span>
                          ) : (
                            <span className="badge-out lip-badge-out">Out of stock</span>
                          )}
                        </div>
                      </div>

                      <div className="card-body lip-card-body">
                        <h3 className="card-title lip-card-title">{p.producto}</h3>

                        <div className="price-row lip-price-row">
                          {discounted !== null ? (
                            <>
                              <span className="price-discount lip-price-discount">{currency(discounted)}</span>
                              <span className="price-old lip-price-old">{currency(price)}</span>
                            </>
                          ) : (
                            <span className="price-single lip-price-single">{currency(price)}</span>
                          )}
                        </div>

                        <button 
                          className="whatsapp-btn lip-whatsapp-btn"
                          onClick={() => handleWhatsAppClick(p)}
                          title="Contactar por WhatsApp"
                        >
                          <span className="whatsapp-emoji">💬</span>
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination lip-pagination">
                <button 
                  className="pagination-btn" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                
                <div className="pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ListadoPantalones;