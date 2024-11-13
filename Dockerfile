FROM node:20-alpine


RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn cache clean --force

RUN yarn install --legacy-peer-deps

COPY . .

EXPOSE 3000

ENV CHOKIDAR_USEPOLLING=true

CMD ["yarn","run", "dev"]