import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SensorChartsCacetada({ sensorId, sensorType }) {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const periods = ["Diario", "Semanal", "Mensal", "Anual"];
  const allowedSensorTypes = ["Umidade", "Papel", "Sabão"];

  useEffect(() => {
    if (!allowedSensorTypes.includes(sensorType)) {
      setErrors({ global: "Tipo de sensor não suportado para gráficos." });
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const dataCache = {}; // Inicializa o cache limpo

      for (let period of periods) {
        try {
          const response = await axios.get(
            `http://localhost:3000/sensor-history/${period}/${sensorId}`,
            { params: { type: sensorType } }
          );

          const labels = response.data.map((_, index) => `${index + 1}`);
          const values = response.data.map((item) => item.Resultado);

          dataCache[period] = {
            labels,
            datasets: [
              {
                label: `Média (${period})`,
                data: values,
                backgroundColor: `rgba(${Math.random() * 255}, ${
                  Math.random() * 255
                }, ${Math.random() * 255}, 0.6)`, // Cores dinâmicas
              },
            ],
          };
        } catch (error) {
          setErrors((prev) => ({
            ...prev,
            [period]: "Erro ao carregar os dados.",
          }));
          console.error(`Erro ao carregar os dados de ${period}:`, error);
        }
      }

      setChartData(dataCache);
      setLoading(false);
    };

    fetchData();
  }, [sensorId, sensorType]);

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  };

  return (
    <div>
      <h3>Gráficos do Sensor: {sensorType}</h3>
      {loading ? (
        <p>Carregando gráficos...</p>
      ) : errors.global ? (
        <p style={{ color: "red" }}>{errors.global}</p>
      ) : (
        <div style={containerStyle}>
          {periods.map((period) => (
            <div key={period}>
              <h4>{`Histórico ${period.charAt(0).toUpperCase() + period.slice(1)}`}</h4>
              {errors[period] ? (
                <p style={{ color: "red" }}>{errors[period]}</p>
              ) : (
                <Bar
                  data={chartData[period]}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: `Gráfico de Média (${period})`,
                      },
                      legend: {
                        position: "top",
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Período",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Média",
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
