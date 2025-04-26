const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
app.use(cors());
app.use(express.json());

// serve your React build
app.use(express.static(path.join(__dirname, "client", "dist")));

// load CSV data into memory
let exoplanets = [];

const loadCSV = () => {
  const csvPath = path.join(__dirname, "Habitable_Worlds_Catalog.csv");
  if (!fs.existsSync(csvPath)) {
    console.error("CSV file not found:", csvPath);
    return;
  }

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (row) => {
      exoplanets.push({
        id:           exoplanets.length,
        name:         row.P_NAME,
        mass:         row.P_MASS_y,
        radius:       row.P_RADIUS_y,
        temperature:  row.P_TEMP_EQUIL_y,
        period:       row.P_PERIOD_y,
        texture:      row.P_TEXTURE,
        habitability: row.P_HABITABLE
      });
    })
    .on("end", () => {
      console.log(`CSV file successfully loaded with ${exoplanets.length} planets.`);
    })
    .on("error", (err) => {
      console.error("Failed to read CSV file:", err);
    });
};

// Load CSV when server starts
loadCSV();

// API route
app.get("/api/planets", (req, res) => {
  res.json({ exoplanets });
});

// catch‑all route for React Router (client-side routing)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
