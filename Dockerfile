FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./app.js .

CMD ["npm","start"]