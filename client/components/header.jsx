import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_SHADOW, SEARCH, POP } from '../common/constants/action-types';

const Header = props => {
  const menuOpen = useSelector(state => state.shadow.shadow);
  const userId = useSelector(state => state.auth.auth);
  const productArray = useSelector(state => state.product.product);
  const [searchShown, setSearchShown] = React.useState(false);
  const [productQuantity, setProductQuantity] = React.useState(0);
  const dispatch = useDispatch();

  const menuClick = () => menuOpen ? 'open' : 'close';

  React.useEffect(
    () => {
      const unlisten = props.history.listen(() => {
        setSearchShown(false);
      });
      setProductQuantity(productArray ? productArray.length : 0);
      return () => unlisten();
    }
  );

  return (
    <header>
      <div className='logo'>
        <Link to='/'>
          <p>LACERNA</p>
        </Link>
      </div>
      <div className='menu'>
        <div>
          <i className="fas fa-search" onClick={
            () => setSearchShown(!searchShown)
          }></i>
          <i className={userId ? 'fas fa-sign-out-alt' : 'fas fa-sign-in-alt'} onClick={
            () => {
              if (!userId) props.history.push('/account');
              else {
                dispatch({
                  type: POP,
                  payload: {
                    type: 'account'
                  }
                });
              }
            }
          }></i>
          <Link to='/cart'>
            <i className="fas fa-shopping-cart"></i>
            <span>({productQuantity})</span>
          </Link>
          <div className={`form ${searchShown ? 'shown' : 'hidden'}`}>
            <input type="text" placeholder='product name' onKeyPress={
              e => {
                if (e.key === 'Enter') {
                  props.history.push('/product');
                  dispatch({
                    type: SEARCH,
                    payload: {
                      type: 'productSearch',
                      value: e.target.value
                    }
                  });
                }
              }
            } />
          </div>
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

export default withRouter(Header);
