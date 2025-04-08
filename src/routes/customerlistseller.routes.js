import { Router } from "express";
import {
  getCustomerListSeller,
} from "../controllers/customerlistseller.controllers.js";

const router = Router();

router.get("/listadoclientesvendedor", getCustomerListSeller);

export default router;   