FROM node:14
WORKDIR /app

COPY backend/package*.json /app/
RUN npm ci
COPY backend/dist /app/
EXPOSE 8001
CMD ["node", "index.js"]