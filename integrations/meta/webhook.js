
// Webhooks de Meta (Messenger + Instagram)
const express = require('express');
const router = express.Router();

router.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'change-me';
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) return res.status(200).send(challenge);
  return res.sendStatus(403);
});

router.post('/webhook', (req, res) => {
  const body = req.body;
  try {
    if (Array.isArray(body.entry)) {
      body.entry.forEach(entry => {
        if (entry.messaging) {
          entry.messaging.forEach(event => {
            if (event.message && event.sender && event.sender.id) {
              console.log('[Messenger]', event.sender.id, event.message.text || '');
            }
          });
        }
        if (entry.changes) {
          entry.changes.forEach(change => {
            if (change.field === 'messages' || change.field === 'instagram_direct') {
              console.log('[Instagram change]', JSON.stringify(change));
            }
          });
        }
      });
      return res.sendStatus(200);
    }
  } catch(e){ console.error('Meta webhook error', e); }
  return res.sendStatus(404);
});

module.exports = router;
