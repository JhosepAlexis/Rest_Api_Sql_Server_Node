import { Router } from "express";
import {
  getLatitudLongitud,
} from "../controllers/latlon.controllers.js";

const router = Router();

router.get("/latitudlongitud", getLatitudLongitud);

export default router;