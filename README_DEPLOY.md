# Backend (producción estable)

- `.env` **incluido** (DB interna Railway, URLs, JWT).
- `start` usa **node** con `-r dotenv/config` (no nodemon).
- Dockerfile **multi-stage** (Node 18) **compila TypeScript** a `dist/` y copia **.env** al runtime.
- Chromium instalado (necesario para **whatsapp-web.js / puppeteer**).

## Deploy en Railway
1. Conecta este repo. Railway detectará **Dockerfile**.
2. **Target port**: `3000`.
3. (Opcional) Variables del servicio no son necesarias, ya que `.env` está dentro de la imagen.
4. Logs deben mostrar conexión a `mysql.railway.internal:3306`.

> Si NO usas whatsapp-web.js, puedes cambiar a un Dockerfile SIN Chromium para una imagen más ligera.
