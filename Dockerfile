# Dev-server image for local testing, per the "Developing" section of README.md.
# Portal has no first-party production Docker image/build; this packages the
# documented `pnpm install && pnpm run dev` workflow into a container.

FROM node:22-slim

WORKDIR /app

RUN npm install --global pnpm@10

# Install deps first so this layer is cached unless the lockfile changes.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev"]
