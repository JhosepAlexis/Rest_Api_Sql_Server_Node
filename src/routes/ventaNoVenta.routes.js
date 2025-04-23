import { Router } from "express";
import {
  createVenta,
  createNoVenta,
} from "../controllers/ventaNoVenta.controllers.js";

const router = Router();

router.post("/registro-venta", createVenta);

router.post("/registro-no-venta", createNoVenta);

export default router;