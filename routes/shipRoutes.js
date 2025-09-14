import express from "express";
import {
  createNewShip,
  deleteShip,
  getAllShips,
  getShipById,
  updateShip,
} from "../controllers/shipController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Routes
// GET /api/ships
router.get("/", getAllShips);

// GET /api/ships/:id
router.get("/:id", getShipById);

// POST /api/ships
router.post("/", auth, createNewShip);

// PUT /api/ships/:id
router.put("/:id", auth, updateShip);

// DELETE /api/ships/:id
router.delete("/:id", auth, deleteShip);

export default router;
