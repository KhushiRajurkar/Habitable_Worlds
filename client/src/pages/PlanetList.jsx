import React, { useEffect, useState, Suspense } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchExoplanets } from "../api";
import "./PlanetList.css";
import ShimmerCard from "../components/ShimmerCard";

const PlanetCard = React.lazy(() => import("../components/PlanetCard"));

function PlanetList() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const planetsPerPage = 20;

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

        allPlanets = allPlanets.map(p => ({
          ...p,
          mass: p.mass ? Number(p.mass) : null,
          radius: p.radius ? Number(p.radius) : null,
          temperature: p.temperature ? Number(p.temperature) : null,
          period: p.period ? Number(p.period) : null,
          habitability: p.habitability != null ? String(p.habitability) : "0",
        }));

        const filtered = habitability
          ? allPlanets.filter((p) => String(p.habitability) === habitability)
          : allPlanets;

        setPlanets(filtered);
        setCurrentPage(1); // reset to first page when habitability changes
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [habitability]);

  const indexOfLastPlanet = currentPage * planetsPerPage;
  const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
  const currentPlanets = planets.slice(indexOfFirstPlanet, indexOfLastPlanet);

  const totalPages = Math.ceil(planets.length / planetsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
              : currentPlanets.length > 0
                ? currentPlanets.map((planet, index) => (
                    <PlanetCard key={`${planet.name}-${index}`} planet={planet} />
                  ))
                : <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#ccc" }}>
                    No exoplanet data found
                  </p>
            }
          </Suspense>
        </div>

        {/* Pagination Controls */}
        {!loading && planets.length > 0 && (
          <div className="pagination-controls" style={{ textAlign: "center", marginTop: "2rem" }}>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn" style={{ marginRight: "1rem" }}>
              ◀️ Previous
            </button>
            <span style={{ fontSize: "1.2rem", color: "#fff" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn" style={{ marginLeft: "1rem" }}>
              Next ▶️
            </button>
          </div>
        )}
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
