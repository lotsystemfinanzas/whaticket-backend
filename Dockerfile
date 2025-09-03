# ---- build ----
FROM node:18-bullseye AS build
WORKDIR /app

COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
RUN npm run build
RUN npm prune --omit=dev

# ---- runtime ----
FROM node:18-bullseye-slim AS runtime
WORKDIR /app

# Dependencias de Chromium (whatsapp-web.js/puppeteer). Si no las necesitas, puedes eliminarlas.
RUN apt-get update && apt-get install -y --no-install-recommends     chromium ca-certificates     libnss3 libatk-bridge2.0-0 libxss1 libasound2 libx11-xcb1 libxcomposite1 libxrandr2 libxi6     libgtk-3-0 libxdamage1 libgbm1 libdrm2 libxshmfence1 libcups2 fonts-liberation   && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production     PUPPETEER_SKIP_DOWNLOAD=1     PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env ./.env
COPY --from=build /app/config ./config

EXPOSE 3000
CMD ["npm","start"]
