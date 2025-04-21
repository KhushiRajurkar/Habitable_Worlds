import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlanetList from "./pages/PlanetList";
import PlanetDetail from "./pages/PlanetDetail";

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planets" element={<PlanetList />} />
        <Route path="/planet/:id" element={<PlanetDetail />} />
      </Routes>
    </div>
  );
}


export default App;
