FROM oven/bun

WORKDIR /app

COPY front/package*.json ./
COPY front/bun.lockb ./

RUN bun install

COPY front .

COPY interface ./interface

ENV NODE_ENV=production

RUN bun run build

EXPOSE 3000

CMD ["bun", "start"]