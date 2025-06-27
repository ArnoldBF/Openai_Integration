import { Router } from "express";
import {
    createClaveAnalisis,
    getClavesAnalisisAll,
} from "../controllers/claveAnalisis.controller";

const router = Router();

router.post("/crear", createClaveAnalisis);

router.get("/all", getClavesAnalisisAll);

export default router;
