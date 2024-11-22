import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  return (
    <header className="header">
      <h2 className="title">Gerenciador de Tarefas</h2>
      <nav className="nav">
        <Link className='Link' to="/">Tarefas</Link>
        <Link className="Link" to="/cadastro-usuarios">Cadastro de Usuários</Link>
        <Link className="Link" to="/cadastrar-tarefas">Cadastro de Tarefas</Link>
      </nav>
    </header>
  );
}

export default Navbar;
