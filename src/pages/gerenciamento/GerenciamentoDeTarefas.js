import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const GerenciamentoDeTarefas = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]); // Lista de usuários
    const [tasks, setTasks] = useState([]); // Lista de tarefas
    const [selectedPriority, setSelectedPriority] = useState(''); // Prioridade selecionada para o filtro
    const [statusOptions] = useState([
        { value: 'pendente', label: 'Pendente' },
        { value: 'fazendo', label: 'Fazendo' },
        { value: 'concluido', label: 'Concluído' },
    ]);

    // Função para buscar os usuários
    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    // Função para buscar as tarefas
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error('Erro ao buscar as tarefas:', error);
        }
    };

    // Chama as funções quando o componente é montado
    useEffect(() => {
        fetchUsuarios();
        fetchTasks();
    }, []);

    // Função para buscar o nome do usuário com base no ID
    const getUserNameById = (userId) => {
        const user = usuarios.find((u) => u.id === userId);
        return user ? user.username : 'Usuário não encontrado';
    };

    // Função para atualizar o status da tarefa
    const handleStatusChange = async (taskId, newStatus) => {
        const taskToUpdate = tasks.find((task) => task.id === taskId);

        if (!taskToUpdate) {
            console.error('Tarefa não encontrada!');
            return;
        }

        try {
            const updatedTask = { ...taskToUpdate, status: newStatus };

            await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}/`, updatedTask);

            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );

            alert('Status da tarefa atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar o status da tarefa:', error);
            alert('Erro ao atualizar o status. Verifique os dados e tente novamente.');
        }
    };

    // Função para excluir a tarefa
    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/tasks/del/${taskId}/`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            alert('Tarefa excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir a tarefa:', error);
            alert('Erro ao excluir a tarefa. Tente novamente.');
        }
    };

    // Filtra as tarefas por status e prioridade
    const getFilteredTasks = (status) => {
        return tasks.filter(
            (task) =>
                task.status === status &&
                (selectedPriority === '' || task.prioridade === selectedPriority)
        );
    };

    return (
        <div className="task-manager">
            <div className="filter-container">
                <label htmlFor="priority-filter">Filtrar por Prioridade:</label>
                <select
                    id="priority-filter"
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                >
                    <option value="">Todas</option>
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                </select>
            </div>

            <div className="task-grid">
                {/* Coluna para "Pendente" */}
                <div className="task-column">
                    <h2>Pendente</h2>
                    {getFilteredTasks('pendente').map((task) => (
                        <div key={task.id} className="task-card">
                            <h3>{task.descricao}</h3>
                            <p><strong>Setor:</strong> {task.setor}</p>
                            <p><strong>Prioridade:</strong> {task.prioridade}</p>
                            <p><strong>Usuário:</strong> {getUserNameById(task.usuario)}</p>
                            <button
                                onClick={() => navigate(`/editar-tarefa/${task.id}`)}
                                className="update-button"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="delete-button"
                            >
                                Excluir
                            </button>
                            <div className="status-container">
                                <label><strong>Status:</strong></label>
                                <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    className="status-dropdown"
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coluna para "Fazendo" */}
                <div className="task-column">
                    <h2>Fazendo</h2>
                    {getFilteredTasks('fazendo').map((task) => (
                        <div key={task.id} className="task-card">
                            <h3>{task.descricao}</h3>
                            <p><strong>Setor:</strong> {task.setor}</p>
                            <p><strong>Prioridade:</strong> {task.prioridade}</p>
                            <p><strong>Usuário:</strong> {getUserNameById(task.usuario)}</p>
                            <button
                                onClick={() => navigate(`/editar-tarefa/${task.id}`)}
                                className="update-button"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="delete-button"
                            >
                                Excluir
                            </button>
                            <div className="status-container">
                                <label><strong>Status:</strong></label>
                                <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    className="status-dropdown"
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coluna para "Concluído" */}
                <div className="task-column">
                    <h2>Concluído</h2>
                    {getFilteredTasks('concluido').map((task) => (
                        <div key={task.id} className="task-card">
                            <h3>{task.descricao}</h3>
                            <p><strong>Setor:</strong> {task.setor}</p>
                            <p><strong>Prioridade:</strong> {task.prioridade}</p>
                            <p><strong>Usuário:</strong> {getUserNameById(task.usuario)}</p>
                            <button
                                onClick={() => navigate(`/editar-tarefa/${task.id}`)}
                                className="update-button"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="delete-button"
                            >
                                Excluir
                            </button>
                            <div className="status-container">
                                <label><strong>Status:</strong></label>
                                <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    className="status-dropdown"
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GerenciamentoDeTarefas;
