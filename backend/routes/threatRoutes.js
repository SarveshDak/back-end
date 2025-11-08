import express from "express";
import { fetchThreats } from "../controllers/threatController.js";
const router = express.Router();
router.get("/", fetchThreats);
export default router;
