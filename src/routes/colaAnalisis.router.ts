import { Router } from "express";
import {
    crearColaAnalisis,
    estadoColaAnalisis,
} from "../controllers/colaAnalisis.controller";
import passport from "passport";

import { extraerDatosJWT } from "../middlewares/comprobarJwt";

const router = Router();

router.post(
    "/crear",
    passport.authenticate("jwt", { session: false }),
    extraerDatosJWT,
    crearColaAnalisis
);

router.get(
    "/estado",
    passport.authenticate("jwt", { session: false }),
    estadoColaAnalisis
);

export default router;
