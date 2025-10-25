# construcción
FROM node:18-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# servidor usando serve
FROM node:18-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build .
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]