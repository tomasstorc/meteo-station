FROM node:14 as build
WORKDIR /app
COPY backend/package*.json ./
COPY backend/tsconfig.json ./
RUN npm i
RUN npm install typescript -g
COPY backend .
RUN tsc

FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/dist .
COPY --from=build /app/package*.json ./
COPY backend/fe ./public
RUN npm ci
EXPOSE 8001
CMD ["node", "index.js"]