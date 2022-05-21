FROM node:16.14

MAINTAINER devwookkl

WORKDIR /app

COPY package*.json /app/

COPY . /app/

RUN npm install -g npm@8.10.0

RUN npm install

RUN npm install -g typescript ts-node

EXPOSE 3000

CMD [ "npm", "run", "start" ]
