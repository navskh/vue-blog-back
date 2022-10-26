# Base Node
FROM node:16 AS base
# Direct Setting
RUN mkdir /treasure-blog-server
WORKDIR /treasure-blog-server
# Package Copy
COPY package.json .
COPY .env .
COPY .env.development .
COPY .env.local .
# Environment Variable Setting
# ARG NODE_ENV
# ENV NODE_ENV=${NODE_ENV}
# Dependencies
FROM base AS dependencies
# Node Packages Setup
RUN npm set progress=false && npm config set depth 0
RUN npm install
# Builder
FROM base AS builder
COPY --from=dependencies /treasure-blog-server/node_modules ./node_modules
COPY ./src ./src
# Expose PORT and define CMD
EXPOSE 3002
CMD ["sh", "-c", "npm run start"]