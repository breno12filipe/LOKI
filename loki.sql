CREATE DATABASE loki;

USE loki

CREATE TABLE patient (
    patient_id SERIAL PRIMARY KEY NOT NULL,
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
    patient_log JSON NOT NULL
)

CREATE TABLE Anamnesis (
    anamnesis_id SERIAL PRIMARY KEY NOT NULL,
    attachment VARCHAR(10),
    body TEXT NOT NULL,
    register_date DATE NOT NULL,
    title VARCHAR(20) NOT null,
    anamnesis_log JSON NOT NULL
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
    bioimpedance_id SERIAL PRIMARY KEY NOT NULL,
    attachment VARCHAR(10),
    body TEXT NOT NULL,
    register_date DATE NOT NULL,
    title VARCHAR(20) NOT null,
    bioimpedance_log JSON not NULL
)