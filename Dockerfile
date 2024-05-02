FROM node:20-alpine

ARG NODE_ENV

ENV NODE_ENV ${NODE_ENV}

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

ENV CHOKIDAR_USEPOLLING=true

CMD ["yarn","run", "dev"]