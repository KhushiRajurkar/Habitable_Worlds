require("dotenv").config();          // ← load your .env first
const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// serve your React build
app.use(express.static(path.join(__dirname, "client", "dist")));

// use Railway’s single DATABASE_URL (or any full Postgres URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect(err => {
  if (err) console.error("❌ DB connect failed:", err);
  else      console.log("✅ Connected to PostgreSQL.");
});

app.get("/api/planets", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM habitable_worlds_catalog");
    const exoplanets = result.rows.map(p => ({
      id:           p.id,
      name:         p.p_name,
      mass:         p.p_mass,
      radius:       p.p_radius,
      temperature:  p.p_temp_equil,
      period:       p.p_period,
      texture:      p.p_texture,
      habitability: p.p_habitable
    }));
    res.json({ exoplanets });
  } catch (err) {
    console.error("❌ Query failed:", err);
    res.status(500).json({ exoplanets: [] });
  }
});

// catch‑all for client‑side routing
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
