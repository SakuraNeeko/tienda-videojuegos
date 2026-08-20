import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

function FormularioVideojuego({ onAgregar, onEditar }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Si venimos desde el botón "Editar", el juego llega en location.state.
  // Si venimos desde "Nuevo Juego", no hay nada y queda undefined.
  const juegoAEditar = location.state?.juego;

  // Valores iniciales: los del juego a editar, o un formulario en blanco.
  const [form, setForm] = useState(
    juegoAEditar || {
      titulo: "",
      genero: "Aventura",
      plataforma: "PC",
      lanzamiento: 2025,
      precio: 0,
      disponible: true,
      progreso: 0,
    }
  );

  // Un solo manejador para todos los inputs.
  // Los checkbox usan "checked"; el resto usa "value".
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const guardar = () => {
    if (form.titulo.trim() === "") {
      alert("Escribe el título del videojuego.");
      return;
    }

    // Los inputs devuelven texto, así que convertimos los números.
    const datos = {
      ...form,
      lanzamiento: Number(form.lanzamiento),
      precio: Number(form.precio),
      progreso: Number(form.progreso),
    };

    if (juegoAEditar) {
      onEditar(datos);
    } else {
      onAgregar(datos);
    }

    navigate("/"); // vuelve a la tabla
  };

  return (
    <div className="formulario">
      <h1>{juegoAEditar ? "Editar Videojuego" : "Registrar Videojuego"}</h1>

      <label>
        Título
        <input
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Ej: Elden Ring"
        />
      </label>

      <label>
        Género
        <select name="genero" value={form.genero} onChange={handleChange}>
          <option value="Aventura">Aventura</option>
          <option value="RPG de acción">RPG de acción</option>
          <option value="RPG por turnos">RPG por turnos</option>
          <option value="Acción">Acción</option>
          <option value="Carreras">Carreras</option>
          <option value="Metroidvania">Metroidvania</option>
          <option value="Deportes">Deportes</option>
        </select>
      </label>

      <label>
        Plataforma
        <select name="plataforma" value={form.plataforma} onChange={handleChange}>
          <option value="PC">PC</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="Xbox Series X">Xbox Series X</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
        </select>
      </label>

      <label>
        Año de lanzamiento
        <input
          type="number"
          name="lanzamiento"
          value={form.lanzamiento}
          onChange={handleChange}
          min="1980"
          max="2030"
        />
      </label>

      <label>
        Precio (USD)
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
      </label>

      <label>
        Progreso de descarga: {Math.round(form.progreso * 100)}%
        <input
          type="range"
          name="progreso"
          value={form.progreso}
          onChange={handleChange}
          min="0"
          max="1"
          step="0.05"
        />
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          name="disponible"
          checked={form.disponible}
          onChange={handleChange}
        />
        Disponible en stock
      </label>

      <div className="acciones">
        <button className="btn-guardar" onClick={guardar}>
          {juegoAEditar ? "Guardar cambios" : "Registrar"}
        </button>
        <button className="btn-cancelar" onClick={() => navigate("/")}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default FormularioVideojuego;