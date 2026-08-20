import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

// Valores por defecto de un formulario en blanco.
const FORM_VACIO = {
  titulo: "",
  genero: "Aventura",
  plataforma: "PC",
  lanzamiento: 2025,
  fechaLanzamiento: "",
  sinopsis: "",
  calificacion: "",
  precio: "",
  disponible: true,
  progreso: 0,
};

function FormularioVideojuego({ onAgregar, onEditar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const juegoAEditar = location.state?.juego;

  // Si editamos, mezclamos el juego sobre el formulario vacío.
  // Así ningún campo queda como undefined aunque el registro sea antiguo.
  const [form, setForm] = useState(
    juegoAEditar ? { ...FORM_VACIO, ...juegoAEditar } : FORM_VACIO
  );

  // Objeto de errores: cada clave es el nombre del campo con problema.
  const [errores, setErrores] = useState({});

  // Fecha de hoy en formato YYYY-MM-DD, para no permitir fechas futuras.
  const hoy = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // ----- VALIDACIONES DE NEGOCIO -----
  const validarFormulario = () => {
    const erroresActivos = {};

    // Título: no puede estar vacío ni contener solo espacios en blanco.
    if (form.titulo.trim() === "") {
      erroresActivos.titulo = "El título es obligatorio.";
    } else if (form.titulo.trim().length < 3) {
      erroresActivos.titulo = "El título debe tener al menos 3 caracteres.";
    }

    // Fecha de lanzamiento: obligatoria y nunca futura.
    if (form.fechaLanzamiento === "") {
      erroresActivos.fechaLanzamiento = "Selecciona la fecha de lanzamiento.";
    } else if (form.fechaLanzamiento > hoy) {
      erroresActivos.fechaLanzamiento =
        "La fecha no puede ser posterior a hoy.";
    }

    // Sinopsis: entre 10 y 250 caracteres.
    const sinopsis = form.sinopsis.trim();
    if (sinopsis.length < 10) {
      erroresActivos.sinopsis = "La sinopsis debe tener al menos 10 caracteres.";
    } else if (sinopsis.length > 250) {
      erroresActivos.sinopsis = "La sinopsis no puede pasar de 250 caracteres.";
    }

    // Calificación: número estrictamente entre 1 y 100.
    const calificacion = Number(form.calificacion);
    if (form.calificacion === "") {
      erroresActivos.calificacion = "Ingresa la calificación de la crítica.";
    } else if (isNaN(calificacion) || calificacion < 1 || calificacion > 100) {
      erroresActivos.calificacion = "La calificación debe estar entre 1 y 100.";
    }

    // Precio: obligatorio y no negativo.
    const precio = Number(form.precio);
    if (form.precio === "") {
      erroresActivos.precio = "Ingresa el precio del videojuego.";
    } else if (isNaN(precio) || precio < 0) {
      erroresActivos.precio = "El precio no puede ser negativo.";
    }

    return erroresActivos;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // detiene el envío nativo del formulario

    const erroresActivos = validarFormulario();

    if (Object.keys(erroresActivos).length > 0) {
      setErrores(erroresActivos);
      return; // no se guarda nada
    }

    setErrores({});

    const datos = {
      ...form,
      titulo: form.titulo.trim(),
      sinopsis: form.sinopsis.trim(),
      calificacion: Number(form.calificacion),
      precio: Number(form.precio),
      progreso: Number(form.progreso),
      // El año se deduce de la fecha para mantener la columna de la tabla.
      lanzamiento: Number(form.fechaLanzamiento.split("-")[0]),
    };

    if (juegoAEditar) {
      onEditar(datos);
    } else {
      onAgregar(datos);
    }

    navigate("/");
  };

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
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
        {errores.titulo && (
          <span className="error-mensaje">{errores.titulo}</span>
        )}
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
        Fecha de lanzamiento
        <input
          type="date"
          name="fechaLanzamiento"
          value={form.fechaLanzamiento}
          onChange={handleChange}
          max={hoy}
        />
        {errores.fechaLanzamiento && (
          <span className="error-mensaje">{errores.fechaLanzamiento}</span>
        )}
      </label>

      {/* TEXTAREA */}
      <label>
        Sinopsis
        <textarea
          name="sinopsis"
          value={form.sinopsis}
          onChange={handleChange}
          maxLength={250}
          placeholder="Escribe una reseña corta del videojuego..."
        />
        <span className="contador">{form.sinopsis.length} / 250</span>
        {errores.sinopsis && (
          <span className="error-mensaje">{errores.sinopsis}</span>
        )}
      </label>

      <label>
        Calificación de la crítica (1 a 100)
        <input
          type="number"
          name="calificacion"
          value={form.calificacion}
          onChange={handleChange}
          min="1"
          max="100"
          placeholder="Ej: 92"
        />
        {errores.calificacion && (
          <span className="error-mensaje">{errores.calificacion}</span>
        )}
      </label>

      {/* NUMBER: precio */}
      <label>
        Precio (USD)
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          min="0"
          step="0.01"
          placeholder="Ej: 59.99"
        />
        {errores.precio && (
          <span className="error-mensaje">{errores.precio}</span>
        )}
      </label>

      {/* RANGE */}
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

      {/* CHECKBOX */}
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
        <button type="submit" className="btn-guardar">
          {juegoAEditar ? "Guardar cambios" : "Registrar"}
        </button>
        <button
          type="button"
          className="btn-cancelar"
          onClick={() => navigate("/")}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormularioVideojuego;