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

const router = Router();

router.get("/", getPromptsAll);
router.get("/:id", getPrompt);
router.post("/", validatorHandler(createPromptSchema, "body"), createPrompt);
router.put(
    "/:id",
    validatorHandler(updatePromptSchema, "body"),
    // validatorHandler(getPromptSchema, "params"),
    // validatorHandler(updatePromptSchema, "body"),
    updatePrompt
);

export default router;
