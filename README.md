# Название проекта

Краткое описание проекта

## Стек технологий

- **Nuxt** 4 — фреймворк на Vue
- **Vue** 3 — UI
- **Pinia** — состояние приложения
- **Tailwind CSS** — стили (палитра: warm, teal, ink)
- **Nuxt Icon** — иконки (Material Symbols Light)
- **Nuxt Image** — оптимизация изображений

## Архитектура проекта

Структура соответствует Nuxt 4, рендеринг только на клиенте.

```
bigcheese_client/
├── app/
│   ├── app.vue
│   ├── error.vue
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── layouts/
│   │   ├── admin.vue
│   │   └── default.vue
│   └── pages/
│       └── index.vue
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sw.js
├── nuxt.config.ts
├── tailwind.config.js
└── package.json
```

## Docker-деплой

Проект включает конфигурацию для развертывания с помощью Docker.

### Быстрый старт

1. **Соберите Docker образ**:
   ```bash
   docker build -t nuxt-spa-app .
   ```

2. **Запустите контейнер**:
   ```bash
   docker run -d -p 3000:80 --name nuxt-app nuxt-spa-app
   ```

3. **Откройте приложение**:
   ```
   http://localhost:3000
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

### Файлы Docker

- `Dockerfile` — многоступенчатая сборка с Node.js и Nginx
- `nginx.conf` — конфигурация веб-сервера для SPA
- `.dockerignore` — игнорируемые файлы
- `docker-compose.yml` — оркестрация контейнеров
- `deploy.sh` — скрипт для быстрого деплоя

### Детальная документация

Подробные инструкции по развертыванию доступны в [README-docker.md](README-docker.md) и [plans/docker-deployment-plan.md](plans/docker-deployment-plan.md).

## Разработка

### Установка зависимостей

```bash
yarn install
```

### Запуск в режиме разработки

```bash
yarn dev
```

### Сборка для production

```bash
yarn build
```

### Предпросмотр собранного приложения

```bash
yarn preview
```

## Тестирование

```bash
# Запуск тестов
yarn test

# Проверка типов
yarn typecheck
```

## Конфигурация

### Переменные окружения

Создайте файл `.env` на основе `.env.example`:
```
# Пример переменных окружения
NODE_ENV=production
```

### Tailwind CSS

Цветовая палитра определена в `tailwind.config.js`. Используйте только цвета из палитры.

## Лицензия

[Указать лицензию]
