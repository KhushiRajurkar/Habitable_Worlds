// import { Link } from "react-router-dom";
// import "./PlanetCard.css"; // This applies the shared planet-card styles

// function formatVal(val, unit) {
//   return val === 0 ? "Not Known" : `${val.toFixed(2)} ${unit}`;
// }

// function PlanetCard({ planet }) {
//   const {
//     id,
//     name,
//     mass,
//     radius,
//     temperature,
//     period,
//     habitability,
//     texture,
//   } = planet;

//   const habitabilityLabel = {
//     2: { label: "Habitable 🌿", color: "#00ff99" },
//     1: { label: "Potential 🤔", color: "#ffdd57", text: "#000" },
//     0: { label: "Not Habitable ❌", color: "#ff4c4c" },
//   };

//   const hInfo = habitabilityLabel[habitability] || {
//     label: "Unknown",
//     color: "#999",
//   };

//   return (
//     <Link to={`/planet/${encodeURIComponent(name)}`} className="planet-card">
//       <div className="card-body">
//         <div className="card-header">
//           <h2>🪐 {name || `Planet ${id}`}</h2>
//           <span className="texture">{texture || "Unknown"}</span>
//         </div>

//         <p>🌡️ Temp: {formatVal(temperature, "K")}</p>
//         <p>📏 Radius: {formatVal(radius, "Earth radii")}</p>
//         <p>⚖️ Mass: {formatVal(mass, "Earth masses")}</p>
//         <p>🌀 Orbit: {formatVal(period, "days")}</p>
//       </div>

//       <div className="card-footer">
//         <p>
//           🌍 Habitability:{" "}
//           <span
//             style={{
//               backgroundColor: hInfo.color,
//               color: hInfo.text || "#000",
//               padding: "4px 10px",
//               borderRadius: "8px",
//               fontWeight: "600",
//             }}
//           >
//             {hInfo.label}
//           </span>
//         </p>
//       </div>
//     </Link>
//   );
// }

// const styles = {
//   link: {
//     textDecoration: "none",
//     color: "inherit",
//     width: "100%", // Ensure all cards stretch fully inside wrapper
//   },
//   card: {
//     background: "rgba(44, 47, 51, 0.95)",
//     padding: "20px",
//     marginBottom: "20px",
//     borderRadius: "15px",
//     border: "1px solid rgba(255,255,255,0.05)",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
//     transition: "transform 0.25s ease-in-out",

//     // 🧩 FIXED SIZE MAGIC ✨
//     width: "100%",
//     maxWidth: "500px",
//     minHeight: "260px",     // 👈 Enough height to fit all content
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "10px",
//   },
//   name: {
//     fontSize: "1.5rem",
//     margin: 0,
//     color: "#00ffff",
//   },
//   textureTag: {
//     fontSize: "0.9rem",
//     padding: "4px 10px",
//     borderRadius: "6px",
//     backgroundColor: "#222",
//     border: "1px solid #666",
//     color: "#ccc",
//   },
// };


// export default PlanetCard;

import { Link } from "react-router-dom";
import "./PlanetCard.css";

function formatVal(val, unit) {
  return val === 0 ? "Not Known" : `${val.toFixed(2)} ${unit}`;
}

function PlanetCard({ planet }) {
  const {
    id,
    name,
    mass,
    radius,
    temperature,
    period,
    habitability,
    texture,
  } = planet;

  const habitabilityLabel = {
    2: { label: "Habitable 🌿", color: "#00ff99" },
    1: { label: "Potential 🤔", color: "#ffdd57", text: "#000" },
    0: { label: "Not Habitable ❌", color: "#ff4c4c" },
  };

  const hInfo = habitabilityLabel[habitability] || {
    label: "Unknown",
    color: "#999",
  };

  return (
    <Link to={`/planet/${encodeURIComponent(name)}`} className="planet-card">
      <div className="card-body">
        <div className="card-header">
          <h2 className="planet-name">🪐 {name || `Planet ${id}`}</h2>
          <span className="texture-tag">{texture || "Unknown"}</span>
        </div>

        <p>🌡️ Temp: {formatVal(temperature, "K")}</p>
        <p>📏 Radius: {formatVal(radius, "Earth radii")}</p>
        <p>⚖️ Mass: {formatVal(mass, "Earth masses")}</p>
        <p>🌀 Orbit: {formatVal(period, "days")}</p>
      </div>

      <div className="card-footer">
        <p>
          🌍 Habitability:{" "}
          <span
            className="habitability-pill"
            style={{
              backgroundColor: hInfo.color,
              color: hInfo.text || "#000",
            }}
          >
            {hInfo.label}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default PlanetCard;
