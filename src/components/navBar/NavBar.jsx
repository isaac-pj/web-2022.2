import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="container-fluid navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="#">
          UFC QXD
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Estudante
            </a>
            <ul className="dropdown-menu dropdown-menu-light">
              <li>
                <Link className="dropdown-item" to="/createStudent">
                  Criar Estudante
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/listStudent">
                  Listar Estudante
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Professor
            </a>
            <ul className="dropdown-menu dropdown-menu-light">
              <li>
                <Link className="dropdown-item" to="/createProfessor">
                  Criar Professor
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/listProfessor">
                  Listar Professor
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
