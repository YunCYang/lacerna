import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './productCard';

const Product = () => {
  const selectedType = useSelector(state => {
    if (state.type) return state.type.type;
    else return null;
  });
  const [type, setType] = React.useState(null);
  const [productList, setProductList] = React.useState([]);
  const [pageLoad, setPageLoad] = React.useState(false);

  React.useEffect(
    () => {
      setPageLoad(true);
    }, []
  );

  React.useEffect(
    () => {
      if (pageLoad) {
        setType(selectedType);
        if (type && selectedType === type) {
          if (type === 'All Products') {
            fetch('/api/product/all')
              .then(res => res.json())
              .then(res => setProductList(res));
          } else {
            fetch(`/api/product/type/${type}`)
              .then(res => res.json())
              .then(res => setProductList(res));
          }
        }
        return setPageLoad(false);
      }
    }
  );

  const createProductList = () => {
    if (productList.length) {
      productList.map(item => <ProductCard product={item} key={`item${item.ProductId}`} />);
    } else return null;
  };

  return (
    <div>
      {createProductList()}
    </div>
  );
};

export default Product;
