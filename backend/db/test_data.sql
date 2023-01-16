-- clear all data
delete from comments;
delete from votes;
delete from posts;
delete from users;

-- reset sequence
alter sequence comments_id_seq restart with 1;
alter sequence posts_id_seq restart with 1;
alter sequence users_id_seq restart with 1;

-- add test data
insert into users (username, password) values ('user', '$2b$10$pOgsQSvNN4VStEhIXf8XDe7o2vae/4nGW9IXveGmhS0oKrJ9PyJoq');
insert into users (username, password) values ('user2', '$2b$10$7CKE1sNgqgKpQPgYCieo0O3twuHKH9k3bo9qEtfn8J0gzdXUDiNhm');
insert into posts (title, author_id, post_type, content) values ('Test post', 1, 'text', 'Test post');
insert into posts (title, author_id, post_type, content) values ('Test post 2', 1, 'text', 'Test post 2');
insert into comments (post_id, author_id, content) values (1, 1, 'Test comment');
insert into votes (user_id, post_id, vote) values (1, 1, 1);
