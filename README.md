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

