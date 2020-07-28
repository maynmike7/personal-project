insert into ll_users (
    email,
    username,
    password
) values (
    ${email},
    ${username},
    ${password}
)
returning user_id, username, email;