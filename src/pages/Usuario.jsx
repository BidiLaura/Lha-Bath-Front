import React, { useState, useEffect } from "react";
import NavBarPainel from "../components/NavBarPainel";
import SensorChartsCacetada from "../components/Grafico"; // Importando o componente de gráfico
import { Link } from "react-router-dom";
import Painel from "./Painel";

export default function Usuario() {
  const [darkMode, setDarkMode] = useState(false); // Estado para o dark mode

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
      <Link to={'/usuario/painel'}><button>Voltar para o painel</button>  </Link>          

      <div className="charts-container">
        <h2>Gráficos dos Sensores</h2>
        
        {/* Exibindo o gráfico do sensor de Umidade */}
        <SensorChartsCacetada
          sensorId={1} // Substitua por um ID válido do sensor de Umidade
          sensorType="Umidade" // Tipando o sensor "Umidade"
        />
        
        {/* Exibindo o gráfico do sensor de Papel */}
        <SensorChartsCacetada
          sensorId={2} // Substitua por um ID válido do sensor de Papel
          sensorType="Papel" // Tipando o sensor "Papel"
        />
      </div>

    </>
  );
}
