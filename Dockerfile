# ----- Build -----
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código
COPY . .

# Compilar TypeScript
RUN npm run build

# ----- Runtime -----
FROM node:20-alpine

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Rodar bot

