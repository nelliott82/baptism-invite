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

CREATE TABLE `baptismInvitees`(
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uuid` TEXT NOT NULL,
  `name` TEXT NOT NULL,
  `contact` TEXT NOT NULL,
  `guests` INT NOT NULL,
  `guestsResponse` INT,
  CHECK (`guestsResponse` <= `guests`),
  `attending` BOOLEAN,
  `language` BOOLEAN NOT NULL,
);
