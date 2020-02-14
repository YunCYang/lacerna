import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH } from '../common/constants/action-types';
import { withRouter } from 'react-router-dom';
import CartItem from './cartItem';
import Checkout from './checkout';

const Cart = props => {
  const productArray = useSelector(state => state.product.product);
  const [productSortedArray, setProductSortedArray] = React.useState([]);
  const [view, setView] = React.useState('cart');
  const selected = useSelector(state => {
    if (state.search) {
      return {
        type: state.search.search.type,
        value: state.search.search.value
      };
    } else return null;
  });
  const dispatch = useDispatch();

  const createSortedArray = () => {
    let productFlag = false;
    const psaCopy = [];
    for (let i = 0; i < productArray.length; i++) {
      let index = null;
      for (let j = 0; j < psaCopy.length; j++) {
        if (psaCopy[j].detail) {
          if (psaCopy[j].detail.productId === productArray[i].productId &&
            psaCopy[j].detail.size === productArray[i].size) {
            productFlag = true;
            index = j;
            break;
          }
        }
      }
      if (productFlag) {
        psaCopy[index].quantity += 1;
        productFlag = false;
      } else {
        const tempProduct = { detail: productArray[i], quantity: 1 };
        psaCopy.push(tempProduct);
      }
    }
    return psaCopy;
  };

  React.useEffect(
    () => {
      const psaCopy = createSortedArray();
      setProductSortedArray(psaCopy);
    }, [productArray.length]
  );

  const createProductList = () => {
    if (productArray) {
      return productSortedArray.sort().map((item, index) => {
        return <CartItem key={`cart ${index}`} item={item} />;
      });
    }
  };

  if (view === 'cart') {
    return (
      <div className='cart'>
        <div className='title'>
          <span>Cart</span>
        </div>
        <div className='content'>
          <div className='cart-item-list'>
            {productArray.length ? createProductList()
              : <h3>Your cart is empty</h3>}
          </div>
          <div className='total'>
            <span>{`Total: $ ${
              (productSortedArray.length
                ? productSortedArray.reduce((sum, acc) => {
                  sum += (acc.detail.price * acc.quantity) / 100;
                  return sum;
                }, 0)
                : 0).toFixed(2)
              }`}</span>
          </div>
        </div>
        <div className='button'>
          <button type='button' onClick={
            () => {
              if (productArray.length) setView('checkout');
            }
          }>Proceed to Checkout</button>
          <button type='button' onClick={
            () => {
              props.history.push('/product');
              dispatch({
                type: SEARCH,
                payload: {
                  type: selected.type,
                  value: selected.value
                }
              });
            }
          }>Continue Shopping</button>
        </div>
      </div>
    );
  } else {
    const total = productSortedArray.reduce((sum, acc) => {
      sum += (acc.detail.price * acc.quantity) / 100;
      return sum;
    }, 0);
    return (
      <div className="cart">
        <Checkout setView={setView} total={total} />
      </div>
    );
  }
};

export default withRouter(Cart);
