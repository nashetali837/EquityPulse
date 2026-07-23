import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("equity_pulse.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    subscription_tier TEXT DEFAULT 'freemium'
  );

  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT,
    industry TEXT,
    published_date TEXT,
    summary TEXT,
    content TEXT,
    tier_required TEXT DEFAULT 'freemium'
  );
`);

// Seed some data if empty
const rowCount = db.prepare("SELECT COUNT(*) as count FROM reports").get() as { count: number };
if (rowCount.count === 0) {
  const insert = db.prepare("INSERT INTO reports (company_name, industry, published_date, summary, content, tier_required) VALUES (?, ?, ?, ?, ?, ?)");
  insert.run("NeuroFlow AI", "HealthTech", "2026-03-02", "Revolutionizing neural interfaces for mental health.", "Detailed analysis of NeuroFlow's proprietary EEG processing...", "freemium");
  insert.run("QuantumScale", "Computing", "2026-02-23", "Scaling quantum error correction for commercial use.", "Deep dive into QuantumScale's topological qubit approach...", "general");
  insert.run("BioSynth Labs", "Synthetic Bio", "2026-02-16", "Custom protein synthesis for carbon capture.", "Exclusive internal data on BioSynth's metabolic pathway engineering...", "premium");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/auth/signup", (req, res) => {
    const { email, password } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
      stmt.run(email, password);
      res.json({ success: true, user: { email, tier: 'freemium' } });
    } catch (e) {
      res.status(400).json({ error: "User already exists" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password) as any;
    if (user) {
      res.json({ success: true, user: { email: user.email, tier: user.subscription_tier } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.get("/api/reports", (req, res) => {
    const reports = db.prepare("SELECT * FROM reports ORDER BY published_date DESC").all();
    res.json(reports);
  });

  app.get("/api/reports/:id", (req, res) => {
    const report = db.prepare("SELECT * FROM reports WHERE id = ?").get(req.params.id);
    res.json(report);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
