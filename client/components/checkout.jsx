import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POP } from '../common/constants/action-types';

const Checkout = props => {
  const [emailIsInvalid, setEmailIsInvalid] = React.useState(null);
  const [fnIsInvalid, setFnIsInvalid] = React.useState(null);
  const [lnIsInvalid, setLnIsInvalid] = React.useState(null);
  const [addressIsInvalid, setAddressIsInvalid] = React.useState(null);
  const [ccIsInvalid, setCcIsInvalid] = React.useState(null);
  const userId = useSelector(state => state.auth.auth);
  const dispatch = useDispatch();

  const checkIfValid = () => {
    if (!document.querySelector('#email').checkValidity() || !document.querySelector('#firstName').checkValidity() ||
      !document.querySelector('#lastName').checkValidity() || !document.querySelector('#address').checkValidity() ||
      !document.querySelector('#cc').checkValidity()) {
      if (!document.querySelector('#email').checkValidity()) setEmailIsInvalid(true);
      if (!document.querySelector('#firstName').checkValidity()) setFnIsInvalid(true);
      if (!document.querySelector('#lastName').checkValidity()) setLnIsInvalid(true);
      if (!document.querySelector('#address').checkValidity()) setAddressIsInvalid(true);
      if (!document.querySelector('#cc').checkValidity()) setCcIsInvalid(true);
      return false;
    } else {
      setEmailIsInvalid(false);
      setFnIsInvalid(false);
      setLnIsInvalid(false);
      setAddressIsInvalid(false);
      setCcIsInvalid(false);
      return true;
    }
  };

  return (
    <>
      <div className="title">
        <span>Checkout</span>
      </div>
      <div className="content">
        <div className='form'>
          <div className='contact'>
            <div className="form-name">
              <span>Contact Info</span>
            </div>
            <div className="form-input">
              <input type="text" name="email" id="email" required
                placeholder='Email Address' onBlur={
                  e => setEmailIsInvalid(!e.target.checkValidity())
                }
                pattern='^[\w.=-]+@[\w.-]+\.[\w]{2,4}$'/>
              <span className={`invalid ${emailIsInvalid ? 'shown' : 'hidden'}`}>Email is not valid</span>
            </div>
          </div>
          <div className='shipping'>
            <div className="form-name">
              <span>Shipping Address</span>
            </div>
            <div className="form-input">
              <div className='name'>
                <div className='firstName'>
                  <input type="text" name="firstName" id="firstName" required
                    placeholder='First Name' onBlur={
                      e => setFnIsInvalid(!e.target.checkValidity())
                    }/>
                </div>
                <div className="lastName">
                  <input type="text" name="lastName" id="lastName" required
                    placeholder='Last Name' onBlur={
                      e => setLnIsInvalid(!e.target.checkValidity())
                    }/>
                </div>
              </div>
              <div className='name-error'>
                <span className={`invalid ${fnIsInvalid ? 'shown' : 'hidden'}`}>First name is required</span>
                <span className={`invalid ${lnIsInvalid ? 'shown' : 'hidden'}`}>Last name is required</span>
              </div>
              <div className='address'>
                <input type="text" name="address" id="address" required
                  placeholder='Address' onBlur={
                    e => setAddressIsInvalid(!e.target.checkValidity())
                  }/>
                <span className={`invalid ${addressIsInvalid ? 'shown' : 'hidden'}`}>Address is required</span>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className="form-name">
              <span>Credit Card</span>
            </div>
            <div className="form-input">
              <input type="text" name="cc" id="cc" required
                placeholder='Credit Card Number' onBlur={
                  e => setCcIsInvalid(!e.target.checkValidity())
                }/>
              <span className={`invalid ${ccIsInvalid ? 'shown' : 'hidden'}`}>Credit card is not valid</span>
            </div>
          </div>
        </div>
        <div className="total">
          <span>{`Total: $ ${props.total.toFixed(2)}`}</span>
        </div>
      </div>
      <div className="button">
        <button type='button' onClick={
          () => {
            if (checkIfValid()) {
              let init = {};
              if (userId) {
                init = {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    status: 'true',
                    login: 'login',
                    userId: userId
                  })
                };
              } else {
                init = {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    status: 'true',
                    login: 'nologin'
                  })
                };
              }
              fetch('/api/cart/status', init)
                .then(res => res.json())
                .then(res => dispatch({ type: POP, payload: { type: 'checkOut' } }));
            }
          }
        }>Checkout</button>
        <button type='button' onClick={
          () => props.setView('cart')
        }>Return to Cart</button>
      </div>
    </>
  );
};

export default Checkout;
