FROM node:18 as base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM base AS dev
RUN npm i -g rapini
ENTRYPOINT ["/bin/bash", "-c", "while sleep 1000; do :; done"]

FROM base AS build-step
COPY . .
RUN npm run build

FROM nginx:1.18-alpine AS production
RUN apk add npm
COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /build/build /frontend/build