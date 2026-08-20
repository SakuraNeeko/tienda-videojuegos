import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-marca">GameStore</span>

      <div className="navbar-links">

        <Link to="/">Inventario</Link>
        <Link to="/formulario">Nuevo Juego</Link>
      </div>
    </nav>
  );
}

export default Navbar;