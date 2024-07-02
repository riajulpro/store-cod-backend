import express from "express";
import authRoute from "./auth.route";
import category from "./category.route";
import products from "./product.route";
import review from "./review.route";
const router = express.Router();

const moduleRoute = [
  {
    path: "/auth",
    route: authRoute,
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
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;