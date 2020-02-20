FROM node:13-alpine

RUN mkdir /backend
WORKDIR /backend

COPY package.json yarn.lock /backend/
RUN yarn --pure-lockfile

COPY . .

CMD ["yarn", "start"]
