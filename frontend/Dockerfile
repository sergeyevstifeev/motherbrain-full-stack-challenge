FROM node:13-alpine AS builder

RUN mkdir /frontend
WORKDIR /frontend

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "serve"]
