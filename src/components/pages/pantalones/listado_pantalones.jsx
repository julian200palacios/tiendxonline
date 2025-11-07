import React from "react";
import pantalonesData from "../../../json/json-pantalones/pantalones.json";
import "../../../styles/ListadoPantalones.css";

const ListadoPantalones = () => {
  // Si el JSON no es un array, lo convertimos en uno
  const listaPantalones = Array.isArray(pantalonesData)
    ? pantalonesData
    : [pantalonesData];

  return (
    <div className="contenedor-listado">
      <h1 className="titulo-listado">Pantalones</h1>
      <div className="grid-pantalones">
        {listaPantalones && listaPantalones.length > 0 ? (
          listaPantalones.map((pantalon) => (
            <div key={pantalon.id_producto} className="card-pantalon">
              <img
                src={pantalon.imagenes?.foto1 || ""}
                alt={pantalon.producto}
                className="imagen-pantalon"
              />
              <h2 className="nombre-pantalon">{pantalon.producto}</h2>
              <p className="info-pantalon">
                <strong>Orientado a:</strong> {pantalon.publico_orientado}
              </p>
              <p className="info-pantalon">
                <strong>Categoría:</strong> {pantalon.categoria_pantalon}
              </p>
              <p className="info-pantalon">
                <strong>Medidas:</strong>{" "}
                {pantalon.medidas_disponibles?.join(", ")}
              </p>
            </div>
          ))
        ) : (
          <p>No hay datos de pantalones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ListadoPantalones;
