import express from "express";
import { testLogin, getUsers } from "../controllers/auth.controller.js";

const router = express.Router();

router.put("/login", testLogin);
router.get("/login", getUsers);

export default router;
