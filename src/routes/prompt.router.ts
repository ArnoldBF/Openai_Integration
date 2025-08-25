import { Router } from "express";
import validatorHandler from "../middlewares/validator.handler";
import {
    createPromptSchema,
    updatePromptSchema,
} from "../schemas/prompt.schema";
import {
    createPrompt,
    getPromptsAll,
    getPrompt,
    updatePrompt,
} from "../controllers/prompt.controller";

import { extraerDatosJWT } from "../middlewares/comprobarJwt";
import passport from "passport";

const router = Router();

router.get(
    "/all",
    passport.authenticate("jwt", { session: false }),
    extraerDatosJWT,
    getPromptsAll
);
router.get("/:id", passport.authenticate("jwt", { session: false }), getPrompt);
router.post(
    "/crear",
    passport.authenticate("jwt", { session: false }),
    extraerDatosJWT,
    validatorHandler(createPromptSchema, "body"),
    createPrompt
);
router.put(
    "/actualizar/:id",
    passport.authenticate("jwt", { session: false }),
    validatorHandler(updatePromptSchema, "body"),
    // validatorHandler(getPromptSchema, "params"),
    // validatorHandler(updatePromptSchema, "body"),
    updatePrompt
);

export default router;
