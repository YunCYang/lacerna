import React from 'react';

const ProductCard = props => {
  return (
    <div className='container'>
      <div className='image-container'>
        <img src={`/images/${props.product.image1}.jpg`} alt={props.product.productName}/>
      </div>
      <div className='info-container'>
        <div>
          <span>{props.product.productName}</span>
        </div>
        <div>
          <span>{`$ ${(parseInt(props.product.price) / 100).toFixed(2)}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
