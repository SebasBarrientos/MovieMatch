# Usar Node 20.9.0 Alpine
FROM node:20.9.0-alpine

# Crear grupo y usuario
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Fijar directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero para cache
COPY package*.json ./

# Instalar dependencias con legacy-peer-deps (evita conflictos)
RUN npm install --legacy-peer-deps

# Copiar el resto de archivos
COPY . .

# Copiar archivo de entorno si se pasa como argumento
ARG ENV_FILE
COPY ${ENV_FILE} .env

# Definir variable de entorno antes de build
ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}

# Construir la app
RUN npm run build

# Puerto que Cloud Run espera
ENV PORT 3000
EXPOSE 3000

# Cambiar al usuario no root
USER nextjs

# Ejecutar la app
CMD [ "npm", "start" ]