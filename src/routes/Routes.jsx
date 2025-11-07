// src/routes/Routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../components/pages/inicio";
import Productos from "../components/pages/Productos";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ListadoPantalones from "../components/pages/pantalones/listado_pantalones";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      {/* Hacemos que el layout ocupe toda la altura para empujar el footer al final */}
      <div className="content-area" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

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
      <Route
        path="/productos"
        element={
          <Layout>
            <Productos />
          </Layout>
        }
      />

       <Route
        path="/listado_pantalones"
        element={
          <Layout>
            <ListadoPantalones />
          </Layout>
        }
      />


    </Routes>
  </BrowserRouter>
);

export default Rutas;
