FROM node:current-slim
RUN apt-get update 
RUN mkdir /server
WORKDIR /server
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]
