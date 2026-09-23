import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import matchRoutes from "./routes/match.routes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Routes
app.use("/", authRoutes);
app.use("/", matchRoutes);

// Example API
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from Node.js backend",
  });
});

// Centralized error handler — must be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
