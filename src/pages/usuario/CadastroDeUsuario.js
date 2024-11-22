import React, { useState } from 'react';
import axios from 'axios';
import './CadastroDeUsuario.css';

function CadastroDeUsuario() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [msn, setMsn] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/', {
        username,
        email,
      });
      console.log('Usuário cadastrado:', response.data);
      setMsn('Cadastro concluído com sucesso!!!');
      setUsername('');
      setEmail('');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setMsn('Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="containner">
      <main>
        <h2>Cadastro de Usuários</h2>
        <form onSubmit={handleSubmit}>
          <div className="teste">
            <label htmlFor="username">Nome:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="teste">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="botao-cadastrar-container">
            <button type="submit" className="botao-cadastrar">Cadastrar</button>
          </div>
          <div className="mensagem-sucesso">
            <p>{msn}</p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CadastroDeUsuario;
