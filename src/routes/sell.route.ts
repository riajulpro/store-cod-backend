import { Router } from "express";
import {
  createSellController,
  deleteSellController,
  getAllSellsController,
  getCustomerBasedSellsController,
  getSellByIdController,
  updateSellController,
} from "../controllers/sell.controller";
import { isAuthenticatedUser } from "../middlewares/auth";

const router = Router();

router.post("/", createSellController);
router.get("/", getAllSellsController);
router.get("/:id", getSellByIdController);
router.patch("/:id", updateSellController);
router.delete("/:id", deleteSellController);
// customer based sells/order
router.get("/my/orders", isAuthenticatedUser, getCustomerBasedSellsController);

export default router;
