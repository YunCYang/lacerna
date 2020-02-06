import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_SHADOW } from '../common/constants/action-types';

const Header = () => {
  const menuOpen = useSelector(state => state.shadow.shadow);
  const dispatch = useDispatch();

  const menuClick = () => menuOpen ? 'open' : 'close';

  return (
    <header>
      <div className='logo'>
        <Link to='/'>
          <p>LACERNA</p>
        </Link>
      </div>
      <div className='menu'>
        <div>
          <i className="fas fa-search"></i>
          <i className="fas fa-user"></i>
          <i className="fas fa-shopping-cart"></i>
        </div>
        <div className={`nav-icon + ${menuClick()}`} onClick={
          () => {
            dispatch({ type: SHOW_SHADOW, payload: !menuOpen });
          }
        }>
          <div></div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// <i class="fas fa-user-alt-slash"></i>
