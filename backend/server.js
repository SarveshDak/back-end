import express from "express";
import cors from "cors";
import fetchThreatData from "./backend/utils/fetchThreats.js";

const app = express();

// ✅ Allow CORS from your frontend URL
app.use(
  cors({
    origin: [
      "https://react-project-tau-lemon.vercel.app", // your Vercel frontend
      "http://localhost:5173"                        // local dev
    ],
  })
);

app.get("/api/threats", async (req, res) => {
  try {
    const data = await fetchThreatData();
    res.json(data);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: "Server failed to fetch threats" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

