import "./TablaVideojuegos.css";

// Componente de presentación: solo recibe datos por props y los muestra.
// La prop "juegos" es el array que llega desde App.jsx.
function TablaVideojuegos({ juegos }) {
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
                <span
                  className={
                    juego.disponible ? "etiqueta si" : "etiqueta no"
                  }
                >
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVideojuegos;
