import React from 'react';
import { useSelector } from 'react-redux';
// import ProductCard from './productCard';

const Product = () => {
  const selected = useSelector(state => {
    if (state.search) {
      return {
        type: state.search.search.type,
        value: state.search.search.value
      };
    } else return null;
  });
  // const selectedType = useSelector(state => {
  //   if (state.type) return state.type.type;
  //   else return null;
  // });
  // const searchType = useSelector(state => {
  //   if (state.search) return state.search.search;
  //   else return null;
  // });
  // const searchProduct = useSelector(state => {
  //   if (state.prosearch) return state.prosearch.prosearch;
  //   else return null;
  // });
  // const [type, setType] = React.useState(null);
  // const [proSearch, setProSearch] = React.useState('');
  // const [productList, setProductList] = React.useState([]);
  // const [pageLoad, setPageLoad] = React.useState(false);

  // React.useEffect(
  //   () => {
  //     setPageLoad(true);
  //   }, []
  // );

  React.useEffect(
    () => {
      // console.log(selected);
      // if (pageLoad) {
      // console.log(searchType);
      // if (searchType === 'type') {
      //   setType(selectedType);
      //   if (type && selectedType === type) {
      //     if (type === 'All Products') {
      //       fetch('/api/product/all')
      //         .then(res => res.json())
      //         .then(res => {
      //           console.log(res);
      //           setProductList(res);
      //         });
      //     } else {
      //       fetch(`/api/product/type/${type}`)
      //         .then(res => res.json())
      //         .then(res => setProductList(res));
      //     }
      //   }
      // } else if (searchType === 'proSearch') {
      //   setProSearch(searchProduct);
      //   if (proSearch && searchProduct === proSearch) {
      //     fetch(`/api/product/name/search/${proSearch}`)
      //       .then(res => res.json())
      //       .then(res => console.log(res));
      //   }
      // }
      // return setPageLoad(false);
    }, [selected]
    // }
  );

  // const createProductList = () => {
  //   if (productList.length) {
  //     productList.map(item => <ProductCard product={item} key={`item${item.ProductId}`} />);
  //   } else return null;
  // };

  return (
    <div>
    </div>
  );
};

export default Product;
