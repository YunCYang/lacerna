import React from 'react';
// import { UserProvider } from './userContext';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import Home from './home';
import Product from './product';
import Account from './account';
import Cart from './cart';
import Footer from './footer';
import Shadow from './shadow';
import Modal from './modal';

const App = () => {
  return (
    <Router>
      <Switch>
        <>
          <Header />
          <Sidebar />
          <div className='main'>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/product" render={() => <Product />} />
            <Route exact path="/account" render={() => <Account />} />
            <Route exact path="/cart" render={() => <Cart />} />
          </div>
          <Footer />
          <Shadow />
          <Modal />
        </>
      </Switch>
    </Router>
  );
};

export default App;
