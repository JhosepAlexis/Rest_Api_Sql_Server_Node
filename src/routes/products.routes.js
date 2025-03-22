import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProdut,
  updateProduct,
} from "../controllers/products.controllers.js";

const router = Router();

router.get("/productos", getProducts);

router.get("/productos/:ArticulosID", getProdut);

router.post("/productos", createProduct);

router.put("/productos/:ArticulosID", updateProduct);

router.delete("/productos/:ArticulosID", deleteProduct);

export default router;
