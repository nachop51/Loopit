CREATE DATABASE [IF NOT EXISTS] loopit;
USE loopit;
create table users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) UNIQUE,
    username VARCHAR(20) UNIQUE,
    full_name VARCHAR(50) NOT NULL,
    password VARCHAR(256) NOT NULL,
    createdAt DATETIME,
    updatedAt DATETIME
);
create table loops(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    description VARCHAR(256) NOT NULL,
    filename VARCHAR(50),
    languages VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    createdAt DATETIME,
    updatedAt DATETIME
);
create table favourites(
    user_id INT NOT NULL,
    loop_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (loop_id) REFERENCES loops(id),
    createdAt DATETIME,
    updatedAt DATETIME
);
create table followers(
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id),
    createdAt DATETIME,
    updatedAt DATETIME
);
create table languages(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    createdAt DATETIME,
    updatedAt DATETIME
);