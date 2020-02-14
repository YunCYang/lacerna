import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SEARCH } from '../common/constants/action-types';

const Carousel = props => {
  const [popularProduct, setPopularProduct] = React.useState(null);
  const [newProduct, setNewProduct] = React.useState(null);
  const [randomProduct, setRandomProduct] = React.useState(null);
  const [auto, setAuto] = React.useState(true);
  const [currentSlide, setCurrentSlide] = React.useState('popular');
  const dispatch = useDispatch();
  const slideShow = React.useRef();

  const forwardTime = () => {
    if (auto) {
      slideShow.current = setInterval(
        () => {
          if (currentSlide === 'popular') {
            document.querySelector('#new').checked = true;
            setCurrentSlide('new');
          } else if (currentSlide === 'new') {
            document.querySelector('#random').checked = true;
            setCurrentSlide('random');
          } else if (currentSlide === 'random') {
            document.querySelector('#popular').checked = true;
            setCurrentSlide('popular');
          }
        }, 3000
      );
    } else {
      slideShow.current = setInterval(
        () => {
          setAuto(true);
        }, 3000
      );
    }
  };

  const stopTime = () => clearInterval(slideShow.current);

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

  React.useEffect(
    () => {
      stopTime();
      forwardTime();
    }
  );

  const createSlide = () => {
    if (randomProduct) {
      return (
        <>
          <div className="slide">
            <img src={`/images/${popularProduct.image1}.jpg`} alt={popularProduct.productName}
              onClick={
                () => {
                  stopTime();
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
                  stopTime();
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
                  stopTime();
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

  React.useEffect(
    () => {
      const unlisten = props.history.listen(() => stopTime());
      return () => unlisten();
    }
  );

  return (
    <div className="carousel">
      <input type="radio" name="carousel" id="popular" className="activator" defaultChecked
        onChange={
          e => setCurrentSlide('popular')
        }/>
      <input type="radio" name="carousel" id="new" className="activator"
        onChange={
          e => setCurrentSlide('new')
        }/>
      <input type="radio" name="carousel" id="random" className="activator"
        onChange={
          e => setCurrentSlide('random')
        }/>
      <div className="controls">
        <label htmlFor="random" className='control control-backward' onClick={
          () => {
            stopTime();
            setAuto(false);
            setCurrentSlide('random');
          }
        }></label>
        <label htmlFor="new" className='control control-forward' onClick={
          () => {
            stopTime();
            setAuto(false);
            setCurrentSlide('new');
          }
        }></label>
      </div>
      <div className="controls">
        <label htmlFor="popular" className='control control-backward' onClick={
          () => {
            stopTime();
            setAuto(false);
            setCurrentSlide('popular');
          }
        }></label>
        <label htmlFor="random" className='control control-forward' onClick={
          () => {
            stopTime();
            setAuto(false);
            setCurrentSlide('random');
          }
        }></label>
      </div>
      <div className="controls">
        <label htmlFor="new" className='control control-backward' onClick={
          () => {
            stopTime();
            setAuto(false);
            setCurrentSlide('new');
          }
        }></label>
        <label htmlFor="popular" className='control control-forward' onClick={
          () => {
            stopTime();
            setAuto(false);
            setCurrentSlide('popular');
          }
        }></label>
      </div>
      <div className="track">
        {createSlide()}
      </div>
      <div className="indicators">
        <label htmlFor="popular" className='indicator' onClick={
          () => {
            stopTime();
            setAuto(false);
            setCurrentSlide('popular');
          }
        }></label>
        <label htmlFor="new" className='indicator' onClick={
          () => {
            stopTime();
            setAuto(false);
            setCurrentSlide('new');
          }
        }></label>
        <label htmlFor="random" className='indicator' onClick={
          () => {
            stopTime();
            setAuto(false);
            setCurrentSlide('random');
          }
        }></label>
      </div>
    </div>
  );
};

export default withRouter(Carousel);
