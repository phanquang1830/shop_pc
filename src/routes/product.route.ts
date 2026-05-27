import { Router } from "express";

import {
  create,
  fillAll,
  findBySlug,
} from "../controllers/product.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const productRouter = Router();

productRouter.get("/", fillAll);

productRouter.get("/:slug", findBySlug);

productRouter.post("/", authenticate, authorize(["ADMIN"]), create);

export default productRouter;
