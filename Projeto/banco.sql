CREATE DATABASE clean_city;
CREATE TABLE caminhoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20),
    motorista VARCHAR(100),
    status_caminhao VARCHAR(50)
);

-- =========================
-- TABELA COLETAS
-- =========================
CREATE TABLE coletas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    localizacao VARCHAR(200),
    data_coleta DATE,
    status_coleta VARCHAR(50)
);

-- =========================
-- TABELA ALERTAS
-- =========================
CREATE TABLE alertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensagem VARCHAR(200),
    nivel INT,
    data_alerta DATETIME
);

-- =========================
-- INSERTS
-- =========================
INSERT INTO usuarios(nome,email,senha,tipo)
VALUES
('Administrador','admin@gmail.com','123','Administrador'),
('Motorista','motorista@gmail.com','123','Motorista');

INSERT INTO lixeiras(localizacao,nivel,capacidade,status_lixeira)
VALUES
('Praça Central',90,100,'Cheia'),
('Rua das Flores',40,100,'Normal');

INSERT INTO caminhoes(placa,motorista,status_caminhao)
VALUES
('ABC-1234','João','Ativo');

INSERT INTO coletas(localizacao,data_coleta,status_coleta)
VALUES
('Praça Central','2025-08-15','Pendente');

INSERT INTO alertas(mensagem,nivel,data_alerta)
VALUES
('Lixeira quase cheia',90,NOW());

-- =========================
-- VIEW
-- =========================
CREATE VIEW vw_lixeiras_cheias AS
SELECT * FROM lixeiras
WHERE nivel > 80;

-- =========================
-- STORED PROCEDURE
-- =========================
DELIMITER //

CREATE PROCEDURE listarLixeiras()
BEGIN
   SELECT * FROM lixeiras;
END //

DELIMITER ;

-- =========================
-- FUNCTION
-- =========================
DELIMITER //

CREATE FUNCTION totalLixeiras()
RETURNS INT
DETERMINISTIC
BEGIN
   DECLARE total INT;

   SELECT COUNT(*) INTO total FROM lixeiras;

   RETURN total;
END //

DELIMITER ;