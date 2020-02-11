import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const productArray = useSelector(state => state.product.product);

  const createProductList = () => {
    if (productArray) {
      return productArray.map((item, index) => <h1 key={index}>{item.productName}</h1>);
    }
  };

  return (
    <>
      {createProductList()}
    </>
  );
};

export default Cart;
