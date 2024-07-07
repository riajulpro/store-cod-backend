import express from "express";
import authRoute from "./auth.route";
import category from "./category.route";
import products from "./product.route";
import review from "./review.route";
import sell from "./sell.route";
import customerRoute from "./customer.route";
const router = express.Router();

const moduleRoute = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/customer",
    route: customerRoute,
  },
  {
    path: "/category",
    route: category,
  },
  {
    path: "/product",
    route: products,
  },
  {
    path: "/review",
    route: review,
  },
  {
    path: "/sell",
    route: sell,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
