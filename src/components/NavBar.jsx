import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form } from "react-bootstrap";

export default function NavBar({ darkMode, toggleDarkMode }) {  // Recebendo darkMode e toggleDarkMode
  return (
    <Navbar className={darkMode ? "navbar dark-mode" : "navbar"}> 
      <Navbar.Brand>LhaBath</Navbar.Brand>
      <Nav className="ml-auto">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/cadastro">Cadastro</Link></li>
          <li><a href="https://landing-page-lha-bath-pzhw.vercel.app">Saiba mais!</a></li>
        </ul>
      </Nav>
      <Form.Check
        type="switch"
        id="custom-switch"
        className="custom-switch"
        checked={darkMode}  // Definindo o estado para refletir o modo atual
        onChange={toggleDarkMode}  // Chamando a função de toggle ao mudar o switch
      />
    </Navbar>
  );
}
