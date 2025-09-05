import { Router } from "express";
import { listIntegrations, deleteIntegration } from "../controllers/integrationController";

const router = Router();
router.get("/", listIntegrations);
router.delete("/:id", deleteIntegration);

export default router;
