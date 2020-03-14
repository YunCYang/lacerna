import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH, STOCK, POP, SELECT_PRODUCT } from '../common/constants/action-types';

const CartItem = props => {
  const productArray = useSelector(state => state.product.product);
  const userId = useSelector(state => state.auth.auth);
  const [quantity, setQuantity] = React.useState(1);
  const [disabled, setDisabled] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      setQuantity(props.item.quantity);
    }, []
  );

  React.useEffect(
    () => {
      setQuantity(props.item.quantity);
    }, [quantity === props.item.quantity]
  );

  return (
    <div className='cart-item'>
      <div className='image'>
        <img src={`/images/${props.item.detail.image1}.jpg`} alt={props.item.detail.productName}
          onClick={
            () => {
              props.history.push('/product');
              dispatch({
                type: SEARCH,
                payload: {
                  type: 'product',
                  value: props.item.detail.productName
                }
              });
            }
          } />
      </div>
      <div className='info'>
        <div className='name-size'>
          <span onClick={
            () => {
              props.history.push('/product');
              dispatch({
                type: SEARCH,
                payload: {
                  type: 'product',
                  value: props.item.detail.productName
                }
              });
            }
          }>{`${props.item.detail.productName} - ${props.item.detail.size}`}</span>
        </div>
        <div className='price-qt'>
          <div className='price'>
            <span>{`$ ${(parseInt(props.item.detail.price) / 100).toFixed(2)}`}</span>
          </div>
          <div className='qt'>
            <div className='qt-input'>
              <input type="text" value={quantity} onChange={
                e => {
                  const test = /^[1-9]\d*$/;
                  if (test.exec(e.target.value)) {
                    setQuantity(e.target.value);
                  }
                }
              } onBlur={
                () => {
                  let init = {};
                  if (quantity > props.item.quantity) {
                    if (userId) {
                      init = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          login: 'login',
                          productId: props.item.detail.productId,
                          size: props.item.detail.size,
                          userId: userId
                        })
                      };
                    } else {
                      init = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          login: 'nologin',
                          productId: props.item.detail.productId,
                          size: props.item.detail.size
                        })
                      };
                    }
                    const request = [];
                    const paCopy = [...productArray];
                    for (let i = 0; i < quantity - props.item.quantity; i++) {
                      request.push('/api/cart/product');
                      paCopy.push({ ...props.item.detail });
                    }
                    Promise.all(
                      request.map(item => {
                        return fetch(item, init)
                          .then(res => res.json())
                          .then(res => false);
                      })
                    ).then(
                      () => dispatch({ type: STOCK, payload: paCopy })
                    );
                  } else if (quantity < props.item.quantity) {
                    if (userId) {
                      init = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          login: 'login',
                          productId: props.item.detail.productId,
                          size: props.item.detail.size,
                          userId: userId
                        })
                      };
                    } else {
                      init = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          login: 'nologin',
                          productId: props.item.detail.productId,
                          size: props.item.detail.size
                        })
                      };
                    }
                    const request = [];
                    const paCopy = [...productArray];
                    for (let i = 0; i < props.item.quantity - quantity; i++) {
                      request.push('/api/cart/product');
                      for (let i = 0; i < paCopy.length; i++) {
                        if (paCopy[i].productId === props.item.detail.productId &&
                          paCopy[i].size === props.item.detail.size) {
                          paCopy.splice(i, 1);
                          break;
                        }
                      }
                    }
                    Promise.all(
                      request.map(item => {
                        return fetch(item, init)
                          .then(res => false);
                      })
                    ).then(
                      () => dispatch({ type: STOCK, payload: paCopy })
                    );
                  }
                }
              }/>
            </div>
            <div className='qt-button'>
              <button type='button' onClick={
                () => {
                  setDisabled(true);
                  let init = {};
                  if (userId) {
                    init = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        userId: userId,
                        login: 'login',
                        productId: props.item.detail.productId,
                        size: props.item.detail.size
                      })
                    };
                  } else {
                    init = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        login: 'nologin',
                        productId: props.item.detail.productId,
                        size: props.item.detail.size
                      })
                    };
                  }
                  fetch('/api/cart/product', init)
                    .then(res => res.json())
                    .then(res => {
                      const paCopy = [...productArray];
                      paCopy.push({ ...props.item.detail });
                      dispatch({ type: STOCK, payload: paCopy });
                      setQuantity(quantity + 1);
                      setDisabled(false);
                    });
                }
              } disabled={disabled}>+</button>
              <button type='button' onClick={
                () => {
                  setDisabled(true);
                  if (quantity === 1) {
                    dispatch({ type: SELECT_PRODUCT, payload: props.item.detail });
                    dispatch({ type: POP, payload: { type: 'deleteProduct', fn: 'delOne' } });
                    setDisabled(false);
                  } else {
                    let init = {};
                    if (userId) {
                      init = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          userId: userId,
                          login: 'login',
                          productId: props.item.detail.productId,
                          size: props.item.detail.size
                        })
                      };
                    } else {
                      init = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          login: 'nologin',
                          productId: props.item.detail.productId,
                          size: props.item.detail.size
                        })
                      };
                    }
                    fetch('/api/cart/product', init)
                      .then(res => {
                        const paCopy = [...productArray];
                        for (let i = paCopy.length - 1; i >= 0; i--) {
                          if (paCopy[i].productId === props.item.detail.productId &&
                            paCopy[i].size === props.item.detail.size) {
                            paCopy.splice(i, 1);
                            break;
                          }
                        }
                        dispatch({ type: STOCK, payload: paCopy });
                        setQuantity(quantity - 1);
                        setDisabled(false);
                      });
                  }
                }
              } disabled={disabled}>-</button>
            </div>
          </div>
        </div>
        <div className='remove'>
          <span onClick={
            () => {
              dispatch({ type: SELECT_PRODUCT, payload: props.item.detail });
              dispatch({ type: POP, payload: { type: 'deleteProduct', fn: 'delAll' } });
              // setQuantity(quantity);
            }
          }>remove</span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CartItem);
