import { Router } from "express";
import {
  createCustomerController,
  createStaffController,
  genereteAccessToken,
  loginController,
} from "../controllers/auth.controller";
const router = Router();
router.post("/register/customer", createCustomerController);
router.post("/register/staff", createStaffController);
router.post("/login", loginController);
router.post("/refreshToken", genereteAccessToken);
const authRoute = router;
export default authRoute;
