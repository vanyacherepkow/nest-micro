FROM node:18

WORKDIR /app

COPY ./auth/package*.json ./

RUN npm install

COPY ./auth .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]
