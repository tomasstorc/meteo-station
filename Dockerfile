FROM node:14 as build
WORKDIR /app
COPY backend/package*.json ./
COPY backend/tsconfig.json ./
RUN npm i
RUN npm run tsc

FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/dist .
RUN npm ci
EXPOSE 8001
CMD ["node", "index.js"]