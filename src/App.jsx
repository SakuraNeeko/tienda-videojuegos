import { useState } from "react";
import TablaVideojuegos from "./components/TablaVideojuegos";
import data from "./data/Videojuegos";

function App() {
  // Estado local con la lista de videojuegos (cargada desde el mock data)
  const [juegos] = useState(data);

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "30px 16px",
        color: "#111827",
      }}
    >
      <h1 style={{ fontSize: "26px", marginBottom: "4px" }}>
        Tienda de Videojuegos
      </h1>
      <p style={{ color: "#6b7280", marginTop: 0, marginBottom: "20px" }}>
        {juegos.length} juegos en el catálogo
      </p>

      <TablaVideojuegos juegos={juegos} />
    </div>
  );
}

export default App;
