use ebook;
show tables;
-- Create table for storing categoryes-- 
create table category(id int primary key auto_increment,
category_name varchar(100));

-- Create table for storing the books-- 
create table products(id int primary key auto_increment,
isbn10 long,
isbn13 long,
name varchar(100),
category varchar(100),
description text,
price double,
quantity int,
pages int,
author varchar(100),
publisher varchar(100),
publish_date datetime default current_timestamp,
langauge varchar(100),
image varchar(100));
select * from product;
create table products1(id int primary key auto_increment,
isbn10 long,
isbn13 long,
name varchar(100),
category varchar(100),
description text,
price double,
quantity int,
pages int,
author varchar(100),
publisher varchar(100),
publish_date datetime default current_timestamp,
langauge varchar(100),
image varchar(100));

select * from products1;
select * from category;
-- Create table for Register the users-- 
create table signup(id int primary key auto_increment,
firstname varchar(100) not null,
lastname varchar(100) not null,
email varchar(100) unique,
password varchar(100));


drop table category;
drop table signup;
drop table products;





select * from signup;


update products set isbn10 = 1837637180 , isbn13 = 9781837637188 where id = 5;

create table cart(cid int primary key auto_increment,
uid int,
name varchar(100),
price int,
quantity int,
image varchar(100),
total int);

alter table cart add constraint foreign key(uid) references signup(id) on delete cascade;
drop table cart;
select * from cart;
create table orders(oid int primary key auto_increment,
uid int,
firstname varchar(50),
lastname varchar(50),
email varchar(100),
phono varchar(100),
country varchar(50),
state varchar(50),
address varchar(100),
blockno varchar(30),
amount int,
date datetime default current_timestamp,
items json);
alter table orders add constraint foreign key (uid) references signup(id) on delete cascade;
select * from products;
drop table orders;
select * from orders;
delete from orders where oid = 12;
select * from cart;
drop table cart;