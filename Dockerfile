FROM node:latest

LABEL maintainer="remisa.yousefvand@gmail.com"
RUN mkdir /usr/src/exifer
COPY index.js /usr/src/exifer
COPY package*.json /usr/src/exifer/
WORKDIR /usr/src/exifer
RUN npm i
CMD [ "node", "index.js" ]