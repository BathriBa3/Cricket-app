import express from "express";
import { endInnings } from "../controllers/match.controller.js";

const router = express.Router();

router.post("/endInnings", endInnings);

export default router;
