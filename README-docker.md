# Docker-деплой Nuxt.js SPA приложения

## Краткое руководство по развертыванию

### Предварительные требования
- Docker и Docker Compose установлены
- Node.js 20+ (для локальной разработки)

### Быстрый старт

1. **Скопируйте необходимые файлы** из плана в корень проекта:
   - `Dockerfile`
   - `nginx.conf`
   - `.dockerignore`
   - `docker-compose.yml`

2. **Соберите Docker образ**:
   ```bash
   docker build -t nuxt-spa-app .
   ```

3. **Запустите контейнер**:
   ```bash
   docker run -d -p 3000:80 --name nuxt-app nuxt-spa-app
   ```

4. **Откройте приложение** в браузере:
   ```
   http://localhost:3000
   ```

### Использование Docker Compose (рекомендуется)

```bash
# Запуск
docker-compose up -d

# Остановка
docker-compose down

# Пересборка и запуск
docker-compose up -d --build

# Просмотр логов
docker-compose logs -f
```

### Файлы для создания

#### 1. Dockerfile
Создайте файл `Dockerfile` в корне проекта с содержимым:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/.output/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 2. nginx.conf
Создайте файл `nginx.conf` в корне проекта:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

#### 3. .dockerignore
Создайте файл `.dockerignore`:
```
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

#### 4. docker-compose.yml
Создайте файл `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    container_name: nuxt-spa-app
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Полезные команды

```bash
# Очистка Docker
docker system prune -f

# Просмотр запущенных контейнеров
docker ps

# Остановка контейнера
docker stop nuxt-app

# Удаление контейнера
docker rm nuxt-app

# Удаление образа
docker rmi nuxt-spa-app

# Вход в контейнер
docker exec -it nuxt-app sh

# Просмотр логов
docker logs -f nuxt-app
```

### Переменные окружения

Для настройки приложения создайте файл `.env` в корне проекта:
```
NODE_ENV=production
# NUxt публичные переменные
# NUXT_PUBLIC_API_URL=https://api.example.com
```

Или передавайте через Docker:
```bash
docker run -d -p 3000:80 -e NODE_ENV=production --name nuxt-app nuxt-spa-app
```

### Производственное развертывание

Для production рекомендуется:
1. Использовать reverse proxy (Nginx, Traefik, Caddy)
2. Настроить SSL/TLS сертификаты
3. Реализовать health checks
4. Настроить мониторинг и логирование
5. Использовать orchestration (Docker Swarm, Kubernetes)

### Устранение неполадок

**Проблема**: Контейнер не запускается
```bash
# Проверьте логи
docker logs nuxt-app

# Проверьте, собран ли образ
docker images | grep nuxt-spa-app
```

**Проблема**: Приложение не доступно по порту
```bash
# Проверьте, слушает ли порт
docker port nuxt-app

# Проверьте, не занят ли порт
netstat -an | grep 3000
```

**Проблема**: Ошибки при сборке
```bash
# Очистите кэш сборки
docker builder prune

# Попробуйте собрать без кэша
docker build --no-cache -t nuxt-spa-app .
```

### Дополнительные ресурсы

- [Детальный план деплоя](plans/docker-deployment-plan.md)
- [Официальная документация Docker](https://docs.docker.com/)
- [Nuxt.js документация по деплою](https://nuxt.com/docs/getting-started/deployment)

---

**Примечание**: Это SPA приложение, все маршруты перенаправляются на index.html. Для SSR режима потребуется другая конфигурация.