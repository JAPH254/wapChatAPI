CREATE DATABASE wapChat
use wapChat
CREATE TABLE Users (
  user_id INT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

INSERT INTO Users (user_id, username, email, password)
VALUES
  (1, 'user1', 'user1@example.com', 'password1'),
  (2, 'user2', 'user2@example.com', 'password2'),
  (3, 'user3', 'user3@example.com', 'password3'),
  (4, 'user4', 'user4@example.com', 'password4'),
  (5, 'user5', 'user5@example.com', 'password5');

select * from users
CREATE TABLE Posts (
  post_id INT PRIMARY KEY,
  title VARCHAR(255),
  content VARCHAR(MAX),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
INSERT INTO Posts (post_id, title, content, user_id)
VALUES
  (1, 'Post 1', 'Content of Post 1', 1),
  (2, 'Post 2', 'Content of Post 2', 1),
  (3, 'Post 3', 'Content of Post 3', 2),
  (4, 'Post 4', 'Content of Post 4', 3),
  (5, 'Post 5', 'Content of Post 5', 4);

select * from posts
CREATE TABLE Comments (
  comment_id INT PRIMARY KEY,
  content VARCHAR(MAX),
  user_id INT,
  post_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

INSERT INTO Comments (comment_id, content, user_id, post_id)
VALUES
  (1, 'Comment 1 on Post 1', 2, 1),
  (2, 'Comment 2 on Post 1', 3, 1),
  (3, 'Comment 1 on Post 2', 4, 2),
  (4, 'Comment 1 on Post 3', 1, 3),
  (5, 'Comment 2 on Post 3', 2, 3);

select * from comments
