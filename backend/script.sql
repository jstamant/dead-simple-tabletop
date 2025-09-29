create table users (
	id serial primary key,
	email text unique not null,
	password_hash varchar(60) not null,
	last_login timestamp,
	created_at timestamp not null default now()
)

create table sheets (
	id serial primary key,
	user_id int not null references users(id),
	title text,
	created_at timestamp not null default now()
)

create table games (
	id serial primary key,
	name text,
	created_at timestamp not null default now()
)

create table games_users (
	game_id int references games(id),
	user_id int references users(id),
	primary key (game_id, user_id)
)

create table games_sheets (
	game_id int references games(id),
	sheet_id int references sheets(id),
	primary key (game_id, sheet_id)
)

create table sheet_element_types (
	id serial primary key,
	name text not null
)

create table sheet_elements (
	id serial primary key,
	sheet_id int not null references sheets(id),
	type_id int not null references sheet_element_types(id)
)

insert into sheet_element_types (name)
values
('text'),
('image')

delete from games_users where game_id = 14 and user_id = 11

delete from games where id = 14

select * from users

select * from sheets

select * from games

select * from games_users

drop table users

drop table sheets

drop table games_users
drop table games_sheets
drop table games

drop table sheet_fields;
drop table sheet_field_types;
