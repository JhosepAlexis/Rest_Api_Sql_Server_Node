import { Router } from "express";
import {
  createVenta,
  createNoVenta,
} from "../controllers/ventaNoVenta.controllers.js";

const router = Router();

// Middleware para CORS
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

router.post("/registro-venta", createVenta);

router.post("/registro-no-venta", createNoVenta);

export default router;