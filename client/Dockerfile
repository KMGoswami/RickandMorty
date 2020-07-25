FROM node:current-slim
RUN apt-get update 
RUN mkdir /client
WORKDIR /client
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
