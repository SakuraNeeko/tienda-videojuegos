import { Link } from "react-router-dom";
import "./TablaVideojuegos.css";

// Ahora recibe dos props: la lista y la función para eliminar.
function TablaVideojuegos({ juegos, onEliminar }) {
  return (
    <div className="tabla-contenedor">
      <table className="tabla-videojuegos">
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Plataforma</th>
            <th>Lanzamiento</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Descarga</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {juegos.map((juego) => (
            <tr key={juego.id}>
              <td data-label="Título" className="celda-titulo">
                {juego.titulo}
              </td>
              <td data-label="Género">{juego.genero}</td>
              <td data-label="Plataforma">{juego.plataforma}</td>
              <td data-label="Lanzamiento">{juego.lanzamiento}</td>
              <td data-label="Precio">${juego.precio.toFixed(2)}</td>
              <td data-label="Disponible">
                <span className={juego.disponible ? "etiqueta si" : "etiqueta no"}>
                  {juego.disponible ? "En stock" : "Agotado"}
                </span>
              </td>

              <td data-label="Descarga">
                <div className="barra-progreso">
                  <progress value={juego.progreso} max={1} />
                  <span className="porcentaje">
                    {Math.round(juego.progreso * 100)}%
                  </span>
                </div>
              </td>

              <td data-label="Acciones">
                <div className="botones">

                  <Link
                    to="/formulario"
                    state={{ juego }}
                    className="btn btn-editar"
                  >
                    Editar
                  </Link>

                  <button
                    className="btn btn-eliminar"
                    onClick={() => onEliminar(juego.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {juegos.length === 0 && (
        <p style={{ textAlign: "center", color: "#6b7280", padding: "20px" }}>
          No hay videojuegos registrados. Agrega uno desde "Nuevo Juego".
        </p>
      )}
    </div>
  );
}

export default TablaVideojuegos;