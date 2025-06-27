import { Router } from "express";

import { createCliente } from "../controllers/cliente.controller";

const router = Router();

router.post("/crear", createCliente);

export default router;
