import express from "express";
import { saveLocation } from "../controllers/locationController.js";

const router = express.Router();

// POST /location
router.post("/", saveLocation);

export default router;
