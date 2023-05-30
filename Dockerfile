# STAGE 1

FROM node:14-alpine AS build

WORKDIR /app

COPY package.json /app

RUN yarn  install

COPY . /app

RUN yarn build

# STAGE 2

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
