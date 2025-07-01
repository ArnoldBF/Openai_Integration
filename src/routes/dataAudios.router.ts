import { Router } from "express";

import { getDataAudioByAudioId } from "../controllers/dataAudios.controller";

const router = Router();

router.get("/audios/:audioId", getDataAudioByAudioId);

export default router;
