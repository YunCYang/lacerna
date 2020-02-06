import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
  const [menuOpen, setMenuOpen] = React.useState(false);

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
            setMenuOpen(!menuOpen);
            props.setMenuOpen(!props.menuOpen);
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
