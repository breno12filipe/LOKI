CREATE DATABASE loki;

USE loki

CREATE TABLE Patient (
    patient_id SERIAL PRIMARY KEY NOT NULL,
    patient_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(14) NOT NULL,
    birth_date DATETIME NOT NULL,
    CPF NUMERIC(11) NOT NULL, 
    RG NUMERIC(7) NOT NULL,
    CEP VARCHAR(8), 
    email VARCHAR(320) NOT NULL,
    patient_address JSON,
    occupation VARCHAR(60),
    comorbidities VARCHAR(280),
    log JSON NOT NULL
)

CREATE TABLE Anamnesis (
    anamnesis_id SERIAL PRIMARY KEY NOT NULL,
    attachment VARCHAR(10),
    body TEXT NOT NULL,
    register_date DATETIME NOT NULL,
    title VARCHAR(20) NOT NULL
)

CREATE TABLE User (
    user_id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(320) NOT NULL,
    password VARCHAR(50) NOT NULL,
    /* role can be: root, admin, ordinary*/
    user_role VARCHAR(8)
    log JSON NOT NULL
)

CREATE TABLE Exam (
    exam_id SERIAL PRIMARY KEY NOT NULL
    exam_date DATETIME NOT NULL,
    title VARCHAR(20) NOT NULL,
    /* exam type can be: simple and complementary*/
    exam_type VARCHAR(13) NOT NULL,
    attachment VARCHAR(10),
    body TEXT NOT NULL
)

CREATE TABLE bioimpedance (
    bioimpedance_id SERIAL PRIMARY KEY NOT NULL,
    attachment VARCHAR(10),
    body TEXT NOT NULL,
    register_date DATETIME NOT NULL,
    title VARCHAR(20) NOT NULL
)