FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm i

CMD ["npm","run","dev","--","--host"]

EXPOSE 5173
