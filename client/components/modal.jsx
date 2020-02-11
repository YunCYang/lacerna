import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POP, AUTH, STOCK } from '../common/constants/action-types';

const Modal = () => {
  const modalStatus = useSelector(state => {
    if (state.modal.modal) {
      return {
        type: state.modal.modal.type
      };
    } else return null;
  });
  const userId = useSelector(state => state.auth.auth);
  const dispatch = useDispatch();

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
        <div className={`modal ${modalStatus.isOpen ? 'shown' : 'hidden'}`}>
          <div className='modal'>
            <div className='content'></div>
            <div className='button'></div>
          </div>
        </div>
      );
    } else return null;
  }
};

export default Modal;
