import React from 'react';
import ProductCard from './productCard';

const NewProduct = () => {
  const [productList, setProductList] = React.useState([]);

  React.useEffect(
    () => {
      fetch('/api/product/new')
        .then(res => res.json())
        .then(res => setProductList(res));
    }, []
  );

  const createProductCard = () => {
    if (productList.length) {
      return productList.map((item, index) => <ProductCard product={item} key={`new${index}`} />);
    } else return <h3>Loading...</h3>;
  };

  return (
    <div className="new-product">
      <div className='title'>
        <div className="wrapper">
          <span>What&apos;s New</span>
        </div>
      </div>
      <div className='new-content'>
        <div className="wrapper">
          {createProductCard()}
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
