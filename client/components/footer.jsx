import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SEARCH } from '../common/constants/action-types';

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <footer>
      <div>
        <h4>Disclaimer</h4>
        <p>This website, the store &quot;LACERNA&quot;, the products and all information provided in the website are used in a fictitious manner. The website is purely served as a portfolio project. Please do not use your real personal information when testing the features of the website.</p>
      </div>
      <div>
        <h4>Site Links</h4>
        <div className='link'>
          <Link to='/'>
            <p>Home</p>
          </Link>
          <Link to='/product' onClick={
            () => {
              dispatch({
                type: SEARCH,
                payload: {
                  type: 'type',
                  value: 'all'
                }
              });
            }}>
            <p>Product</p>
          </Link>
          <Link to='/cart'>
            <p>Cart</p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
