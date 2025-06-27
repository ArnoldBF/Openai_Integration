import { Router } from "express";

import {
    createServicio,
    getServiciosAll,
} from "../controllers/servicio.controller";

const router = Router();
router.post("/crear", createServicio);

router.get("/all", getServiciosAll);

export default router;
