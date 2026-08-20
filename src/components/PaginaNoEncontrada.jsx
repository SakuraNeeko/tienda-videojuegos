import { Link } from "react-router-dom";

function PaginaNoEncontrada() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "64px", margin: 0, color: "#2563eb" }}>404</h1>
      <h2 style={{ fontSize: "20px", marginTop: "8px" }}>
        Página no encontrada
      </h2>
      <p style={{ color: "#6b7280" }}>
        La dirección que escribiste no existe en esta tienda.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "12px",
          padding: "10px 18px",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "14px",
        }}
      >
        Volver al inventario
      </Link>
    </div>
  );
}

export default PaginaNoEncontrada;