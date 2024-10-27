# Этап 1: Сборка приложения
FROM node:18 AS builder

# Установка рабочей директории
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Этап 2: Создание рабочего образа
FROM nginx:alpine

# Копируем собранные файлы в директорию, откуда Nginx будет их обслуживать
COPY --from=builder /app/build /usr/share/nginx/html


# Открываем порт 3000 для внешнего доступа
EXPOSE 3000

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
