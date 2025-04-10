import { Router } from "express";
import {
  getCustomerListRout,
} from "../controllers/customerlistrout.controllers.js";

const router = Router();

router.get("/listadoclientesrutero", getCustomerListRout);

export default router;   