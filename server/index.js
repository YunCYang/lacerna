require('dotenv/config');
const express = require('express');
const bcrypt = require('bcrypt');

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
// logout
app.get('/api/auth/logout', (req, res, next) => {
  req.session.cartId = null;
  res.status(204).json([]);
});
// login
app.post('/api/auth/login', (req, res, next) => {
  if (!req.body.email) next(new ClientError('missing email', 400));
  else if (!req.body.password) next(new ClientError('missing password', 400));
  const sql = `
    select "email", "password", "userId"
      from "user"
     where "email" = $1;
  `;
  const value = [req.body.email];
  db.query(sql, value)
    .then(result => {
      if (!result.rows[0]) next(new ClientError(`email ${req.body.email} does not exist`, 404));
      else {
        bcrypt.compare(req.body.password, result.rows[0].password, (err, pwdResult) => {
          if (err) next(err);
          if (pwdResult) res.status(200).json(result.rows[0].userId);
          else res.status(401).json([]);
        });
      }
    })
    .catch(err => next(err));
});
// signup
app.post('/api/auth/signup', (req, res, next) => {
  const saltRounds = 11;
  if (!req.body.firstName) next(new ClientError('missing first name', 400));
  else if (!req.body.lastName) next(new ClientError('missing last name', 400));
  else if (!req.body.email) next(new ClientError('missing email', 400));
  else if (!req.body.password) next(new ClientError('missing password', 400));
  else if (!req.body.userType) next(new ClientError('missing userType', 400));
  if (req.body.userType !== 'true' && req.body.userType !== 'false') {
    next(new ClientError(`user type ${req.body.userType} is not valid`, 400));
  }
  const emailTest = /^[\w.=-]+@[\w.-]+\.[\w]{2,4}$/;
  if (!emailTest.exec(req.body.email)) next(new ClientError(`email ${req.body.email} is not valid`, 400));
  const pwdTest = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-])(?=.{8,})/;
  if (!pwdTest.exec(req.body.password)) next(new ClientError(`password ${req.body.password} is not valid`, 400));
  const checkEmailSql = `
    select "email"
      from "user"
     where "email" = $1;
  `;
  const insertSql = `
    insert into "user" ("firstName", "lastName", "email", "password", "userType")
    values ($1, $2, $3, $4, $5)
    returning "firstName", "lastName", "email", "userType";
  `;
  const emailValue = [req.body.email];
  let userType = null;
  if (req.body.userType === 'true') userType = true;
  else userType = false;
  if (emailTest.exec(req.body.email) && pwdTest.exec(req.body.password)) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) next(err);
      const insertValue = [req.body.firstName, req.body.lastName, req.body.email, hash, userType];
      db.query(checkEmailSql, emailValue)
        .then(emailResult => {
          if (emailResult.rows[0]) next(new ClientError(`email ${req.body.email} already exists`, 400));
          else {
            db.query(insertSql, insertValue)
              .then(insertResult => res.status(201).json(insertResult.rows))
              .catch(err => next(err));
          }
        })
        .catch(err => next(err));
    });
  } else next(new ClientError('email or password is not valid', 400));
});
// get all products
app.get('/api/product/all', (req, res, next) => {
  const sql = `
    select *
      from "product"
     order by "createdAt" desc;
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
// get product by similar name
app.get('/api/product/name/search/:productName', (req, res, next) => {
  const sql = `
    select *
      from "product"
     where "productName" ~* $1;
  `;
  const value = [`.*${req.params.productName}.*`];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});
// get products by group
app.get('/api/product/type/:typeName', (req, res, next) => {
  const checkSql = `
    select *
      from "type"
     where "typeName" = $1;
  `;
  const getSql = `
       select *
         from "product" p
    left join "productGroup" g on p."productId" = g."productId"
        where "typeId" = (
          select "typeId"
            from "type"
           where "typeName" = $1
        );
  `;
  const value = [req.params.typeName];
  db.query(checkSql, value)
    .then(checkResult => {
      if (!checkResult.rows[0]) next(new ClientError(`type name ${req.params.typeName} does not exist`, 404));
      else {
        db.query(getSql, value)
          .then(result => res.status(200).json(result.rows))
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});
// get products by cart
app.get('/api/product/cart/:userId/:login', (req, res, next) => {
  intTest(req.params.userId, next);
  const getUserSql = `
    select *
      from "cart"
     where "userId" = $1 and "status" is null;
  `;
  const getCartUserSql = `
       select *
         from "product" p
    left join "cartProduct" c on p."productId" = c."productId"
        where "cartId" = (
          select "cartId"
            from "cart"
           where "userId" = $1 and "status" is null
        );
  `;
  const getCartSessionSql = `
       select *
         from "product" p
    left join "cartProduct" c on p."productId" = c."productId"
        where "cartId" = (
          select "cartId"
            from "cart"
           where "cartId" = $1 and "status" is null
        );
  `;
  const value = [parseInt(req.params.userId)];
  const cartSessionValue = [req.session.cartId];
  if (req.params.login === 'login') {
    db.query(getUserSql, value)
      .then(getResult => {
        if (!getResult.rows[0]) next(new ClientError(`cart from user id ${req.params.userId} does not exist`, 404));
        else {
          db.query(getCartUserSql, value)
            .then(cartResult => res.status(200).json(cartResult.rows))
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  } else if (req.params.login === 'nologin') {
    if (!req.session.cartId) res.status(200).json([]);
    else {
      db.query(getCartSessionSql, cartSessionValue)
        .then(cartResult => res.status(200).json(cartResult.rows))
        .catch(err => next(err));
    }
  } else next(new ClientError(`login status ${req.params.login} is not valid`, 400));
});
// get all types
app.get('/api/type/all', (req, res, next) => {
  const sql = `
    select *
      from "type";
  `;
  db.query(sql)
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
     where "cartId" = $1;
  `;
  const value = [parseInt(req.params.userId)];
  const sessionValue = [req.session.cartId];
  if (req.params.login === 'login') {
    db.query(userSql, value)
      .then(result => res.status(200).json(result.rows[0]))
      .catch(err => next(err));
  } else if (req.params.login === 'nologin') {
    if (!req.session.cartId) res.status(200).json([]);
    else {
      db.query(sessionSql, sessionValue)
        .then(result => res.status(200).json(result.rows[0]))
        .catch(err => next(err));
    }
  } else next(new ClientError(`login status ${req.params.login} is not valid`, 400));
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
  else if (!req.body.userId) next(new ClientError('missing user id', 400));
  if (req.body.userId) intTest(req.body.userId, next);
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
  // const sessionValue = [parseInt(req.body.userId), false];
  const sessionValue = [0, false];
  if (req.body.login === 'login') {
    db.query(userSql, userValue)
      .then(result => res.status(201).json(result.rows[0]))
      .catch(err => next(err));
  } else if (req.body.login === 'nologin') {
    db.query(sessionSql, sessionValue)
      .then(result => res.status(201).json(result.rows[0]))
      .catch(err => next(err));
  } else next(new ClientError(`login status ${req.body.login} is not valid`, 400));
});
// post product to cart
app.post('/api/cart/product', (req, res, next) => {
  if (!req.body.login) next(new ClientError('missing login status', 400));
  else if (!req.body.productId) next(new ClientError('missing product id', 400));
  else if (!req.body.size) next(new ClientError('missing size', 400));
  if (req.body.userId) intTest(req.body.userId, next);
  if (req.body.productId) intTest(req.body.productId, next);
  const getUserSql = `
    select *
      from "cart"
     where "userId" = $1;
  `;
  const checkProductSql = `
    select *
      from "product"
     where "productId" = $1;
  `;
  const postUserCartSql = `
    insert into "cart" ("userId", "login")
    values ($1, $2)
    returning *;
  `;
  const postUserProductSql = `
    insert into "cartProduct" ("cartId", "productId", "size")
    values ((
      select "cartId"
        from "cart"
       where "userId" = $1
    ), $2, $3)
    returning *;
  `;
  const checkSessionCartSql = `
      select "cartId"
        from "cart"
       where "cartId" = $1;
  `;
  const postSessionCartSql = `
    insert into "cart" ("sessionId", "login")
    values ($1, $2)
    returning "cartId";
  `;
  const postSessionProductSql = `
    insert into "cartProduct" ("cartId", "productId", "size")
    values ($1, $2, $3)
    returning *;
  `;
  const userValue = [parseInt(req.body.userId)];
  const productValue = [parseInt(req.body.productId)];
  const postValue = [parseInt(req.body.userId), parseInt(req.body.productId), req.body.size];
  const userCartValue = [parseInt(req.body.userId), true];
  const sessionValue = [0, false];
  const sessionCartValue = [req.session.cartId];
  db.query(checkProductSql, productValue)
    .then(productResult => {
      if (!productResult.rows[0]) next(new ClientError(`product ${req.body.productId} does not exist`, 404));
      else {
        if (req.body.login === 'login') {
          db.query(getUserSql, userValue)
            .then(getResult => {
              if (!getResult.rows[0]) {
                db.query(postUserCartSql, userCartValue)
                  .then(postUserCartResult => {
                    db.query(postUserProductSql, postValue)
                      .then(postResult => res.status(201).json(postResult.rows[0]))
                      .catch(err => next(err));
                  })
                  .catch(err => next(err));
              } else {
                db.query(postUserProductSql, postValue)
                  .then(postResult => res.status(201).json(postResult.rows[0]))
                  .catch(err => next(err));
              }
            })
            .catch(err => next(err));
        } else if (req.body.login === 'nologin') {
          if (!req.session.cartId) {
            db.query(postSessionCartSql, sessionValue)
              .then(sessionCartResult => {
                req.session.cartId = sessionCartResult.rows[0].cartId;
                const sessionProductValue = [req.session.cartId, parseInt(req.body.productId), req.body.size];
                db.query(postSessionProductSql, sessionProductValue)
                  .then(postResult => res.status(201).json(postResult.rows[0]))
                  .catch(err => next(err));
              })
              .catch(err => next(err));
          } else {
            db.query(checkSessionCartSql, sessionCartValue)
              .then(checkResult => {
                if (!checkResult.rows[0]) {
                  db.query(postSessionCartSql, sessionValue)
                    .then(sessionCartResult => {
                      req.session.cartId = sessionCartResult.rows[0].cartId;
                      const sessionProductValue = [req.session.cartId, parseInt(req.body.productId), req.body.size];
                      db.query(postSessionProductSql, sessionProductValue)
                        .then(postResult => res.status(201).json(postResult.rows[0]))
                        .catch(err => next(err));
                    })
                    .catch(err => next(err));
                } else {
                  const sessionProductValue = [req.session.cartId, parseInt(req.body.productId), req.body.size];
                  db.query(postSessionProductSql, sessionProductValue)
                    .then(postResult => res.status(201).json(postResult.rows[0]))
                    .catch(err => next(err));
                }
              })
              .catch(err => next(err));
          }
        } else next(new ClientError(`login status ${req.body.login} is not valid`, 400));
      }
    })
    .catch(err => next(err));
});
// put cart status from user
app.put('/api/cart/status', (req, res, next) => {
  if (!req.body.status) next(new ClientError('missing cart status', 400));
  else if (!req.body.login) next(new ClientError('missing login status', 400));
  else if (!req.body.userId) next(new ClientError('missing user id', 400));
  if (req.body.status !== 'true' && req.body.status !== 'false') {
    next(new ClientError(`cart status ${req.body.status} is not valid`, 400));
  }
  if (req.body.userId) intTest(req.body.userId, next);
  let cartStatus = null;
  if (req.body.status === 'true') cartStatus = true;
  else if (req.body.status === 'false') cartStatus = false;
  const getUserSql = `
    select *
      from "cart"
     where "userId" = $1;
  `;
  // const getSessionSql = `
  //   select *
  //     from "cart"
  //    where "sessionId" = $1;
  // `;
  const putCartUserSql = `
    update "cart"
       set "status" = $1
     where "userId" = $2
     returning *;
  `;
  // const putCartSessionSql = `
  //   update "cart"
  //      set "status" = $1
  //    where "sessionId" = $2
  //    returning *;
  // `;
  const putCartSessionSql = `
    update "cart"
       set "status" = $1
     where "cartId" = $2
     returning *;
  `;
  const userValue = [parseInt(req.body.userId)];
  const putCartValue = [cartStatus, parseInt(req.body.userId)];
  const putCartSessionValue = [cartStatus, req.session.cartId];
  if (req.body.login === 'login') {
    db.query(getUserSql, userValue)
      .then(getResult => {
        if (!getResult.rows[0]) next(new ClientError(`cart from user id ${req.body.userId} does not exist`, 404));
        else {
          db.query(putCartUserSql, putCartValue)
            .then(putResult => res.status(200).json(putResult.rows[0]))
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  } else if (req.body.login === 'nologin') {
    // db.query(getSessionSql, userValue)
    //   .then(getResult => {
    //     if (!getResult.rows[0]) next(new ClientError(`cart from session id ${req.body.userId} does not exist`, 404));
    //     else {
    //       db.query(putCartSessionSql, putCartValue)
    //         .then(putResult => res.status(200).json(putResult.rows[0]))
    //         .catch(err => next(err));
    //     }
    //   })
    //   .catch(err => next(err));
    if (!req.session.cartId) next(new ClientError('cart does not exist', 404));
    else {
      db.query(putCartSessionSql, putCartSessionValue)
        .then(putResult => res.status(200).json(putResult.rows[0]))
        .catch(err => next(err));
    }
  } else next(new ClientError(`login status ${req.body.login} is not valid`, 400));
});
// put product size in cart
app.put('/api/cart/size', (req, res, next) => {
  if (!req.body.size) next(new ClientError('missing product size', 400));
  else if (!req.body.login) next(new ClientError('missing login status', 400));
  else if (!req.body.productId) next(new ClientError('missing product id', 400));
  else if (!req.body.userId) next(new ClientError('missing user id', 400));
  if (req.body.userId) intTest(req.body.userId, next);
  if (req.body.productId) intTest(req.body.productId, next);
  const getUserSql = `
    select *
      from "cart"
     where "userId" = $1;
  `;
  // const getSessionSql = `
  //   select *
  //     from "cart"
  //    where "sessionId" = $1;
  // `;
  const getProductSql = `
    select *
      from "cartProduct"
     where "productId" = $1;
  `;
  const putCartUserSql = `
    update "cartProduct"
       set "size" = $1
     where "ctid" in (
        select "ctid"
          from "cartProduct"
         where "cartId" = (
          select "cartId"
            from "cart"
           where "userId" = $2
         ) and "productId" = $3
         limit 1
        )
     returning *;
  `;
  // const putCartSessionSql = `
  //   update "cartProduct"
  //      set "size" = $1
  //    where "cartId" in (
  //      select "cartId"
  //        from "cart"
  //       where "sessionId" = $2 and "productId" = $3
  //    )
  //    returning *;
  // `;
  const putCartSessionSql = `
    update "cartProduct"
       set "size" = $1
     where "ctid" in (
        select "ctid"
          from "cartProduct"
         where "cartId" = $2 and "productId" = $3
         limit 1
        )
     returning *;
  `;
  const userValue = [parseInt(req.body.userId)];
  const productValue = [parseInt(req.body.productId)];
  const putCartValue = [req.body.size, parseInt(req.body.userId), parseInt(req.body.productId)];
  const putCartSessionValue = [req.body.size, req.session.cartId, parseInt(req.body.productId)];
  db.query(getProductSql, productValue)
    .then(productResult => {
      if (!productResult.rows[0]) next(new ClientError(`product id ${req.body.productId} does not exist in the cart`, 404));
      else {
        if (req.body.login === 'login') {
          db.query(getUserSql, userValue)
            .then(getResult => {
              if (!getResult.rows[0]) next(new ClientError(`cart from user id ${req.body.userId} does not exist`, 404));
              else {
                db.query(putCartUserSql, putCartValue)
                  .then(putResult => res.status(200).json(putResult.rows[0]))
                  .catch(err => next(err));
              }
            })
            .catch(err => next(err));
        } else if (req.body.login === 'nologin') {
          // db.query(getSessionSql, userValue)
          //   .then(getResult => {
          //     if (!getResult.rows[0]) next(new ClientError(`cart from session id ${req.body.userId} does not exist`, 404));
          //     else {
          //       db.query(putCartSessionSql, putCartValue)
          //         .then(putResult => res.status(200).json(putResult.rows[0]))
          //         .catch(err => next(err));
          //     }
          //   })
          //   .catch(err => next(err));
          if (!req.session.cartId) next(new ClientError('cart does not exist', 404));
          else {
            db.query(putCartSessionSql, putCartSessionValue)
              .then(putResult => res.status(200).json(putResult.rows[0]))
              .catch(err => next(err));
          }
        } else next(new ClientError(`login status ${req.body.login} is not valid`, 400));
      }
    })
    .catch(err => next(err));
});
// put user type in cart
app.put('/api/cart/userType', (req, res, next) => {
  if (!req.body.userId) next(new ClientError('missing user id', 400));
  if (req.body.userId) intTest(req.body.userId, next);
  const getUserSql = `
    select *
      from "cart"
     where "userId" = $1;
  `;
  const putCartUserSql = `
    update "cart"
       set "userId" = $1, "sessionId" = null, "login" = true
     where "cartId" = $2
    returning *;
  `;
  const mergeSql = `
    update "cartProduct"
       set "cartId" = (
         select "cartId"
           from "cart"
          where "userId" = $1
       )
     where "cartId" = $2
    returning *;
  `;
  const delCartSql = `
    delete from "cart"
          where "cartId" = $1;
  `;
  const sessionValue = [req.session.cartId];
  const userValue = [parseInt(req.body.userId)];
  const putUserValue = [parseInt(req.body.userId), req.session.cartId];
  if (!req.session.cartId) next(new ClientError('cart does not exist', 404));
  else {
    db.query(getUserSql, userValue)
      .then(userResult => {
        if (!userResult.rows[0]) {
          db.query(putCartUserSql, putUserValue)
            .then(putResult => res.status(204).json([]))
            .catch(err => next(err));
        } else {
          db.query(mergeSql, putUserValue)
            .then(mergeResult => {
              db.query(delCartSql, sessionValue)
                .then(delResult => res.status(204).json([]))
                .catch(err => next(err));
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  }
});
// delete cart from user
app.delete('/api/cart/user', (req, res, next) => {
  if (!req.body.login) next(new ClientError('missing login status', 400));
  else if (!req.body.userId) next(new ClientError('missing user id', 400));
  if (req.body.userId) intTest(req.body.userId, next);
  const getUserSql = `
    select *
      from "cart"
     where "userId" = $1;
  `;
  // const getSessionSql = `
  //   select *
  //     from "cart"
  //    where "sessionId" = $1;
  // `;
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
  // const delCPSessionSql = `
  //   delete from "cartProduct"
  //         using "cart"
  //         where "cartProduct"."cartId" = "cart"."cartId"
  //           and "cart"."sessionId" = $1;
  // `;
  const delCPSessionSql = `
    delete from "cartProduct"
          where "cartId" = $1;
  `;
  // const delSessionSql = `
  //   delete from "cart"
  //         where "sessionId" = $1;
  // `;
  const delSessionSql = `
    delete from "cart"
          where "cartId" = $1;
  `;
  const userValue = [parseInt(req.body.userId)];
  const sessionValue = [req.session.cartId];
  if (req.body.login === 'login') {
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
  } else if (req.body.login === 'nologin') {
    // db.query(getSessionSql, userValue)
    //   .then(sessionResult => {
    //     if (!sessionResult.rows[0]) next(new ClientError(`cart from session id ${req.body.userId} does not exist`, 404));
    //     else {
    //       db.query(delCPSessionSql, userValue)
    //         .then(result => {
    //           db.query(delSessionSql, userValue)
    //             .then(result => res.status(204).json([]))
    //             .catch(err => next(err));
    //         })
    //         .catch(err => next(err));
    //     }
    //   })
    //   .catch(err => next(err));
    if (!req.session.cartId) next(new ClientError('cart does not exist', 404));
    else {
      db.query(delCPSessionSql, sessionValue)
        .then(result => {
          db.query(delSessionSql, sessionValue)
            .then(result => res.status(204).json([]))
            .catch(err => next(err));
        })
        .catch(err => next(err));
    }
  } else next(new ClientError(`login status ${req.body.login} is not valid`, 400));
});
// delete product from cart
app.delete('/api/cart/product', (req, res, next) => {
  if (!req.body.productId) next(new ClientError('missing product id', 400));
  else if (!req.body.login) next(new ClientError('missing login status', 400));
  else if (!req.body.size) next(new ClientError('missing product size', 400));
  if (req.body.userId) intTest(req.body.userId, next);
  if (req.body.productId) intTest(req.body.productId, next);
  const getUserSql = `
    select *
      from "cart"
     where "userId" = $1;
  `;
  const checkProductSql = `
    select *
      from "product"
     where "productId" = $1;
  `;
  const delProductUserSql = `
    delete from "cartProduct"
          where "ctid" in (
            select "ctid"
              from "cartProduct"
             where "cartId" = (
               select "cartId"
                 from "cart"
                where "userId" = $1
             ) and "productId" = $2 and "size" = $3
             limit 1
          );
  `;
  const delProductSessionSql = `
    delete from "cartProduct"
          where "ctid" in (
            select "ctid"
              from "cartProduct"
             where "cartId" = $1 and "productId" = $2 and "size" = $3
             limit 1
          );
  `;
  const userValue = [parseInt(req.body.userId)];
  const productValue = [parseInt(req.body.productId)];
  const delValue = [parseInt(req.body.userId), parseInt(req.body.productId), req.body.size];
  const delSessionValue = [req.session.cartId, parseInt(req.body.productId), req.body.size];
  db.query(checkProductSql, productValue)
    .then(productResult => {
      if (!productResult.rows[0]) next(new ClientError(`product ${req.body.productId} does not exist`, 404));
      else {
        if (req.body.login === 'login') {
          db.query(getUserSql, userValue)
            .then(getResult => {
              if (!getResult.rows[0]) next(new ClientError(`cart from user id ${req.body.userId} does not exist`, 404));
              else {
                db.query(delProductUserSql, delValue)
                  .then(delResult => res.status(204).json([]))
                  .catch(err => next(err));
              }
            })
            .catch(err => next(err));
        } else if (req.body.login === 'nologin') {
          if (!req.session.cartId) next(new ClientError('cart does not exist', 404));
          else {
            db.query(delProductSessionSql, delSessionValue)
              .then(delResult => res.status(204).json([]))
              .catch(err => next(err));
          }
        } else next(new ClientError(`login status ${req.body.login} is not valid`, 400));
      }
    })
    .catch(err => next(err));
});
// delete single product type from cart
app.delete('/api/cart/productType', (req, res, next) => {
  if (!req.body.productId) next(new ClientError('missing product id', 400));
  else if (!req.body.login) next(new ClientError('missing login status', 400));
  else if (!req.body.size) next(new ClientError('missing product size', 400));
  if (req.body.userId) intTest(req.body.userId, next);
  if (req.body.productId) intTest(req.body.productId, next);
  const getUserSql = `
    select *
      from "cart"
     where "userId" = $1;
  `;
  const checkProductSql = `
    select *
      from "product"
     where "productId" = $1;
  `;
  const delProductUserSql = `
    delete from "cartProduct"
          where "productId" = $1 and "cartId" = (
            select "cartId"
              from "cart"
             where "userId" = $2
          ) and "size" = $3;
  `;
  const delProductSessionSql = `
    delete from "cartProduct"
          where "productId" = $1 and "cartId" = $2 and "size" = $3;
  `;
  const userValue = [parseInt(req.body.userId)];
  const productValue = [parseInt(req.body.productId)];
  const delUserValue = [parseInt(req.body.productId), parseInt(req.body.userId), req.body.size];
  const delSessionValue = [parseInt(req.body.productId), req.session.cartId, req.body.size];
  db.query(checkProductSql, productValue)
    .then(productResult => {
      if (!productResult.rows[0]) next(new ClientError(`product ${req.body.productId} does not exist`, 404));
      else {
        if (req.body.login === 'login') {
          db.query(getUserSql, userValue)
            .then(getResult => {
              if (!getResult.rows[0]) next(new ClientError(`cart from user id ${req.body.userId} does not exist`, 404));
              else {
                db.query(delProductUserSql, delUserValue)
                  .then(delResult => res.status(204).json([]))
                  .catch(err => next(err));
              }
            })
            .catch(err => next(err));
        } else if (req.body.login === 'nologin') {
          if (!req.session.cartId) next(new ClientError('cart does not exist', 404));
          else {
            db.query(delProductSessionSql, delSessionValue)
              .then(delResult => res.status(204).json([]))
              .catch(err => next(err));
          }
        }
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
