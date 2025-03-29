import { Router } from "express";
import {
  getBusinessType,
} from "../controllers/businesstype.controllers.js";

const router = Router();

router.get("/tiponegocios", getBusinessType);

export default router;