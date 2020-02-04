insert into "type" ("typeName")
values ('Men'),
       ('Women'),
       ('Cape'),
       ('Cloak'),
       ('Poncho'),
       ('Outdoor'),
       ('Vintage')
returning *;
