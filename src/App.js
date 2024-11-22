import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GerenciamentoDeTarefas from './pages/gerenciamento/GerenciamentoDeTarefas.js';
import CadastroDeTarefas from './pages/tarefa/CadastroDeTarefas.js';
import CadastroDeUsuario from './pages/usuario/CadastroDeUsuario.js'
import EditarTarefa from './pages/editar/EditarTarefa.js'
import Navbar from './components/Navbar.js';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/cadastrar-tarefas" element={<CadastroDeTarefas />} />
                <Route path="/cadastro-usuarios" element={<CadastroDeUsuario />} />
                <Route path="/editar-tarefa/:id" element={<EditarTarefa />} />
                <Route path="/" element={<GerenciamentoDeTarefas />} />
            </Routes>
        </Router>
    );
}

export default App;
