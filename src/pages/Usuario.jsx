import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBarPainel from "../components/NavBarPainel";
import SensorChartsCacetada from "../components/Grafico";

export default function Usuario() {
  const [darkMode, setDarkMode] = useState(false);
  const [sensores, setSensores] = useState([]);
  const [error, setError] = useState(null);
  const allowedSensorTypes = ["Umidade", "Papel", "Sabão"];

  const fetchSensores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/sensores");

      const sensorNames = Object.values(response.data)
        .filter((sensor) => allowedSensorTypes.includes(sensor.Tipo_Sensor))
        .map((sensor) => ({
          ID_Sensor: sensor.ID_Sensor,
          Nome_Sensor: sensor.Tipo_Sensor,
        }));

      setSensores(sensorNames);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar sensores:", error);
      setError("Erro ao carregar sensores.");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    fetchSensores();
    const interval = setInterval(fetchSensores, 30000); // Atualiza a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NavBarPainel darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="charts-container">
        <h2>Gráficos dos Sensores</h2>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : sensores.length > 0 ? (
          sensores.map((sensor) => (
            <div key={sensor.ID_Sensor} className="chart-wrapper">
              <SensorChartsCacetada
                sensorId={sensor.ID_Sensor}
                sensorType={sensor.Nome_Sensor}
              />
            </div>
          ))
        ) : (
          <p>Nenhum sensor disponível no momento.</p>
        )}
      </div>
    </>
  );
}
