// src/pages/PlanetDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchExoplanets } from "../api";
import PlanetStatsChart from "../components/PlanetStatsChart";
import ThreeScene from "../components/ThreeScene";
import starsBg from "../assets/stars-bg.png";
import "./PlanetDetail.css";

// full pools
const LEFT_POOL = [
  { icon: "🌞", text: "Some exoplanets orbit two suns!" },
  { icon: "🔭", text: "Thousands of exoplanets have been discovered!" },
  { icon: "📡", text: "Most data is gathered via transit or radial velocity." },
  { icon: "🚀", text: "Kepler revolutionized exoplanet discovery." },
];

const RIGHT_POOL = [
  { icon: "🛰️", text: "Habitable zone = Goldilocks zone!" },
  { icon: "🛸", text: "Alien atmospheres are studied via light!" },
  { icon: "⏳", text: "Light from these worlds takes years to reach us." },
  { icon: "🌱", text: "Only a few exoplanets may support life!" },
];

// helper: pick `n` random items from an array
function pickRandom(arr, n) {
  const _ = [...arr];
  for (let i = _.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [_[i], _[j]] = [_[j], _[i]];
  }
  return _.slice(0, n);
}

function PlanetDetail() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [leftFacts, setLeftFacts] = useState([]);
  const [rightFacts, setRightFacts] = useState([]);

  // load planet data
  useEffect(() => {
    const loadPlanet = async () => {
      try {
        const all = await fetchExoplanets();
        const match = all.find((p) => p.name === decodeURIComponent(id));
        setPlanet(match || null);
      } catch (err) {
        console.error("❌ Failed to load planet:", err);
      }
    };
    loadPlanet();
  }, [id]);

  // pick two random facts on mount
  useEffect(() => {
    setLeftFacts(pickRandom(LEFT_POOL, 2));
    setRightFacts(pickRandom(RIGHT_POOL, 2));
  }, []);

  if (!planet) {
    return <p style={styles.loading}>Loading...</p>;
  }

  const { name, mass, radius, temperature, period, habitability, texture } = planet;
  const habitabilityColor =
  Number(habitability) === 2 ? "#00ff99" :
  Number(habitability) === 1 ? "#ffdd57" :
  "#ff4c4c";

  const showOrNA = (val, unit) => (val && val !== 0 ? `${val} ${unit}` : "Not Known");

  return (
    <div
      className="planet-detail-wrapper"
      style={{ backgroundImage: `url(${starsBg})` }}
    >
      {/* left facts */}
      <div className="facts-column facts-left">
        {leftFacts.map(({ icon, text }, i) => (
          <div key={i} className="fact-box">
            <span className="fact-icon">{icon}</span> {text}
          </div>
        ))}
      </div>

      {/* right facts */}
      <div className="facts-column facts-right">
        {rightFacts.map(({ icon, text }, i) => (
          <div key={i} className="fact-box">
            <span className="fact-icon">{icon}</span> {text}
          </div>
        ))}
      </div>

      {/* main content */}
      <div className="planet-detail-layout">
        <div className="top-section">
          <div className="planet-3d">
            <ThreeScene texture={texture || "unknown"} />
          </div>
          <div className="planet-info">
            <h2 style={styles.heading}>🪐  {name}</h2>
            <p><strong>Type:</strong> {texture || "Unknown"}</p>
            <p><strong>Mass:</strong> {showOrNA(mass, "Earth masses")}</p>
            <p><strong>Radius:</strong> {showOrNA(radius, "Earth radii")}</p>
            <p><strong>Temperature:</strong> {showOrNA(temperature, "K")}</p>
            <p><strong>Orbital Period:</strong> {showOrNA(period, "days")}</p>
            <p><strong>Habitability:</strong>{" "}
                <span style={{ color: habitabilityColor, fontWeight: "bold" }}>
                  {Number(habitability) === 2 ? "Habitable": Number(habitability) === 1 ? "Potential" : "Not Habitable"}
                </span>
            </p>
          </div>
        </div>
        <div className="chart-wrapper">
          <PlanetStatsChart planet={planet} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#00ffff",
  },
  loading: {
    textAlign: "center",
    marginTop: "4rem",
    fontSize: "1.5rem",
    color: "#ccc",
  },
};

export default PlanetDetail;
