require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

const intTest = (id, next) => {
  const test = /^[1-9]\d*$/;
  if (!test.exec(id)) {
    return next(new ClientError(`id ${id} is not a valid positive integer`, 400));
  } else return null;
};

// get specific user by id
app.get('/api/user/:userId', (req, res, next) => {
  intTest(req.params.userId, next);
  const sql = `
    select "userId", "firstName", "lastName", "email", "userType", "createdAt"
      from "user"
     where "userId" = $1;
  `;
  const value = [parseInt(req.params.userId)];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});
// login
// not verified
app.post('/api/auth/login', (req, res, next) => { });
// signup
// not verified
app.post('/api/auth/signup', (req, res, next) => { });
// get all products
app.get('/api/product/all', (req, res, next) => {
  const sql = `
    select *
      from "product";
  `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});
// get specific product by id
app.get('/api/product/id/:productId', (req, res, next) => {
  intTest(req.params.productId, next);
  const sql = `
    select *
      from "product"
     where "productId" = $1;
  `;
  const value = [parseInt(req.params.productId)];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});
// get specific prduct by name %20
app.get('/api/product/name/:productName', (req, res, next) => {
  const sql = `
    select *
      from "product"
     where "productName" = $1;
  `;
  const value = [req.params.productName];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});
// get products by group
app.get('/api/product/type/:typeId', (req, res, next) => {
  intTest(req.params.typeId, next);
  const sql = `
       select *
         from "product" p
    left join "productGroup" g on p."productId" = g."productId"
        where "typeId" = $1;
  `;
  const value = [parseInt(req.params.typeId)];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});
// get products by cart
app.get('/api/product/cart/:cartId', (req, res, next) => {
  intTest(req.params.cartId, next);
  const sql = `
       select *
         from "product" p
    left join "cartProduct" c on p."productId" = c."productId"
        where "cartId" = $1;
  `;
  const value = [parseInt(req.params.cartId)];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});
// get type by id
app.get('/api/type/id/:typeId', (req, res, next) => {
  intTest(req.params.typeId, next);
  const sql = `
    select *
      from "type"
     where "typeId" = $1;
  `;
  const value = [parseInt(req.params.typeId)];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});
// get type by name
app.get('/api/type/name/:typeName', (req, res, next) => {
  const sql = `
    select *
      from "type"
     where "typeName" = $1;
  `;
  const value = [req.params.typeName];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});
// get cart by id
app.get('/api/cart/id/:cartId', (req, res, next) => {
  intTest(req.params.cartId, next);
  const sql = `
    select *
      from "cart"
     where "cartId" = $1;
  `;
  const value = [parseInt(req.params.cartId)];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});
// get cart by user or session
app.get('/api/cart/user/:userId/:login', (req, res, next) => {
  intTest(req.params.userId, next);
  const userSql = `
    select *
      from "cart"
     where "userId" = $1;
  `;
  const sessionSql = `
    select *
      from "cart"
     where "sessionId" = $1;
  `;
  const value = [parseInt(req.params.userId)];
  if (req.params.login === 'login') {
    db.query(userSql, value)
      .then(result => res.status(200).json(result.rows[0]))
      .catch(err => next(err));
  } else if (req.params.login === 'nologin') {
    db.query(sessionSql, value)
      .then(result => res.status(200).json(result.rows[0]))
      .catch(err => next(err));
  } else next(new ClientError(`login status ${req.params.login} not valid`, 400));
});
// get cart by status
app.get('/api/cart/status/:status', (req, res, next) => {
  const nullSql = `
    select *
      from "cart"
     where "status" is null;
  `;
  const falseSql = `
    select *
      from "cart"
     where "status" = false;
  `;
  const trueSql = `
    select *
      from "cart"
     where "status" = true;
  `;
  if (req.params.status === 'true') {
    db.query(trueSql)
      .then(result => res.status(200).json(result.rows))
      .catch(err => next(err));
  } else if (req.params.status === 'false') {
    db.query(falseSql)
      .then(result => res.status(200).json(result.rows))
      .catch(err => next(err));
  } else if (req.params.status === 'null') {
    db.query(nullSql)
      .then(result => res.status(200).json(result.rows))
      .catch(err => next(err));
  } else next(new ClientError(`cart status ${req.params.status} is not valid`, 400));
});
// post cart from user or session
app.post('/api/cart/user', (req, res, next) => {
  if (!req.body.login) next(new ClientError('missing login status', 400));
  if (req.body.userId) intTest(req.body.userId, next);
  if (req.body.sessionId) intTest(req.body.sessionId, next);
  const userSql = `
    insert into "cart" ("userId", "login")
    values ($1, $2)
    returning *;
  `;
  const sessionSql = `
    insert into "cart" ("sessionId", "login")
    values ($1, $2)
    returning *;
  `;
  const userValue = [parseInt(req.body.userId), true];
  const sessionValue = [parseInt(req.body.sessionId), false];
  if (req.body.login === 'true') {
    if (!req.body.userId) next(new ClientError('missing user id', 400));
    db.query(userSql, userValue)
      .then(result => res.status(201).json(result.rows[0]))
      .catch(err => next(err));
  } else if (req.body.login === 'false') {
    if (!req.body.sessionId) next(new ClientError('missing session id', 400));
    db.query(sessionSql, sessionValue)
      .then(result => res.status(201).json(result.rows[0]))
      .catch(err => next(err));
  } else next(new ClientError(`login status ${req.body.login} is not valid`, 400));
});
// post product to cart
app.post('/api/cart/product', (req, res, next) => {
  if (!req.body.cartId) next(new ClientError('missing cart id', 400));
  else if (!req.body.productId) next(new ClientError('missing product id', 400));
  else if (!req.body.size) next(new ClientError('missing size', 400));
  if (req.body.cartId) intTest(req.body.cartId, next);
  if (req.body.productId) intTest(req.body.productId, next);
  const checkCartSql = `
    select *
      from "cart"
     where "cartId" = $1;
  `;
  const checkProductSql = `
    select *
      from "product"
     where "productId" = $1;
  `;
  const postSql = `
    insert into "cartProduct" ("cartId", "productId", "size")
    values ($1, $2, $3)
    returning *;
  `;
  const cartValue = [parseInt(req.body.cartId)];
  const productValue = [parseInt(req.body.productId)];
  const postValue = [parseInt(req.body.cartId), parseInt(req.body.productId), req.body.size];
  db.query(checkCartSql, cartValue)
    .then(cartResult => {
      if (!cartResult.rows[0]) next(new ClientError(`cart ${req.body.cartId} does not exist`, 404));
      else {
        db.query(checkProductSql, productValue)
          .then(productResult => {
            if (!productResult.rows[0]) next(new ClientError(`product ${req.body.productId} does not exist`, 404));
            else {
              db.query(postSql, postValue)
                .then(postResult => res.status(201).json(postResult.rows[0]))
                .catch(err => next(err));
            }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});
// put cart status from user
// not verified
app.put('/api/cart/status', (req, res, next) => { });
// put product size in cart
// not verified
app.put('/api/cart/size', (req, res, next) => { });
// put user type in cart
// not verified
app.put('/api/cart/userType', (req, res, next) => { });
// delete cart from user
app.delete('/api/cart/user', (req, res, next) => {
  if (!req.body.login) next(new ClientError('missing login status', 400));
  if (req.body.userId) intTest(req.body.userId, next);
  if (req.body.sessionId) intTest(req.body.sessionId, next);
  const getUserSql = `
    select *
      from "cart"
     where "userId" = $1;
  `;
  const getSessionSql = `
    select *
      from "cart"
     where "sessionId" = $1;
  `;
  const delCPUserSql = `
    delete from "cartProduct"
          using "cart"
          where "cartProduct"."cartId" = "cart"."cartId"
            and "cart"."userId" = $1;
  `;
  const delUserSql = `
    delete from "cart"
          where "userId" = $1;
  `;
  const delCPSessionSql = `
    delete from "cartProduct"
          using "cart"
          where "cartProduct"."cartId" = "cart"."cartId"
            and "cart"."sessionId" = $1;
  `;
  const delSessionSql = `
    delete from "cart"
          where "sessionId" = $1;
  `;
  const userValue = [parseInt(req.body.userId)];
  const sessionValue = [parseInt(req.body.sessionId)];
  if (req.body.login === 'true') {
    if (!req.body.userId) next(new ClientError('missing user id', 400));
    db.query(getUserSql, userValue)
      .then(userResult => {
        if (!userResult.rows[0]) next(new ClientError(`cart from user id ${req.body.userId} does not exist`, 404));
        else {
          db.query(delCPUserSql, userValue)
            .then(result => {
              db.query(delUserSql, userValue)
                .then(result => res.status(204).json([]))
                .catch(err => next(err));
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  } else if (req.body.login === 'false') {
    if (!req.body.sessionId) next(new ClientError('missing session id', 400));
    db.query(getSessionSql, sessionValue)
      .then(sessionResult => {
        if (!sessionResult.rows[0]) next(new ClientError(`cart from session id ${req.body.sessionId} does not exist`, 404));
        else {
          db.query(delCPSessionSql, sessionValue)
            .then(result => {
              db.query(delSessionSql, sessionValue)
                .then(result => res.status(204).json([]))
                .catch(err => next(err));
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  } else next(new ClientError(`login status ${req.body.login} is not valid`, 400));
});
// delete product from cart
app.delete('/api/cart/product', (req, res, next) => {
  if (!req.body.cartId) next(new ClientError('missing cart id', 400));
  else if (!req.body.productId) next(new ClientError('missing product id', 400));
  if (req.body.cartId) intTest(req.body.cartId, next);
  if (req.body.productId) intTest(req.body.productId, next);
  const checkCartSql = `
    select *
      from "cart"
     where "cartId" = $1;
  `;
  const checkProductSql = `
    select *
      from "product"
     where "productId" = $1;
  `;
  const deleteSql = `
    delete from "cartProduct"
          where "ctid" in (
            select "ctid"
              from "cartProduct"
             where "cartId" = $1 and "productId" = $2
             limit 1
          );
  `;
  const cartValue = [parseInt(req.body.cartId)];
  const productValue = [parseInt(req.body.productId)];
  const deleteValue = [parseInt(req.body.cartId), parseInt(req.body.productId)];
  db.query(checkCartSql, cartValue)
    .then(cartResult => {
      if (!cartResult.rows[0]) next(new ClientError(`cart ${req.body.cartId} does not exist`, 404));
      else {
        db.query(checkProductSql, productValue)
          .then(productResult => {
            if (!productResult.rows[0]) next(new ClientError(`product ${req.body.productId} does not exist`, 404));
            else {
              db.query(deleteSql, deleteValue)
                .then(delResult => res.status(204).json([]))
                .catch(err => next(err));
            }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
