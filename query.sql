-- Active: 1693398029625@@localhost@5432@db_ramfaq
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (nama, email, password) VALUES
('John Doe', 'johndoe@example.com', 'password123'),
('Jane Doe', 'janedoe@example.com', 'password456'),
('Alice Smith', 'alice.smith@example.com', 'password789');


SELECT * 