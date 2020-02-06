import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = props => {
  const [types, setTypes] = React.useState([]);
  const [prodShown, setProdShown] = React.useState(false);

  const showMenu = () => props.menuOpen ? 'shown' : 'closed';

  React.useEffect(
    () => {
      fetch('/api/type/all')
        .then(res => res.json())
        .then(res => setTypes(res));
    }, []
  );

  const createProductList = () => {
    return types.map(item => <span key={`type${item.typeId}`}>{item.typeName}</span>);
  };

  return (
    <menu className={showMenu()}>
      <div className='product'>
        <div className='productTitle' onClick={
          () => setProdShown(!prodShown)
        }>
          <span>Products</span>
          {prodShown ? <span className='icon'>-</span> : <span className='icon'>+</span>}
        </div>
        <div className={`productList ${prodShown ? 'shown' : 'hidden'}`}>
          <Link to='/product'>
            <span>All Products</span>
            {createProductList()}
          </Link>
        </div>
      </div>
      <div>
        <span>Account</span>
      </div>
    </menu>
  );
};

export default Sidebar;
