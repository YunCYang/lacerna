import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH, STOCK } from '../common/constants/action-types';

const CartItem = props => {
  const userId = useSelector(state => state.auth.auth);
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      setQuantity(props.item.quantity);
    }
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
                e => setQuantity(e.target.value)
              }/>
            </div>
            <div className='qt-button'>
              <button type='button'>+</button>
              <button type='button'>-</button>
            </div>
          </div>
        </div>
        <div className='remove'>
          <span onClick={
            () => {
              let init = {};
              if (userId) {
                init = {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    userId: userId,
                    productId: props.item.detail.productId,
                    login: 'login',
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
                    productId: props.item.detail.productId,
                    login: 'nologin',
                    size: props.item.detail.size
                  })
                };
              }
              fetch('/api/cart/productType', init)
                .then(res => {
                  const paCopy = [...props.productArray];
                  for (let i = 0; i < paCopy.length; i++) {
                    if (paCopy[i].productId === props.item.detail.productId &&
                      paCopy[i].size === props.item.detail.size) {
                      paCopy.splice(i, 1);
                      i--;
                    }
                  }
                  dispatch({
                    type: STOCK,
                    payload: paCopy
                  });
                });
            }
          }>remove</span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CartItem);
