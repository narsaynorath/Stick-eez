FROM node:12-stretch

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --network-timeout 100000

COPY . .

CMD ["yarn", "start"]
