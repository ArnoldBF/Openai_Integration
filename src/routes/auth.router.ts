import { Router } from "express";
import passport from "passport";

import { login } from "../controllers/auth.controller";

const router = Router();

router.post(
    "/login",
    passport.authenticate("local", { session: false }),
    login
);

export default router;