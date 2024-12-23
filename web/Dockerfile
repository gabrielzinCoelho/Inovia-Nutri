FROM node:20.18-alpine3.21 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:20.18-alpine3.21

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/.env ./.env
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/vite.config.ts ./vite.config.ts

RUN npm i typescript

EXPOSE 8080

CMD [ "npm", "run", "preview" ]