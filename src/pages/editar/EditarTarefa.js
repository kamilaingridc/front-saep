import React, { useState, useEffect } from "react";
import './EditarTarefa.css';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const { id } = useParams(); // Pega o ID da URL
  const [task, setTask] = useState(null); // Armazena a tarefa
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const navigate = useNavigate(); // Para redirecionar após a edição
  const [usuarios, setUsuarios] = useState([]); // Lista de usuários
  const [formData, setFormData] = useState({
    usuario: "",
    descricao: "",
    setor: "",
    prioridade: "baixa",
    status: "pendente",
  });

  // Carrega a lista de usuários da API quando o componente é montado
  useEffect(() => {
    axios.get("http://localhost:8000/api/users/")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao carregar usuários:", error));
  }, []);

  // Carrega os dados da tarefa para edição
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`);
        console.log('Dados da Tarefa:', response.data); // Verifique se os dados estão sendo retornados
        const taskData = response.data;
        setTask(taskData);
        // Preenche o formulário com os dados da tarefa
        setFormData({
          usuario: taskData.usuario || "",
          descricao: taskData.descricao || "",
          setor: taskData.setor || "",
          prioridade: taskData.prioridade || "baixa",
          status: taskData.status || "pendente",
        });
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar a tarefa:', error);
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchTask();
  }, [id]);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para enviar os dados atualizados para a API
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);

    axios.put(`http://localhost:8000/api/tasks/${id}/`, formData)
      .then(response => {
        alert("Tarefa atualizada com sucesso!");
        navigate("/"); // Redireciona para a página de gerenciamento de tarefas
      })
      .catch(error => {
        console.error("Erro ao atualizar a tarefa:", error);
        alert("Erro ao atualizar a tarefa. Tente novamente.");
      });
  };

  // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      
      <h2>Editar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <select name="usuario" value={formData.usuario} onChange={handleChange} required>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Descrição da Tarefa:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Setor:</label>
          <input
            type="text"
            name="setor"
            value={formData.setor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prioridade:</label>
          <select
            name="prioridade"
            value={formData.prioridade}
            onChange={handleChange}
            required
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="pendente">Pendente</option>
            <option value="fazendo">Fazendo</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default TaskForm;
