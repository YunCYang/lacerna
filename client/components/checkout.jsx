import React from 'react';

const Checkout = props => {
  const [emailIsInvalid, setEmailIsInvalid] = React.useState(null);
  const [fnIsInvalid, setFnIsInvalid] = React.useState(null);
  const [lnIsInvalid, setLnIsInvalid] = React.useState(null);
  const [addressIsInvalid, setAddressIsInvalid] = React.useState(null);
  const [ccIsInvalid, setCcIsInvalid] = React.useState(null);

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
              <input type="email" name="email" id="email" required
                placeholder='Email Address' onBlur={
                  e => setEmailIsInvalid(!e.target.checkValidity())
                }/>
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
          () => null
        }>Checkout</button>
        <button type='button' onClick={
          () => props.setView('cart')
        }>Return to Cart</button>
      </div>
    </>
  );
};

export default Checkout;
