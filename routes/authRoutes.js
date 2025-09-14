import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Routes
// POST /api/auth/register
router.post("/register", registerController);

// POST /api/auth/login
router.post("/login", loginController);

// GET /api/auth/test
router.get("/test", auth, testController);

export default router;
