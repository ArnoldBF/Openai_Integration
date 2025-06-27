import { Router } from "express";
import {
    crearColaAnalisis,
    estadoColaAnalisis,
} from "../controllers/colaAnalisis.controller";

const router = Router();

router.post("/crear", crearColaAnalisis);

router.get("/estado", estadoColaAnalisis);

export default router;
