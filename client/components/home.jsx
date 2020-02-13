import React from 'react';

const Home = () => {

  React.useEffect(
    () => {
      fetch('/api/product/all')
        .then(res => res.json())
        .then(res => null);
    }, []
  );

  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Home;
