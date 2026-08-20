// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import TablaVideojuegos from "./components/TablaVideojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";
import AlertaNotificacion from "./components/AlertaNotificacion";
import data from "./data/videojuegos";

function App() {
  const location = useLocation();

  // ----- LECTURA INICIAL PEREZOSA (Lazy State Initialization) -----
  // La función solo se ejecuta la primera vez que se monta el componente.
  // Si el navegador ya tiene datos guardados, los usa; si no, carga el mock.
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : data;
  });

  // Alerta flotante (toast). Guardamos un id para reiniciar el temporizador
  // aunque el mensaje se repita.
  const [alerta, setAlerta] = useState(null);

  // ----- ESCRITURA AUTOMÁTICA -----
  // Cada vez que "videojuegos" cambia, se guarda la lista en LocalStorage.
  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
  }, [videojuegos]);

  const mostrarAlerta = (texto) => {
    setAlerta({ id: Date.now(), texto });
  };

  // ----- Funciones CRUD -----

  const agregar = (juego) => {
    setVideojuegos([...videojuegos, { ...juego, id: Date.now() }]);
    mostrarAlerta("Videojuego registrado correctamente");
  };

  const editar = (juegoEditado) => {
    setVideojuegos(
      videojuegos.map((juego) =>
        juego.id === juegoEditado.id ? juegoEditado : juego
      )
    );
    mostrarAlerta("Cambios guardados correctamente");
  };

  const eliminar = (id) => {
    setVideojuegos(videojuegos.filter((juego) => juego.id !== id));
    mostrarAlerta("Videojuego eliminado de la lista");
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

      {/* La alerta solo existe en el DOM mientras hay un mensaje activo */}
      {alerta && (
        <AlertaNotificacion
          key={alerta.id}
          mensaje={alerta.texto}
          onCerrar={() => setAlerta(null)}
        />
      )}

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px 16px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 style={{ fontSize: "24px" }}>Inventario de Videojuegos</h1>
                <p style={{ color: "#6b7280", marginTop: 0 }}>
                  {videojuegos.length} juegos registrados
                </p>
                <TablaVideojuegos juegos={videojuegos} onEliminar={eliminar} />
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