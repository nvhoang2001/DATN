
# build stage
FROM node:14.18.0-alpine3.14 as builder
WORKDIR /app
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn install 
COPY . .
RUN yarn build

FROM nginx:1.21.4-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/app.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
