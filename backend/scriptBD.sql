CREATE DATABASE [IF NOT EXISTS] loopit;
USE loopit;
create table users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) UNIQUE,
    username VARCHAR(20) UNIQUE,
    full_name VARCHAR(50) NOT NULL,
    password VARCHAR(256) NOT NULL,
    create_at DATETIME,
    update_at DATETIME
);
create table loops(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    description VARCHAR(256) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    create_at DATETIME,
    update_at DATETIME
);
create table favourites(
    user_id INT NOT NULL,
    loop_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (loop_id) REFERENCES loops(id),
    create_at DATETIME,
    update_at DATETIME
);
create table friends(
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id),
    create_at DATETIME,
    update_at DATETIME
);
create table languages(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    create_at DATETIME,
    update_at DATETIME
);