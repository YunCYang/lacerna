import React from 'react';

const Checkout = props => {
  return (
    <>
      <div className="title">
        <span>Checkout</span>
      </div>
      <div className="content">
        <div className='form'></div>
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
