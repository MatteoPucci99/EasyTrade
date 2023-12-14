import express from "express";
import {
  createSingleTrade,
  deleteSingleTrade,
  getAllTradesForStrategy,
  getTrades,
  updateSingleTrade,
} from "../controllers/singletrade.js";

const router = express.Router();

router.post("/createtrade", createSingleTrade);
router.get("/gettrades", getTrades);
router.get("/gettrades/:strategyId", getAllTradesForStrategy);
router.patch("/updatetrade/:id", updateSingleTrade);
router.delete("/deletetrade/:id", deleteSingleTrade);

export default router;
