import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_SHADOW, SEARCH } from '../common/constants/action-types';

const Header = props => {
  const menuOpen = useSelector(state => state.shadow.shadow);
  const [searchShown, setSearchShown] = React.useState(false);
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
          <i className="fas fa-search" onClick={
            () => setSearchShown(!searchShown)
          }></i>
          <i className="fas fa-user"></i>
          <i className="fas fa-shopping-cart"></i>
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

// <i class="fas fa-user-alt-slash"></i>
