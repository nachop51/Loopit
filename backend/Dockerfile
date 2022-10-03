FROM node:16
WORKDIR /loopit
RUN ["cd", "backend"]
COPY package*.json ./
RUN npm install
RUN ["cd","../frontend"]
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]