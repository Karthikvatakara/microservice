FROM node:20.5.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8005

CMD [ "npm" , "run" , "dev" ]
