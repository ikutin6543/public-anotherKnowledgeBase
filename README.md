# 📘 AnotherKnowledgeBase

Проект реализован с использованием **DDD (Domain-Driven Design)**:

* **domain/** — сущности и интерфейсы
* **application/** — бизнес-логика (use cases)
* **infrastructure/** — контроллеры, роуты, persistence, работа с БД, безопасность

---

## 🚀 Запуск проекта

### Запуск

```bash
docker compose -f ./docker_compose.yml up --build
```

### Остановка

```bash
docker compose -f ./docker_compose.yml down -v
```

После запуска API доступно на `http://localhost:3000`.

---

## 🔌 API

### 👤 Users

#### **POST /users/register**

Регистрация нового пользователя

**Body:**

```json
{ "email": "test@example.com", "password": "123456" }
```

#### **POST /users/login**

Аутентификация пользователя

**Body:**

```json
{ "email": "test@example.com", "password": "123456" }
```

**Response:**

```json
{ "token": "jwt" }
```

#### **DELETE /users/\:id**

Удаление пользователя (требует авторизации)

---

### 📝 Articles

> Авторизация выполняется через заголовок
> `Authorization: Bearer <jwt>`

#### **POST /articles**

Создание статьи

**Body:**

```json
{
  "title": "My Article",
  "content": "Hello World",
  "isPublic": true,
  "tags": []
}
```

#### **GET /articles?filters\[tags]=tagId1,tagId2**

Получение списка статей (с фильтрацией по тегам)

#### **GET /articles/\:id**

Получение статьи по ID

#### **PATCH /articles/\:id**

Обновление статьи

#### **DELETE /articles/\:id**

Удаление статьи

---

## 🔒 Безопасность

* Авторизованные пользователи могут:

    * получать все статьи (включая приватные),
    * удалять статьи,
    * изменять статьи,
    * удалять пользователей.

* Неавторизованные пользователи могут:

    * получать **только статьи с `isPublic: true`**.