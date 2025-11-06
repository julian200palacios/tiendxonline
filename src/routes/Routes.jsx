// src/routes/Routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../components/pages/Index";
import Navbar from "../components/layout/Navbar";

/**
 * Layout sencillo: siempre muestra el Navbar (público)
 * y renderiza el contenido en el área principal.
 */
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content-area" style={{ display: "flex" }}>
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </div>
  );
};

/**
 * Componente principal de rutas: sólo la ruta raíz (Index)
 */
const Rutas = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Index />
          </Layout>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Rutas;
