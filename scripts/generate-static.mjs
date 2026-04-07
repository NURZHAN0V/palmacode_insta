#!/usr/bin/env node

/**
 * Скрипт для генерации статики и проверки перед деплоем на GitHub Pages
 * ES Module версия
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🚀 Генерация статики для GitHub Pages...\n');

try {
  // Установка переменных окружения для GitHub Pages
  process.env.NODE_ENV = 'production';
  process.env.NUXT_APP_BASE_URL = '/palmacode_insta/';

  console.log('1. Очистка предыдущей сборки...');
  execSync('yarn clean', { stdio: 'inherit', cwd: projectRoot });

  console.log('\n2. Генерация статических файлов...');
  execSync('yarn generate', { stdio: 'inherit', cwd: projectRoot });

  console.log('\n3. Проверка сгенерированных файлов...');
  const outputDir = path.join(projectRoot, '.output', 'public');
  
  if (!fs.existsSync(outputDir)) {
    throw new Error(`Директория ${outputDir} не найдена`);
  }

  const files = fs.readdirSync(outputDir);
  console.log(`✅ Сгенерировано ${files.length} файлов/папок в .output/public/`);
  
  // Проверка наличия index.html
  if (!fs.existsSync(path.join(outputDir, 'index.html'))) {
    throw new Error('index.html не найден!');
  }
  console.log('✅ index.html найден');

  // Проверка наличия _nuxt директории
  const nuxtDir = path.join(outputDir, '_nuxt');
  if (fs.existsSync(nuxtDir)) {
    const nuxtFiles = fs.readdirSync(nuxtDir);
    console.log(`✅ Папка _nuxt содержит ${nuxtFiles.length} файлов`);
  }

  // Создание .nojekyll файла для GitHub Pages
  const nojekyllPath = path.join(outputDir, '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Создан .nojekyll файл');

  // Создание CNAME файла (если нужно)
  // fs.writeFileSync(path.join(outputDir, 'CNAME'), 'your-domain.com');

  console.log('\n🎉 Генерация завершена успешно!');
  console.log('\n📁 Сгенерированные файлы находятся в: .output/public/');
  console.log('📏 Размер директории:', getDirectorySize(outputDir), 'байт');
  
  console.log('\n📋 Для деплоя на GitHub Pages:');
  console.log('   1. Запустите workflow вручную через GitHub Actions');
  console.log('   2. Или дождитесь автоматического деплоя после push в main');
  console.log('   3. Или используйте: gh-pages -d .output/public');

} catch (error) {
  console.error('\n❌ Ошибка при генерации статики:');
  console.error(error.message);
  process.exit(1);
}

function getDirectorySize(dir) {
  let size = 0;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      size += getDirectorySize(filePath);
    } else {
      const stats = fs.statSync(filePath);
      size += stats.size;
    }
  }
  return size;
}