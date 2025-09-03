
Instagram + Messenger (Meta) integrados (archivos de ejemplo).
Para activarlos, en tu servidor Express agrega:
  const express = require('express');
  app.use(express.json({ limit: '2mb' }));
  app.use('/meta', require('./integrations/meta/webhook'));

Variables .env necesarias:
META_VERIFY_TOKEN=tu_token_verificacion
PAGE_ACCESS_TOKEN=token_pagina_messenger
IG_USER_ID=tu_instagram_user_id
IG_ACCESS_TOKEN=token_instagram

Luego configura Webhooks en developers.facebook.com apuntando a /meta/webhook.
