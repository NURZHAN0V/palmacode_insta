# Dockerfile для Nuxt.js SPA приложения с Nginx
# Многоступенчатая сборка для оптимизации размера образа

# Этап 1: Сборка приложения
FROM node:20-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование файлов зависимостей
COPY package*.json ./
COPY yarn.lock ./

# Установка зависимостей
RUN yarn install --frozen-lockfile --production=false

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN yarn build

# Этап 2: Продакшн-сервер с Nginx
FROM nginx:alpine AS production

# Копирование собранных файлов из этапа сборки
COPY --from=builder /app/.output/public /usr/share/nginx/html

# Копирование кастомной конфигурации Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Экспорт порта
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]