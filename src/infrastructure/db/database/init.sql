-- Подключение к базе данных
\c anotherknowledgebase;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS "user" (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

-- Таблица статей (без поля tags)
CREATE TABLE IF NOT EXISTS article (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    author_id UUID REFERENCES "user"(uuid) ON DELETE SET NULL
    );

-- Таблица тегов
CREATE TABLE IF NOT EXISTS tag (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
    );

-- Промежуточная таблица для связи статей и тегов
CREATE TABLE IF NOT EXISTS article_tag (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID NOT NULL REFERENCES article(uuid) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tag(uuid) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (article_id, tag_id)
    );


-- изначальный пользователь

INSERT INTO "user" (email,password) VALUES ('admin@admin.ru','$2b$10$Bmv.mAEUc7lxelMECeIJCOgoz5NO4otxtGaJE/bAO/hFarUBtdFwm') --admin