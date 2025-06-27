import { Router } from "express";

import {
    createTipoAnalisis,
    getTiposAnalisisAll,
} from "../controllers/tipoAnalisis.controller";

const router = Router();
router.post("/crear", createTipoAnalisis);

router.get("/all", getTiposAnalisisAll);

export default router;
