import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH, STOCK, POP, SELECT_PRODUCT } from '../common/constants/action-types';

const ProductView = props => {
  const [quantity, setQuantity] = React.useState('1');
  const [size, setSize] = React.useState('M');
  const userId = useSelector(state => state.auth.auth);
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
                <input type="radio" name="size" id="XS" onClick={
                  e => setSize(e.target.id)
                } />
                <label htmlFor="XS">XS</label>
              </div>
              <div>
                <input type="radio" name="size" id="S" onClick={
                  e => setSize(e.target.id)
                } />
                <label htmlFor="S">S</label>
              </div>
              <div>
                <input type="radio" name="size" id="M" defaultChecked onClick={
                  e => setSize(e.target.id)
                } />
                <label htmlFor="M">M</label>
              </div>
              <div>
                <input type="radio" name="size" id="L" onClick={
                  e => setSize(e.target.id)
                } />
                <label htmlFor="L">L</label>
              </div>
              <div>
                <input type="radio" name="size" id="XL" onClick={
                  e => setSize(e.target.id)
                } />
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
                <button type='button' onClick={
                  () => {
                    let init = {};
                    if (userId) {
                      init = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          login: 'login',
                          productId: props.product.productId,
                          size: size,
                          userId: userId
                        })
                      };
                    } else {
                      init = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          login: 'nologin',
                          productId: props.product.productId,
                          size: size
                        })
                      };
                    }
                    const request = [];
                    for (let i = 0; i < quantity; i++) request.push('/api/cart/product');
                    Promise.all(
                      request.map(item => {
                        return fetch(item, init)
                          .then(res => res.json())
                          .then(res => false);
                      })
                    ).then(
                      () => {
                        fetch(`/api/product/cart/${userId || 1}/${userId ? 'login' : 'nologin'}`)
                          .then(res => res.json())
                          .then(res => {
                            dispatch({ type: STOCK, payload: res });
                            dispatch({ type: SELECT_PRODUCT, payload: props.product });
                            dispatch({ type: POP, payload: { type: 'addToCart' } });
                          });
                      }
                    );
                  }
                }>Add to Cart</button>
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
