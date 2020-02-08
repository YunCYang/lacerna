import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH } from '../common/constants/action-types';

const Sidebar = () => {
  const [types, setTypes] = React.useState([]);
  const [prodShown, setProdShown] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState('closed');
  const dispatch = useDispatch();
  const menuOpen = useSelector(state => state.shadow.shadow);

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
      e => dispatch({
        type: SEARCH,
        payload: {
          type: 'type',
          value: e.currentTarget.textContent
        }
      })
    }>{item.typeName}</span>);
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
                dispatch({
                  type: SEARCH,
                  payload: {
                    type: 'type',
                    value: 'all'
                  }
                });
              }}>All Products</span>
            {createProductList()}
          </Link>
        </div>
      </div>
      <div>
        <Link to='/account'>
          <span>Log In / Sign Up</span>
        </Link>
      </div>
    </menu>
  );
};

export default Sidebar;
