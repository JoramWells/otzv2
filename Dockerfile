FROM node:20-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install --ignore-scripts

COPY . .

EXPOSE 3000

ENV CHOKIDAR_USEPOLLING=true

CMD ["yarn","run", "dev"]