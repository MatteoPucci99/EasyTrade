import express from "express";
import {
  createStrategy,
  deleteStrategy,
  getStrategies,
  getStrategyById,
  updateStrategy,
} from "../controllers/strategies.js";

const router = express.Router();

router.get("/", getStrategies);
router.post("/", createStrategy);
router.patch("/:id", updateStrategy);
router.get("/:id", getStrategyById);
router.delete("/:id", deleteStrategy);

export default router;
