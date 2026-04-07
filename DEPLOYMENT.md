# Деплой приложения

## Варианты деплоя

### 1. GitHub Pages (рекомендуется для статики)
**URL:** `https://NURZHAN0V.github.io/palmacode_insta/`

#### Автоматический деплой через GitHub Actions
При каждом push в ветку `main` автоматически запускается workflow:
1. Генерируется статическая сборка приложения
2. Создаются файлы в `.output/public/`
3. Происходит деплой на GitHub Pages

#### Ручной деплой
```bash
# Генерация статики
yarn generate:gh-pages

# Или напрямую
yarn generate
```

#### Настройка GitHub Pages
1. Перейдите в Settings → Pages
2. Source: **GitHub Actions**
3. Приложение будет доступно по адресу: `https://NURZHAN0V.github.io/palmacode_insta/`

### 2. Docker (рекомендуется для production)
**Порт:** 3000

#### Быстрый старт
```bash
# Сборка образа
docker build -t nuxt-spa-app .

# Запуск контейнера
docker run -d -p 3000:80 --name nuxt-app nuxt-spa-app
```

#### Использование Docker Compose
```bash
# Запуск
docker-compose up -d

# Остановка
docker-compose down

# Просмотр логов
docker-compose logs -f
```

### 3. Локальная разработка
```bash
# Установка зависимостей
yarn install

# Запуск dev сервера
yarn dev

# Сборка для production
yarn build

# Предпросмотр собранного приложения
yarn preview
```

## Конфигурация для разных окружений

### GitHub Pages
- **Base URL:** `/palmacode_insta/`
- **Режим:** Статическая генерация (SPA)
- **Конфигурация:** `nuxt.config.ts` → `app.baseURL`

### Docker / Production
- **Base URL:** `/` (корневой)
- **Режим:** SPA с Nginx
- **Конфигурация:** `nginx.conf`

### Локальная разработка
- **Base URL:** `/`
- **Режим:** Dev server с HMR
- **Конфигурация:** По умолчанию

## Структура файлов для деплоя

### GitHub Pages
```
.output/public/
├── index.html          # Главная страница
├── _nuxt/              # Скомпилированные ресурсы
├── .nojekyll           # Отключение Jekyll обработки
└── favicon.ico         # Иконка
```

### Docker
```
Контейнер:
├── /usr/share/nginx/html/  # Статические файлы
└── /etc/nginx/conf.d/default.conf  # Конфигурация Nginx
```

## Переменные окружения

### Для GitHub Pages
```bash
NODE_ENV=production
NUXT_APP_BASE_URL=/palmacode_insta/
```

### Для Docker
```bash
NODE_ENV=production
```

## Мониторинг и логи

### GitHub Pages
- Логи доступны в GitHub Actions → Deploy to GitHub Pages
- Статус деплоя: Settings → Pages

### Docker
```bash
# Просмотр логов
docker logs nuxt-app

# Мониторинг ресурсов
docker stats nuxt-app

# Вход в контейнер
docker exec -it nuxt-app sh
```

## Устранение неполадок

### GitHub Pages
**Проблема:** Приложение не отображается
- Проверьте base URL в `nuxt.config.ts`
- Убедитесь, что workflow выполнился успешно
- Проверьте наличие `.nojekyll` файла

**Проблема:** Стили/скрипты не загружаются
- Проверьте пути к ресурсам в `_nuxt` директории
- Убедитесь, что сборка прошла без ошибок

### Docker
**Проблема:** Контейнер не запускается
```bash
# Проверьте логи
docker logs nuxt-app

# Проверьте порт
netstat -an | grep 3000
```

**Проблема:** Приложение недоступно
- Проверьте, что порт 3000 не занят
- Убедитесь, что образ собран корректно

## Оптимизация

### Для GitHub Pages
- Используйте `yarn generate:gh-pages` для предварительной проверки
- Минифицируйте ресурсы (включено по умолчанию)
- Настройте кэширование через `.nojekyll`

### Для Docker
- Используйте многоступенчатую сборку
- Используйте alpine образы для уменьшения размера
- Настройте кэширование в Nginx

## Безопасность

### GitHub Pages
- Все файлы публичные
- Не храните секреты в клиентском коде
- Используйте environment variables только для публичных данных

### Docker
- Используйте non-root пользователя в контейнере
- Регулярно обновляйте базовые образы
- Настройте безопасные заголовки в Nginx

## Дополнительные ресурсы

- [GitHub Pages документация](https://docs.github.com/en/pages)
- [Docker документация](https://docs.docker.com/)
- [Nuxt.js деплой](https://nuxt.com/docs/getting-started/deployment)
- [Nginx конфигурация](https://nginx.org/en/docs/)