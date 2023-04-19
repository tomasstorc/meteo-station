FROM node:14
WORKDIR /app

COPY backend/package*.json /app/
RUN npm ci
RUN tsc
COPY ./dist .
EXPOSE 8001
CMD ["node", "index.js"]