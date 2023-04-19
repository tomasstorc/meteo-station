FROM node:14 as build
WORKDIR /app
COPY backend/package*.json .
RUN npm i
RUN tsc

FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/dist .
RUN npm ci
EXPOSE 8001
CMD ["node", "index.js"]