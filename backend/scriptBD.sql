CREATE DATABASE [IF NOT EXISTS] loopit;
USE loopit;
create table users(
    id INT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    username VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(50) NOT NULL,
    password VARCHAR(256) NOT NULL
);
create table loops(
    id INT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    description VARCHAR(256) NOT NULL,
    content VARCHAR(2400) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
create table favourites(
    user_id INT NOT NULL,
    loop_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (loop_id) REFERENCES loops(id)
);
create table friends(
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id)
);
create table lenguages(
    id INT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
);