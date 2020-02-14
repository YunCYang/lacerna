import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SEARCH } from '../common/constants/action-types';

const Carousel = props => {
  const [popularProduct, setPopularProduct] = React.useState(null);
  const [newProduct, setNewProduct] = React.useState(null);
  const [randomProduct, setRandomProduct] = React.useState(null);
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      fetch('/api/product/popular')
        .then(res => res.json())
        .then(res => {
          setPopularProduct(res);
          fetch('/api/product/new')
            .then(res => res.json())
            .then(newResult => {
              if (newResult[0].productId !== res.productId) setNewProduct(newResult[0]);
              else setNewProduct(newResult[1]);
              fetch('/api/product/all')
                .then(res => res.json())
                .then(allResult => {
                  const arr = [];
                  let newTemp = null;
                  if (newResult[0].productId !== res.productId) newTemp = newResult[0];
                  else newTemp = newResult[1];
                  for (let i = 1; i < allResult.length + 1; i++) {
                    if (i !== res.productId && i !== newTemp.productId) arr.push(i);
                  }
                  const randNum = Math.floor(Math.random() * (allResult.length - 2));
                  for (const item of allResult) {
                    if (item.productId === arr[randNum]) {
                      setRandomProduct(item);
                    }
                  }
                });
            });
        });
    }, []
  );

  const createSlide = () => {
    if (randomProduct) {
      return (
        <>
          <div className="slide">
            <img src={`/images/${popularProduct.image1}.jpg`} alt={popularProduct.productName}
              onClick={
                () => {
                  props.history.push('/product');
                  dispatch({
                    type: SEARCH,
                    payload: {
                      type: 'product',
                      value: popularProduct.productName
                    }
                  });
                }
              }/>
            <h1>Popular Choice</h1>
          </div>
          <div className="slide">
            <img src={`/images/${newProduct.image1}.jpg`} alt={newProduct.productName}
              onClick={
                () => {
                  props.history.push('/product');
                  dispatch({
                    type: SEARCH,
                    payload: {
                      type: 'product',
                      value: newProduct.productName
                    }
                  });
                }
              }/>
            <h1>New Arrival</h1>
          </div>
          <div className="slide">
            <img src={`/images/${randomProduct.image1}.jpg`} alt={randomProduct.productName}
              onClick={
                () => {
                  props.history.push('/product');
                  dispatch({
                    type: SEARCH,
                    payload: {
                      type: 'product',
                      value: randomProduct.productName
                    }
                  });
                }
              }/>
            <h1>Hot Pick</h1>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h1>Loading...</h1>
        </>
      );
    }
  };

  return (
    <div className="carousel">
      <input type="radio" name="carousel" id="popular" className="activator" defaultChecked/>
      <input type="radio" name="carousel" id="new" className="activator" />
      <input type="radio" name="carousel" id="random" className="activator" />
      <div className="controls">
        <label htmlFor="random" className='control control-backward'></label>
        <label htmlFor="new" className='control control-forward'></label>
      </div>
      <div className="controls">
        <label htmlFor="popular" className='control control-backward'></label>
        <label htmlFor="random" className='control control-forward'></label>
      </div>
      <div className="controls">
        <label htmlFor="new" className='control control-backward'></label>
        <label htmlFor="popular" className='control control-forward'></label>
      </div>
      <div className="track">
        {createSlide()}
      </div>
      <div className="indicators">
        <label htmlFor="popular" className='indicator'></label>
        <label htmlFor="new" className='indicator'></label>
        <label htmlFor="random" className='indicator'></label>
      </div>
    </div>
  );
};

export default withRouter(Carousel);

// <i className="fas fa-chevron-left"></i>
// <i className="fas fa-chevron-right"></i>
// <i className="fas fa-circle"></i>
// <i className="far fa-circle"></i>
