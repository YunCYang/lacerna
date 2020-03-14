import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { POP, AUTH, STOCK, SEARCH } from '../common/constants/action-types';
import { SelectedContext } from './app';

const Modal = props => {
  const modalStatus = useSelector(state => {
    if (state.modal.modal) {
      return {
        type: state.modal.modal.type
      };
    } else return null;
  });
  const delFn = useSelector(state => {
    if (state.modal.modal) {
      return state.modal.modal.fn;
    } else return null;
  });
  const userId = useSelector(state => state.auth.auth);
  const selectedProduct = useSelector(state => state.select.select);
  const productArray = useSelector(state => state.product.product);
  const dispatch = useDispatch();
  const searchParam = React.useContext(SelectedContext);

  if (modalStatus) {
    if (modalStatus.type === 'disclaimer') {
      return (
        <div className={`modal-shadow ${modalStatus.isOpen ? 'shown' : 'hidden'}`}>
          <div className='modal'>
            <div className='content'>
              <h4>Disclaimer</h4>
              <span>This website, the store &quot;LACERNA&quot;, the products and all information provided in the website are used in a fictitious manner. The website is purely served as a portfolio project. Please do not use your real personal information when testing the features of the website.</span>
            </div>
            <div className='button'>
              <button onClick={
                () => {
                  fetch(`/api/product/cart/${userId || 1}/${userId ? 'login' : 'nologin'}`)
                    .then(res => res.json())
                    .then(res => {
                      dispatch({ type: STOCK, payload: res });
                      dispatch({ type: POP, payload: { type: null } });
                    });
                }
              }>Confirm</button>
            </div>
          </div>
        </div>
      );
    } else if (modalStatus.type === 'account') {
      return (
        <div className={`modal-shadow ${modalStatus.isOpen ? 'shown' : 'hidden'}`}>
          <div className='modal'>
            <div className='content'>
              <h4>Are you sure you want to log out?</h4>
            </div>
            <div className='button'>
              <button onClick={
                () => {
                  fetch('/api/auth/logout')
                    .then(res => {
                      fetch(`/api/product/cart/${1}/nologin`)
                        .then(res => res.json())
                        .then(res => {
                          dispatch({ type: STOCK, payload: res });
                          dispatch({ type: AUTH, payload: null });
                          dispatch({ type: POP, payload: { type: null } });
                          sessionStorage.removeItem('id');
                        });
                    });
                }
              }>Log Out</button>
              <button onClick={
                () => dispatch({ type: POP, payload: { type: null } })
              }>Cancel</button>
            </div>
          </div>
        </div>
      );
    } else if (modalStatus.type === 'checkOut') {
      return (
        <div className={`modal-shadow ${modalStatus.isOpen ? 'shown' : 'hidden'}`}>
          <div className='modal'>
            <div className='content'>
              <h4>Your order is completed!</h4>
            </div>
            <div className='button'>
              <button onClick={
                () => {
                  fetch(`/api/product/cart/${userId || 1}/${userId ? 'login' : 'nologin'}`)
                    .then(res => res.json())
                    .then(res => {
                      props.history.push('/');
                      dispatch({ type: STOCK, payload: res });
                      dispatch({ type: POP, payload: { type: null } });
                    });
                }
              }>Return</button>
            </div>
          </div>
        </div>
      );
    } else if (modalStatus.type === 'addToCart') {
      return (
        <div className={`modal-shadow ${modalStatus.isOpen ? 'shown' : 'hidden'}`}>
          <div className='modal'>
            <div className='content'>
              <h4>{`${selectedProduct.productName} is successfully added to your cart!`}</h4>
            </div>
            <div className='button'>
              <button onClick={
                () => {
                  if (searchParam.searched) {
                    dispatch({
                      type: SEARCH,
                      payload: {
                        type: searchParam.searched.type,
                        value: searchParam.searched.value
                      }
                    });
                  } else {
                    dispatch({
                      type: SEARCH,
                      payload: {
                        type: 'type',
                        value: 'all'
                      }
                    });
                  }
                  dispatch({ type: POP, payload: { type: null } });
                }
              }>Continue shopping</button>
              <button onClick={
                () => {
                  props.history.push('/cart');
                  dispatch({ type: POP, payload: { type: null } });
                }
              }>Check out my cart</button>
            </div>
          </div>
        </div>
      );
    } else if (modalStatus.type === 'deleteProduct') {
      return (
        <div className={`modal-shadow ${modalStatus.isOpen ? 'shown' : 'hidden'}`}>
          <div className='modal'>
            <div className='content'>
              <h4>{`Are you sure you want to delete ${selectedProduct.productName}?`}</h4>
            </div>
            <div className='button'>
              <button onClick={
                () => {
                  let init = {};
                  if (delFn === 'delOne') {
                    if (userId) {
                      init = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          userId: userId,
                          productId: selectedProduct.productId,
                          login: 'login',
                          size: selectedProduct.size
                        })
                      };
                    } else {
                      init = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          productId: selectedProduct.productId,
                          login: 'nologin',
                          size: selectedProduct.size
                        })
                      };
                    }
                    fetch('/api/cart/product', init)
                      .then(res => {
                        const paCopy = [...productArray];
                        for (let i = paCopy.length - 1; i >= 0; i--) {
                          if (paCopy[i].productId === selectedProduct.productId &&
                            paCopy[i].size === selectedProduct.size) {
                            paCopy.splice(i, 1);
                            break;
                          }
                        }
                        dispatch({ type: STOCK, payload: paCopy });
                        dispatch({ type: POP, payload: { type: null } });
                      });
                  } else if (delFn === 'delAll') {
                    if (userId) {
                      init = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          userId: userId,
                          productId: selectedProduct.productId,
                          login: 'login',
                          size: selectedProduct.size
                        })
                      };
                    } else {
                      init = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          productId: selectedProduct.productId,
                          login: 'nologin',
                          size: selectedProduct.size
                        })
                      };
                    }
                    fetch('/api/cart/productType', init)
                      .then(res => {
                        const paCopy = [...productArray];
                        for (let i = paCopy.length - 1; i >= 0; i--) {
                          if (paCopy[i].productId === selectedProduct.productId &&
                            paCopy[i].size === selectedProduct.size) {
                            paCopy.splice(i, 1);
                          }
                        }
                        dispatch({ type: STOCK, payload: paCopy });
                        dispatch({ type: POP, payload: { type: null } });
                      });
                  }
                }
              }>Confirm delete</button>
              <button onClick={
                () => dispatch({ type: POP, payload: { type: null } })
              }>Cancel</button>
            </div>
          </div>
        </div>
      );
    } else return null;
  }
};

export default withRouter(Modal);
