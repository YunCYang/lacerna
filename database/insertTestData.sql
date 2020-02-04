insert into "user" ("firstName", "lastName", "email", "password", "userType")
values ('Brandon', 'Bryndon', 'brandon@gmail.com', 'testPassword123', false)
returning *;

insert into "cart" ("userId", "status", "login")
values (1, false, true)
returning *;

insert into "cart" ("sessionId", "status", "login")
values (1, false, false)
returning *;

insert into "cartProduct" ("cartId", "productId", "size")
values (1, 1, 's')
returning *;
