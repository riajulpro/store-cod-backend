import { Router } from "express";
import {
  createCustomerController,
  createStaffController,
  loginController,
} from "../controllers/auth.controller";
const router = Router();
router.post("/register/customer", createCustomerController);
router.post("/register/staff", createStaffController);
router.post("/login",loginController);
const authRoute = router;
export default authRoute;
