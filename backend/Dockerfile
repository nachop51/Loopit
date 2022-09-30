FROM node:12
WORKDIR /api-nodejs
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]