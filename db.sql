CREATE DATABASE image_library;

USE image_library;

CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    license_type VARCHAR(50) NOT NULL
);