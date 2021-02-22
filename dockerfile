FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY . ./

RUN npm install

EXPOSE 3000

CMD ["node", "./bin/www"]

