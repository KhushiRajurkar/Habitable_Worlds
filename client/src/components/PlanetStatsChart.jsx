import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function PlanetStatsChart({ planet }) {
  const rawParams = [
    { label: "Mass", value: planet.mass, color: "#00ffff" },
    { label: "Radius", value: planet.radius, color: "#00ff99" },
    { label: "Temp (K)", value: planet.temperature, color: "#ffaa00" },
    { label: "Orbit (days)", value: planet.period, color: "#ff4c4c" },
  ];

  const filteredParams = rawParams.filter(p => p.value !== 0);

  const data = {
    labels: filteredParams.map(p => p.label),
    datasets: [
      {
        label: planet.name,
        data: filteredParams.map(p => p.value),
        backgroundColor: filteredParams.map(p => p.color),
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
          font: { size: 16 },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff", font: { size: 14 } },
      },
      y: {
        ticks: { color: "#fff", font: { size: 14 } },
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        background: "#111",
        padding: "1.5rem",
        borderRadius: "12px",
        maxWidth: "700px",
        width: "90%",
        marginInline: "auto",
      }}
    >
      <h3 style={{ color: "#00ffff", textAlign: "center", fontSize: "1.1rem" }}>
        📊 Planetary Parameters
      </h3>
      {filteredParams.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <Bar data={data} options={options} />
        </div>
      ) : (
        <p style={{ color: "#ccc", textAlign: "center", fontStyle: "italic" }}>
          No measurable parameters available for this planet.
        </p>
      )}
    </div>
  );

}

export default PlanetStatsChart;
