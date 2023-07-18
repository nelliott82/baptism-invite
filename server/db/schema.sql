DROP DATABASE IF EXISTS invites;

CREATE DATABASE invites;

USE invites;

CREATE TABLE `admin`(
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uuid` TEXT NOT NULL,
  `session_ends` DATE NOT NULL,
  `session_id` TEXT,
  `email` TEXT NOT NULL,
  `hashword` TEXT
);

CREATE TABLE `invitees`(
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uuid` TEXT NOT NULL,
  `name` TEXT NOT NULL,
  `contact` TEXT NOT NULL,
  `guests` INT NOT NULL,
  `guestsResponse` INT,
  CHECK (`guestsResponse` <= `guests`),
  `attending` BOOLEAN,
  `language` BOOLEAN NOT NULL,
  `songs` TEXT
);


INSERT INTO admin (`uuid`, `session_ends`, `email`) VALUES ('817ff9b2-e71d-4085-8da7-cbb140fdb53b', '2023-09-28', 'nikkoelliott@gmail.com');