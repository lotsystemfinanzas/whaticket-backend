import { Router } from "express";

const router = Router();

// GET verify
router.get("/meta", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  const verifyToken = process.env.META_VERIFY_TOKEN;
  if (mode === "subscribe" && token === verifyToken) {
    return res.status(200).send(String(challenge));
  }
  return res.sendStatus(403);
});

// POST receive
router.post("/meta", (req, res) => {
  try {
    console.log("Webhook Meta payload:", JSON.stringify(req.body));
  } catch {}
  return res.sendStatus(200);
});

export default router;
