import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import locationRoutes from "./routes/location.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/location", locationRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Connect to MongoDB (no options needed)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
