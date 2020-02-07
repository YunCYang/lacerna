import React from 'react';

const ProductView = props => {

  return (
    <div className='product-detail'>
      <div className='detail-info'>
        <div className='detail-info-img'>
          <img src={`/images/${props.product.image1}.jpg`}
            alt={props.product.productName}/>
        </div>
        <div className='detail-info-info'>
          <div className='detail-info-name'>
            <span>{props.product.productName}</span>
          </div>
          <div className='detail-info-price'>
            <span>{`$ ${(parseInt(props.product.price) / 100).toFixed(2)}`}</span>
          </div>
          <div className='detail-info-desc'>
            <span>{props.product.description}</span>
          </div>
          <div className='detail-info-form'>
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
      <div className='detail-desc'>
        <div className='detail-desc-desc'>
          <span>{props.product.detail}</span>
        </div>
        <div className='detail-desc-img'>
          <img src={`/images/${props.product.image2}.jpg`}
            alt={props.product.productName}/>
        </div>
      </div>
      <div className='detail-related'></div>
    </div>
  );
};

export default ProductView;
