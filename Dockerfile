FROM node:alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./

RUN npm install -g yarn

USER node

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

EXPOSE 3000

# Pastikan sesuai script start kamu
CMD ["yarn", "start"]
