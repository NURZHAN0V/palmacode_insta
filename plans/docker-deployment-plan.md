# План Docker-деплоя для Nuxt.js SPA приложения

## Обзор
Создание Docker-контейнера для деплоя клиентского приложения (SPA) на Nuxt.js 4 с использованием Nginx для обслуживания статических файлов.

## Технические детали проекта
- **Фреймворк**: Nuxt.js 4
- **Режим рендеринга**: SPA (SSR отключен в конфигурации)
- **Сборка**: Статическая сборка в `.output/public`
- **Веб-сервер**: Nginx (alpine)
- **Node.js версия**: 20 (рекомендуемая для Nuxt 4)

## Файлы для создания

### 1. Dockerfile
```dockerfile
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
```

### 2. Конфигурация Nginx (nginx.conf)
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Безопасные заголовки
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Обработка SPA маршрутов
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэширование статических ресурсов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Запрет доступа к скрытым файлам
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### 3. .dockerignore
```
# Игнорируемые файлы для Docker
node_modules
.nuxt
.nitro
.output
.cache
dist
*.log
logs
.DS_Store
.fleet
.idea
.env
.env.*
!.env.example
.git
.gitignore
.dockerignore
Dockerfile
docker-compose.yml
README.md
CHANGELOG.md
AGENTS.md
plans/
docs/
tests/
templates/
tasks/
```

### 4. docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: nuxt-spa-app
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - app-network

  # Опционально: можно добавить Traefik для reverse proxy
  # traefik:
  #   image: traefik:v3.0
  #   container_name: traefik
  #   ports:
  #     - "80:80"
  #     - "443:443"
  #   volumes:
  #     - /var/run/docker.sock:/var/run/docker.sock:ro
  #     - ./traefik.yml:/etc/traefik/traefik.yml
  #   networks:
  #     - app-network

networks:
  app-network:
    driver: bridge
```

### 5. Скрипт сборки и запуска (deploy.sh)
```bash
#!/bin/bash

# Скрипт для сборки и запуска Docker-контейнера

set -e

echo "🔨 Сборка Docker образа..."
docker build -t nuxt-spa-app:latest .

echo "🚀 Запуск контейнера..."
docker run -d \
  --name nuxt-spa-app \
  -p 3000:80 \
  --restart unless-stopped \
  nuxt-spa-app:latest

echo "✅ Приложение запущено на http://localhost:3000"
```

## Инструкция по использованию

### Быстрый старт
1. Убедитесь, что установлен Docker и Docker Compose
2. Поместите все созданные файлы в корень проекта
3. Выполните команду сборки:
   ```bash
   docker build -t nuxt-spa-app .
   ```
4. Запустите контейнер:
   ```bash
   docker run -d -p 3000:80 --name nuxt-spa-app nuxt-spa-app
   ```

### Использование Docker Compose
```bash
# Запуск
docker-compose up -d

# Остановка
docker-compose down

# Просмотр логов
docker-compose logs -f
```

### Переменные окружения
Приложение использует следующие переменные окружения (при необходимости):
- `NODE_ENV` - окружение выполнения (production/development)
- `NUXT_PUBLIC_*` - публичные переменные Nuxt

Для добавления переменных создайте `.env` файл или передайте через `docker run -e`.

## Оптимизации
1. **Многоступенчатая сборка** - уменьшает итоговый размер образа
2. **Alpine образы** - минималистичные базовые образы
3. **Кэширование зависимостей** - ускорение повторных сборок
4. **Gzip сжатие** - уменьшение размера передаваемых данных
5. **Долгосрочное кэширование статики** - улучшение производительности

## Мониторинг и логи
```bash
# Просмотр логов контейнера
docker logs nuxt-spa-app

# Мониторинг ресурсов
docker stats nuxt-spa-app

# Вход в контейнер
docker exec -it nuxt-spa-app sh
```

## Безопасность
- Использование non-root пользователя в контейнере
- Безопасные заголовки HTTP
- Запрет доступа к скрытым файлам
- Регулярное обновление базовых образов

## Дальнейшие улучшения
1. Добавление health-check
2. Настройка SSL/TLS через Let's Encrypt
3. Интеграция с CI/CD (GitHub Actions, GitLab CI)
4. Мониторинг с помощью Prometheus
5. Логирование в централизованную систему

## Примечания
- Приложение работает в режиме SPA, все маршруты перенаправляются на index.html
- Для SSR режима потребуется другая конфигурация с Node.js сервером
- Убедитесь, что порт 3000 (или другой выбранный) свободен на хосте