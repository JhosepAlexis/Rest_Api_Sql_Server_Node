import { Router } from "express";
import {
  getCustomerListRout,
} from "../controllers/customerlistrout.controllers.js";

const router = Router();

router.post("/listadoclientesrutero", getCustomerListRout);

export default router;   