import React, { useEffect, useState } from "react";
import NavBarPainel from "../components/NavBarPainel";
import Banheiro from "../components/Banheiro";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Painel() {
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Estado para o dark mode

  // Função para buscar os sensores cadastrados (se necessário, mas não será usada aqui)
  const fetchSensores = async () => {
    try {
      const response = await axios.get("https://lha-bath.onrender.com/sensores"); // API que retorna os sensores
      setError(null); // Limpa erros ao carregar com sucesso
    } catch (error) {
      console.error("Erro ao buscar sensores:", error);
      setError("Erro ao carregar sensores.");
    }
  };

  // Efeito para atualizar os sensores automaticamente a cada 5 segundos (não necessário para esse caso)
  useEffect(() => {
    fetchSensores(); // Busca inicial
    const interval = setInterval(fetchSensores, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  // Função para alternar o modo escuro
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Aplicando a classe 'dark-mode' ao body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <NavBarPainel darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <h2>Status do seu banheiro:</h2>
      <Banheiro />
      <div className="charts-container">
        <p style={{ marginTop: "20px", fontStyle: "italic" }}>
          Para acessar o histórico em gráficos, acesse a tela de "Usuário".
        </p>
      </div>
    </>
  );
}
