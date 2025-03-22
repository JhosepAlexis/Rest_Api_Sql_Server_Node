import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
} from "../controllers/customer.controllers.js";

const router = Router();

router.get("/clientes", getCustomers);

router.get("/clientes/:TercerosID", getCustomer);

router.post("/clientes", createCustomer);

router.put("/clientes/:TercerosID", updateCustomer);

router.delete("/clientes/:TercerosID", deleteCustomer);

export default router;