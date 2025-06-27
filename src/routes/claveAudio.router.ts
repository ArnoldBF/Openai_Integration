import { Router } from "express";

import {
    createClaveAudio,
    getClavesAudioAll,
} from "../controllers/claveAudio.controller";

const router = Router();

router.post("/crear", createClaveAudio);
router.get("/all", getClavesAudioAll);
export default router;
