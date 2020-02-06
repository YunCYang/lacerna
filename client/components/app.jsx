import React from 'react';
import { UserProvider } from './userContext';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import Home from './home';
import Product from './product';
import Account from './account';
import Cart from './cart';
import Footer from './footer';

const App = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <Router>
      <Switch>
        <UserProvider value={null}>
          <Header setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
          <Sidebar menuOpen={menuOpen} />
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/product" render={() => <Product />} />
          <Route exact path="/account" render={() => <Account />} />
          <Route exact path="/cart" render={() => <Cart />} />
          <Footer />
        </UserProvider>
      </Switch>
    </Router>
  );
};

export default App;
