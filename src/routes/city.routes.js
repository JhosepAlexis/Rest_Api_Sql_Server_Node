import { Router } from "express";
import {
  getCity,
} from "../controllers/city.controllers.js";

const router = Router();

router.get("/listadociudad", getCity);

export default router;