FROM node:16-alpine

WORKDIR /app/src

ENV PORT 3000

COPY . /app/src

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]