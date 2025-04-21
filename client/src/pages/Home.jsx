import { useNavigate } from "react-router-dom";
import nebula from "../assets/nebula-bg.png";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="nebula-bg"
      style={{
        backgroundImage: `url(${nebula})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        <h1>Welcome to the Exoplanet Habitability Explorer</h1>
        <p>
          Discover potentially habitable worlds across the galaxy using real astronomical data.
          BEEP BEEP BOOP BOOP 🛸
        </p>
        <button
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1.1rem",
            backgroundColor: "#00ffff",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 0 12px rgba(0, 255, 255, 0.4)",
            transition: "all 0.25s ease-in-out",
          }}
          onClick={() => navigate("/planets")}
        >
          View All Exoplanets
        </button>
      </div>
    </div>
  );
}

export default Home;
