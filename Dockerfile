FROM node:14 as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm install -g @angular/cli && \
    ng build --prod

FROM node:14

WORKDIR /app

COPY --from=builder /app/dist /app/dist

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080", "./dist"]
