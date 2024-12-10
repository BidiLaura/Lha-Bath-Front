import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Dropdown, Form } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa"; // Ícone de perfil genérico

export default function NavBarPainel({ darkMode, toggleDarkMode }) {
  return (
    <Navbar className={darkMode ? "navbar dark-mode" : "navbar"}>
      <Navbar.Brand>LhaBath</Navbar.Brand>
      <Nav className="ms-auto d-flex align-items-center">
        {/* Ícone de perfil com dropdown */}
        <Dropdown className="profile-icon">
          <Dropdown.Toggle variant="link" id="dropdown-profile" className="p-0">
            <FaUserCircle size={30} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/home">Home</Dropdown.Item>
            <Dropdown.Item as={Link} to="/usuario/painel">Painel</Dropdown.Item>
            <Dropdown.Item as={Link} to="/usuario/info">Usuário</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Check
          type="switch"
          id="custom-switch"
          className="custom-switch"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
      </Nav>
    </Navbar>
  );
}
