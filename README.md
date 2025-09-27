# CarWash Frontend

Фронтенд для MVP системы CarWash: просмотр услуг и оформление заказов клиентом

### Стек
- React + TypeScript
- RTK Query
- React Hook Form + Zod
- tailwind CSS
- Vite
- Docker + Nginx

### Установка и запуск
```bash
git clone git@github.com:lanovich/carwash-project-frontend.git
npm install
npm run dev
```

Docker:
```bash
docker build -t carwash-frontend .
docker run -p 5173:5173 carwash-frontend
```

### Структура проекта (FSD подобная)
```
/src
  /app       — точка входа приложения, маршруты, глобальные провайдеры (Redux, Theme, Router)
  /pages     — страницы приложения, формируют UI из сущностей и фич
  /entities  — бизнес-сущности: Car, Order, Service, Client; описывают состояние и логику
  /features  — функциональные блоки, которые реализуют конкретные кейсы, используют сущности
  /widgets   — переиспользуемые UI-компоненты, объединяющие несколько элементов (например, карточка услуги)
  /shared    — утилиты, стили, компоненты общего назначения, типы, хуки
```
