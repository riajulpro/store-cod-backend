import { Router } from "express";
import {
  createSellController,
  deleteSellController,
  getAllSellsController,
  getCustomerBasedSellsController,
  getSellByIdController,
  trackCustomerOrder,
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
router.get("/my/order/:orderId", isAuthenticatedUser, trackCustomerOrder);

export default router;
