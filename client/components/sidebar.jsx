import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH, POP, SHOW_SHADOW } from '../common/constants/action-types';
import { SelectedContext } from './app';

const Sidebar = () => {
  const [types, setTypes] = React.useState([]);
  const [prodShown, setProdShown] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState('closed');
  const dispatch = useDispatch();
  const menuOpen = useSelector(state => state.shadow.shadow);
  const userId = useSelector(state => state.auth.auth);
  const searchParam = React.useContext(SelectedContext);

  React.useEffect(
    () => {
      fetch('/api/type/all')
        .then(res => res.json())
        .then(res => setTypes(res));
    }, []
  );

  React.useEffect(
    () => {
      if (menuOpen) setShowMenu('shown');
      else setShowMenu('closed');
    }, [menuOpen]
  );

  const createProductList = () => {
    return types.map(item => <span key={`type${item.typeId}`} onClick={
      e => {
        searchParam.setSearched({
          type: 'type',
          value: e.currentTarget.textContent
        });
        dispatch({
          type: SEARCH,
          payload: {
            type: 'type',
            value: e.currentTarget.textContent
          }
        });
        dispatch({ type: SHOW_SHADOW, payload: !menuOpen });
      }
    }>{item.typeName}</span>);
  };

  const switchAccountLink = () => {
    if (userId) {
      return (
        <span onClick={
          () => {
            dispatch({ type: POP, payload: { type: 'account' } });
            dispatch({ type: SHOW_SHADOW, payload: !menuOpen });
          }
        }>Log Out</span>
      );
    } else {
      return (
        <Link to='/account'>
          <span onClick={
            () => dispatch({ type: SHOW_SHADOW, payload: !menuOpen })
          }>Log In / Sign Up</span>
        </Link>
      );
    }
  };

  return (
    <menu className={showMenu}>
      <div className='product'>
        <div className='productTitle' onClick={
          () => setProdShown(!prodShown)
        }>
          <span>Products</span>
          {prodShown ? <span className='icon'>-</span> : <span className='icon'>+</span>}
        </div>
        <div className={`productList ${prodShown ? 'shown' : 'hidden'}`}>
          <Link to='/product'>
            <span onClick={
              e => {
                searchParam.setSearched({
                  type: 'type',
                  value: 'all'
                });
                dispatch({
                  type: SEARCH,
                  payload: {
                    type: 'type',
                    value: 'all'
                  }
                });
                dispatch({ type: SHOW_SHADOW, payload: !menuOpen });
              }}>All Products</span>
            {createProductList()}
          </Link>
        </div>
      </div>
      <div>
        {switchAccountLink()}
      </div>
    </menu>
  );
};

export default Sidebar;
