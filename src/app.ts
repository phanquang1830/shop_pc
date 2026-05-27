import express from "express";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/products", productRouter);

export default app;
