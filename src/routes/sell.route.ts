import { Router } from "express";
import {
  createSellController,
  getAllSellsController,
  getSellByIdController,
  updateSellController,
  deleteSellController
} from "../controllers/sell.controller"; 

const router = Router();

router.post("/", createSellController);
router.get("/", getAllSellsController);
router.get("/:id", getSellByIdController);
router.patch("/:id", updateSellController);
router.delete("/:id", deleteSellController);

export default router;
