CREATE DATABASE loki;

USE loki

CREATE TABLE patient (
    patient_id INT GENERATED ALWAYS AS IDENTITY,
    patient_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(14) NOT NULL,
    birth_date DATE NOT NULL,
    CPF NUMERIC(11) NOT NULL, 
    RG NUMERIC(7) NOT NULL,
    CEP VARCHAR(8), 
    email VARCHAR(320) NOT NULL,
    patient_address TEXT,
    occupation VARCHAR(60),
    comorbidities VARCHAR(280),
    patient_log JSON NOT NULL,
    PRIMARY KEY (patient_id)
)

CREATE TABLE lokiuser (
    user_id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(320) NOT NULL,
    user_password VARCHAR(50) NOT NULL,
    /* role can be: root, admin, ordinary*/
    user_role VARCHAR(8),
    user_log JSON NOT NULL
)

CREATE TABLE Exam (
    exam_id SERIAL PRIMARY KEY NOT null,
    exam_date DATE NOT NULL,
    title VARCHAR(20) NOT NULL,
    /* exam type can be: simple and complementary*/
    exam_type VARCHAR(13) NOT NULL,
    attachment VARCHAR(10),
    body TEXT NOT null,
    exam_log JSON NOT NULL
)

CREATE TABLE bioimpedance (
    bioimpedance_id INT GENERATED ALWAYS AS IDENTITY,
    body TEXT NOT NULL,
    register_date DATE NOT NULL,
    title VARCHAR(20) NOT NULL,
    bioimpedance_description VARCHAR(45) NOT NULL,
    bioimpedance_log JSON NOT NULL,
    patient_id_fk INT REFERENCES patient(patient_id),
    PRIMARY KEY (bioimpedance_id)
)

CREATE TABLE Anamnesis (
    anamnesis_id INT GENERATED ALWAYS AS IDENTITY,
    -- attachment VARCHAR(10),
    body TEXT NOT NULL,
    register_date DATE NOT NULL,
    title VARCHAR(20) NOT null,
    anamnesis_description VARCHAR(45) NOT NULL,
    patient_id_fk INT REFERENCES patient(patient_id),
    anamnesis_log JSON NOT NULL,
    PRIMARY KEY (anamnesis_id)
)