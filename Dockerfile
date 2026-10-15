FROM oven/bun:1 AS base
WORKDIR /usr/src/app


FROM base AS build-deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile


FROM base AS build
COPY --from=build-deps /usr/src/app/node_modules ./node_modules

COPY . .
RUN cp ./.env.example ./.env

ENV NODE_ENV=production

RUN bun run build


FROM base AS release-deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production


FROM base AS release

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=release-deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./

USER bun

EXPOSE 3000

CMD ["bun", "index.js"]
