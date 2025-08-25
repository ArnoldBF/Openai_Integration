import { Router } from "express";
import {
    createClaveAnalisis,
    getClavesAnalisisAll,
    putClaveAnalisis,
} from "../controllers/claveAnalisis.controller";
import passport from "passport";
import { extraerDatosJWT } from "../middlewares/comprobarJwt";

const router = Router();

router.post(
    "/crear",
    passport.authenticate("jwt", { session: false }),
    extraerDatosJWT,
    createClaveAnalisis
);

router.get(
    "/all",
    passport.authenticate("jwt", { session: false }),
    extraerDatosJWT,
    getClavesAnalisisAll
);

router.put(
    "/actualizar/:id",
    passport.authenticate("jwt", { session: false }),
    putClaveAnalisis
);

export default router;
