FROM node:10

COPY . /home/node/app

WORKDIR /home/node/app

EXPOSE 3000

RUN npm install

CMD [ "npm", "start" ]