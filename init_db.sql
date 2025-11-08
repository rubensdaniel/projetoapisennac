-- ===========================================
-- Criação do Banco de Dados
-- ===========================================

CREATE DATABASE IF NOT EXISTS sistema_mercado
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

USE sistema_mercado;

-- ===========================================
-- Tabela: mercado
-- ===========================================

CREATE TABLE IF NOT EXISTS mercado (
    id CHAR(36) CHARACTER SET utf8mb4 PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(150),
    telefone VARCHAR(20),
    email VARCHAR(100),
    rua VARCHAR(100),
    numero VARCHAR(10),
    bairro VARCHAR(100),
    cep VARCHAR(10),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

-- ===========================================
-- Tabela: produto
-- ===========================================

CREATE TABLE IF NOT EXISTS produto (
    id CHAR(36) CHARACTER SET utf8mb4 PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    marca VARCHAR(100),
    peso VARCHAR(50),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

-- ===========================================
-- Tabela associativa: produto_mercado
-- ===========================================

CREATE TABLE IF NOT EXISTS produto_mercado (
    id CHAR(36) CHARACTER SET utf8mb4 PRIMARY KEY,
    id_produto CHAR(36) CHARACTER SET utf8mb4 NOT NULL,
    id_mercado CHAR(36) CHARACTER SET utf8mb4 NULL, -- Permite SET NULL
    preco DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_produto) REFERENCES produto(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_mercado) REFERENCES mercado(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

-- ===========================================
-- Tabela: usuario
-- ===========================================

CREATE TABLE IF NOT EXISTS usuario (
    id CHAR(36) CHARACTER SET utf8mb4 PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
