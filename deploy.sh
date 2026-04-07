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
echo "📋 Команды для управления:"
echo "   Просмотр логов: docker logs nuxt-spa-app"
echo "   Остановка: docker stop nuxt-spa-app"
echo "   Удаление: docker rm nuxt-spa-app"