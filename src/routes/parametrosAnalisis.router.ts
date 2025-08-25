import { Router } from "express";

import {
    createParametroAnalisis,
    getParametrosAnalisisAll,
} from "../controllers/parametroAnalisis.controller";
import passport from "passport";
import { extraerDatosJWT } from "../middlewares/comprobarJwt";

const router = Router();

router.post(
    "/crear",
    passport.authenticate("jwt", { session: false }),
    createParametroAnalisis
);

router.get(
    "/all",
    passport.authenticate("jwt", { session: false }),
    extraerDatosJWT,
    getParametrosAnalisisAll
);

export default router;
