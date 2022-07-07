FROM node:14.9.0 AS build-step

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.18-alpine
RUN apk add npm
COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /build/build /frontend/build