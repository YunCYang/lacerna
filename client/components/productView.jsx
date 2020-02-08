import React from 'react';
import { useDispatch } from 'react-redux';
import { SEARCH } from '../common/constants/action-types';

const ProductView = props => {
  const [quantity, setQuantity] = React.useState('1');
  const dispatch = useDispatch();

  return (
    <div className='product-detail'>
      <div>
        <span onClick={
          () => {
            dispatch({
              type: SEARCH,
              payload: {
                type: props.selected.type,
                value: props.selected.value
              }
            });
          }
        }>&lt; Back to Product</span>
      </div>
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
            <div>
              <div>
                <input type="radio" name="size" id="XS" />
                <label htmlFor="XS">XS</label>
              </div>
              <div>
                <input type="radio" name="size" id="S" />
                <label htmlFor="S">S</label>
              </div>
              <div>
                <input type="radio" name="size" id="M" />
                <label htmlFor="M">M</label>
              </div>
              <div>
                <input type="radio" name="size" id="L" />
                <label htmlFor="L">L</label>
              </div>
              <div>
                <input type="radio" name="size" id="XL" />
                <label htmlFor="XL">XL</label>
              </div>
            </div>
            <div>
              <div className='quantity'>
                <button type='button' onClick={
                  () => {
                    if (parseInt(quantity) > 1) {
                      let quantityInt = parseInt(quantity);
                      quantityInt -= 1;
                      setQuantity(quantityInt.toString());
                    }
                  }
                }>-</button>
                <input type="text" name="size" id="quantity"
                  placeholder='1' value={quantity} onChange={
                    e => {
                      const test = /^[1-9]\d*$/;
                      if (test.exec(e.target.value)) setQuantity(e.target.value);
                    }
                  }/>
                <button type='button' onClick={
                  () => {
                    let quantityInt = parseInt(quantity);
                    quantityInt += 1;
                    setQuantity(quantityInt.toString());
                  }
                }>+</button>
              </div>
              <div className='submit'>
                <button type='button'>Add to Cart</button>
              </div>
            </div>
          </div>
          <div>
            <span>{parseInt(quantity) > 1 ? `Subtotal: $ ${(parseInt(quantity) * props.product.price / 100).toFixed(2)}` : ''}</span>
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
    </div>
  );
};

export default ProductView;
