import React from 'react';
import Carousel from './carousel';
import NewProduct from './newProduct';

const Home = () => {

  return (
    <div className='home'>
      <Carousel />
      <NewProduct />
    </div>
  );
};

export default Home;
