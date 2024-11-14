FROM node:20-alpine


RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN npm cache clean --force

RUN pnpm install

COPY . .

EXPOSE 3000

ENV CHOKIDAR_USEPOLLING=true

CMD ["yarn","run", "dev"]