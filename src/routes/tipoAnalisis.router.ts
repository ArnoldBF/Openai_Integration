import { Router } from "express";

import {
    createTipoAnalisis,
    getTiposAnalisisAll,
    putTipoAnalisis,
} from "../controllers/tipoAnalisis.controller";

import { extraerDatosJWT } from "../middlewares/comprobarJwt";
import passport from "passport";

const router = Router();
router.post(
    "/crear",
    passport.authenticate("jwt", { session: false }),
    extraerDatosJWT,
    createTipoAnalisis
);

router.get(
    "/all",
    passport.authenticate("jwt", { session: false }),
    extraerDatosJWT,
    getTiposAnalisisAll
);

router.put(
    "/actualizar/:id",
    passport.authenticate("jwt", { session: false }),
    putTipoAnalisis
);

export default router;
