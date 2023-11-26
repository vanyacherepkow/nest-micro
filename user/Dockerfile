FROM node:18

WORKDIR /app

COPY ./user/package*.json ./

RUN npm install

COPY ./user .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]
