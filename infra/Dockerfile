FROM node:22-alpine AS build

WORKDIR /app/site

COPY site/package.json site/package-lock.json ./
RUN npm ci

COPY site/ ./
COPY docs /app/docs
COPY mermaid /app/mermaid
RUN node --experimental-strip-types scripts/fetch_repo_data.ts \
    && node --experimental-strip-types scripts/fetch_discussions.ts \
    && node --experimental-strip-types scripts/fetch_projects.ts \
    && npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY infra/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/site/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --spider http://127.0.0.1:8080/ || exit 1
EXPOSE 8080
