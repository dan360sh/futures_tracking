# Используем официальный образ Node.js
FROM node:14

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в рабочую директорию в контейнере
COPY . .

# Транспилируем TypeScript в JavaScript
RUN npm run build

# Определяем команду запуска приложения
CMD [ "node", "dist/index.js" ]