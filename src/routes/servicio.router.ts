import { Router } from "express";

import {
    createServicio,
    getServiciosAll,
} from "../controllers/servicio.controller";
import passport from "passport";

const router = Router();
router.post(
    "/crear",
    passport.authenticate("jwt", { session: false }),
    createServicio
);

router.get(
    "/all",
    passport.authenticate("jwt", { session: false }),
    getServiciosAll
);

export default router;
