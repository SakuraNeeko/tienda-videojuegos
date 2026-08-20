import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import TablaVideojuegos from "./components/TablaVideojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";
import data from "./data/videojuegos";

function App() {
  // Estado central: aquí vive la lista completa de videojuegos.
  const [juegos, setJuegos] = useState(data);
  const location = useLocation();

  // ----- Funciones que modifican el estado -----

  // Agrega un juego nuevo al final de la lista, con un id único.
  const agregar = (juego) => {
    setJuegos([...juegos, { ...juego, id: Date.now() }]);
  };

  // Reemplaza el juego que tenga el mismo id.
  const editar = (juegoEditado) => {
    setJuegos(
      juegos.map((juego) =>
        juego.id === juegoEditado.id ? juegoEditado : juego
      )
    );
  };

  // Deja fuera de la lista al juego con ese id.
  const eliminar = (id) => {
    setJuegos(juegos.filter((juego) => juego.id !== id));
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        color: "#111827",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px 16px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 style={{ fontSize: "24px" }}>Inventario de Videojuegos</h1>
                <p style={{ color: "#6b7280", marginTop: 0 }}>
                  {juegos.length} juegos registrados
                </p>
                <TablaVideojuegos juegos={juegos} onEliminar={eliminar} />
              </>
            }
          />


          <Route
            path="/formulario"
            element={
              <FormularioVideojuego
                key={location.key}
                onAgregar={agregar}
                onEditar={editar}
              />
            }
          />

          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
