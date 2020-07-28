create table recipes (
    recipe_id serial primary key,
    recipe_img text,
    title varchar(50),
    ingredients varchar(500),
    instructions text
);

create table ll_users (
    user_id serial primary key,
    email varchar(50),
    username varchar(20),
    password varchar(250)
);

create table user_recipes (
    ur_id serial primary key,
    user_id integer references ll_users(user_id),
    recipe_img text,
    title varchar(50),
    ingredients varchar(500),
    instructions text
);