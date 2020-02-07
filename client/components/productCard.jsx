import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SEARCH } from '../common/constants/action-types';

const ProductCard = props => {
  const [hover, setHover] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <div className='container'>
      <Link to='/product' onClick={
        () => {
          dispatch({
            type: SEARCH,
            payload: {
              type: 'product',
              value: props.product.productName
            }
          });
        }
      }>
        <div className='image-container' onMouseEnter={
          () => setHover(true)
        } onMouseLeave={
          () => setHover(false)
        }>
          <img className={hover ? 'hidden' : 'shown'} src={`/images/${props.product.image1}.jpg`}
            alt={props.product.productName} />
          <img className={!hover ? 'hidden' : 'shown'} src={`/images/${props.product.image2}.jpg`}
            alt={props.product.productName} />
        </div>
        <div className='info-container'>
          <div>
            <span>{props.product.productName}</span>
          </div>
          <div>
            <span>{`$ ${(parseInt(props.product.price) / 100).toFixed(2)}`}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
