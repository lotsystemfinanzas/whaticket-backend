import { Router } from "express";
import { instagramConnect, messengerConnect, metaCallback } from "../controllers/metaController";

const router = Router();

router.post("/instagram/connect", instagramConnect);
router.post("/messenger/connect", messengerConnect);
router.get("/callback", metaCallback);

export default router;
