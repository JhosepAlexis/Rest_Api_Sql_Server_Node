import { Router } from "express";
import {
  getVendorsList,
} from "../controllers/listvendors.controllers.js";

const router = Router();

router.get("/listadovendedores", getVendorsList);

export default router;