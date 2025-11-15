FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install rollup @rollup/rollup-linux-x64-gnu --save-dev

RUN npm install

COPY . .

EXPOSE 4200
CMD ["npm", "start"]
