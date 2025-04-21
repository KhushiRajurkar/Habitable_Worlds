import React, { useEffect, useState, Suspense } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchExoplanets } from "../api";
import "./PlanetList.css";
import ShimmerCard from "../components/ShimmerCard";

const PlanetCard = React.lazy(() => import("../components/PlanetCard"));

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const habitability = queryParams.get("habitability");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const cached = sessionStorage.getItem("all_planets");
        let allPlanets = cached ? JSON.parse(cached) : await fetchExoplanets();

        if (!cached) {
          sessionStorage.setItem("all_planets", JSON.stringify(allPlanets));
        }

        const filtered = habitability
          ? allPlanets.filter((p) => String(p.habitability) === habitability)
          : allPlanets;

        setPlanets(filtered);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [habitability]);

  return (
    <div className="stars-bg">
      <div className="planet-content">
        <div className="container">
          <h1 className="title" style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "2rem" }}>
            👽 Exoplanet Habitability Explorer
          </h1>

          <div className="filters">
            <Link to="/planets" className="btn">🌐 All</Link>
            <Link to="/planets?habitability=2" className="btn" style={{ backgroundColor: "#00ff99" }}>Habitable 🌿</Link>
            <Link to="/planets?habitability=1" className="btn" style={{ backgroundColor: "#ffdd57", color: "#000" }}>Potential 🤔</Link>
            <Link to="/planets?habitability=0" className="btn" style={{ backgroundColor: "#ff4c4c" }}>Not Habitable ❌</Link>
          </div>
        </div>

        <div className="planet-grid">
          <Suspense fallback={<ShimmerGrid />}>
            {loading
              ? <ShimmerGrid />
              : planets.length > 0
                ? planets.map((planet, index) => (
                    <PlanetCard key={`${planet.name}-${index}`} planet={planet} />
                  ))
                : <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#ccc" }}>
                    No exoplanet data found
                  </p>
            }
          </Suspense>
        </div>
      </div>
    </div>
  );
}

const ShimmerGrid = () => (
  <>
    {Array.from({ length: 6 }).map((_, idx) => (
      <ShimmerCard key={idx} />
    ))}
  </>
);

export default PlanetList;
