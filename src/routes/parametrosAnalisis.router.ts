import { Router } from "express";

import {
    createParametroAnalisis,
    getParametrosAnalisisAll,
} from "../controllers/parametroAnalisis.controller";

const router = Router();

router.post("/crear", createParametroAnalisis);

router.get("/", getParametrosAnalisisAll);

export default router;
