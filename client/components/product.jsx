import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './productCard';
import ProductView from './productView';

const Product = () => {
  const selected = useSelector(state => {
    if (state.search) {
      return {
        type: state.search.search.type,
        value: state.search.search.value
      };
    } else return null;
  });
  const [productList, setProductList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(
    () => {
      setIsLoading(true);
      let isSubscribed = true;
      if (selected.type === 'type') {
        if (selected.value === 'all') {
          fetch('/api/product/all')
            .then(res => res.json())
            .then(res => {
              if (isSubscribed) setProductList(res);
            })
            .finally(() => setIsLoading(false));
        } else {
          fetch(`/api/product/type/${selected.value}`)
            .then(res => res.json())
            .then(res => {
              if (isSubscribed) setProductList(res);
            })
            .finally(() => setIsLoading(false));
        }
      } else if (selected.type === 'productSearch') {
        fetch(`/api/product/name/search/${selected.value}`)
          .then(res => res.json())
          .then(res => {
            if (isSubscribed) setProductList(res);
          })
          .finally(() => setIsLoading(false));
      } else if (selected.type === 'product') {
        fetch(`/api/product/name/${selected.value}`)
          .then(res => res.json())
          .then(res => {
            if (isSubscribed) setProductList(res);
          })
          .finally(() => setIsLoading(false));
      }
      return () => {
        isSubscribed = false;
      };
    }, [selected.value]
  );

  const createProductList = () => {
    if (isLoading) {
      return <h1>Loading...</h1>;
    } else {
      if (selected.type === 'product') {
        if (productList.productName) {
          return <ProductView product={productList} />;
        }
      } else {
        if (productList.length) {
          return productList.map((item, index) => <ProductCard product={item} key={`item${index}`} />);
        } else return null;
      }
    }
  };

  return (
    <div className='product'>
      {createProductList()}
    </div>
  );
};

export default Product;
