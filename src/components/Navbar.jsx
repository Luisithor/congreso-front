import React from "react";
import { Link } from "react-router-dom"; 
import "../assets/static/Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="container">
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
        </div>

        <nav className={isOpen ? "open" : ""}>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
            </li>
            <li>
              <Link to="/participantes" onClick={() => setIsOpen(false)}>Listado</Link>
            </li>
            <li>
              <Link to="/registro" onClick={() => setIsOpen(false)}>Registro</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
