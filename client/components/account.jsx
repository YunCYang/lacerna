import React from 'react';
import NewAccount from './newAccount';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AUTH, STOCK } from '../common/constants/action-types';

const Account = props => {
  const [createAccount, setCreateAccount] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState('');
  const [accountMatch, setAccountMatch] = React.useState({
    type: null,
    isMatch: true
  });
  const dispatch = useDispatch();

  if (!createAccount) {
    return (
      <div className='account'>
        <div>
          <span>Login</span>
        </div>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="login" id="email" required
              onKeyPress={
                e => {
                  if (e.key === 'Enter') {
                    if (document.querySelector('#email').checkValidity() &&
                      document.querySelector('#password').checkValidity()) {
                      const init = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          email: document.querySelector('#email').value,
                          password: document.querySelector('#password').value
                        })
                      };
                      fetch('/api/auth/login', init)
                        .then(res => res.json())
                        .then(res => {
                          setIsInvalid('');
                          if (res.error) {
                            if (res.error[0] === 'e' && res.error[1] === 'm' &&
                              res.error[2] === 'a' && res.error[3] === 'i' &&
                              res.error[4] === 'l') {
                              setAccountMatch({ type: 'email', isMatch: false });
                            }
                          } else if (typeof res === 'object') {
                            setAccountMatch({ type: 'password', isMatch: false });
                          } else {
                            const init = {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                userId: res
                              })
                            };
                            fetch('/api/cart/userType', init)
                              .then(result => {
                                fetch(`/api/product/cart/${res}/login`)
                                  .then(res => res.json())
                                  .then(productResult => {
                                    dispatch({ type: STOCK, payload: productResult });
                                    setAccountMatch({ type: null, isMatch: true });
                                    dispatch({ type: AUTH, payload: res });
                                    sessionStorage.setItem('id', res);
                                    props.history.push('/');
                                  });
                              });
                          }
                        });
                    } else {
                      if (!document.querySelector('#email').checkValidity() &&
                        !document.querySelector('#password').checkValidity()) {
                        setIsInvalid('all');
                      } else if (!document.querySelector('#email').checkValidity()) {
                        setIsInvalid('email');
                      } else setIsInvalid('password');
                    }
                  }
                }
              }/>
            <span className={`invalid ${isInvalid === 'email' || isInvalid === 'all' ? 'shown' : 'hidden'}`}>
              Email is invalid
            </span>
            <span className={`invalid ${!accountMatch.isMatch &&
              accountMatch.type === 'email' ? 'shown' : 'hidden'}`}>
              Email does not Match
            </span>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="login" id="password" required
              onKeyPress={
                e => {
                  if (e.key === 'Enter') {
                    if (document.querySelector('#email').checkValidity() &&
                      document.querySelector('#password').checkValidity()) {
                      const init = {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          email: document.querySelector('#email').value,
                          password: document.querySelector('#password').value
                        })
                      };
                      fetch('/api/auth/login', init)
                        .then(res => res.json())
                        .then(res => {
                          setIsInvalid('');
                          if (res.error) {
                            if (res.error[0] === 'e' && res.error[1] === 'm' &&
                              res.error[2] === 'a' && res.error[3] === 'i' &&
                              res.error[4] === 'l') {
                              setAccountMatch({ type: 'email', isMatch: false });
                            }
                          } else if (typeof res === 'object') {
                            setAccountMatch({ type: 'password', isMatch: false });
                          } else {
                            const init = {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                userId: res
                              })
                            };
                            fetch('/api/cart/userType', init)
                              .then(result => {
                                fetch(`/api/product/cart/${res}/login`)
                                  .then(res => res.json())
                                  .then(productResult => {
                                    dispatch({ type: STOCK, payload: productResult });
                                    setAccountMatch({ type: null, isMatch: true });
                                    dispatch({ type: AUTH, payload: res });
                                    sessionStorage.setItem('id', res);
                                    props.history.push('/');
                                  });
                              });
                          }
                        });
                    } else {
                      if (!document.querySelector('#email').checkValidity() &&
                        !document.querySelector('#password').checkValidity()) {
                        setIsInvalid('all');
                      } else if (!document.querySelector('#email').checkValidity()) {
                        setIsInvalid('email');
                      } else setIsInvalid('password');
                    }
                  }
                }
              }/>
            <span className={`invalid ${isInvalid === 'password' || isInvalid === 'all' ? 'shown' : 'hidden'}`}>
              Password is required to log in
            </span>
            <span className={`invalid ${!accountMatch.isMatch &&
              accountMatch.type === 'password' ? 'shown' : 'hidden'}`}>
              Password does not match
            </span>
          </div>
        </div>
        <div>
          <button type='button' onClick={
            () => {
              if (document.querySelector('#email').checkValidity() &&
                document.querySelector('#password').checkValidity()) {
                const init = {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: document.querySelector('#email').value,
                    password: document.querySelector('#password').value
                  })
                };
                fetch('/api/auth/login', init)
                  .then(res => res.json())
                  .then(res => {
                    setIsInvalid('');
                    if (res.error) {
                      if (res.error[0] === 'e' && res.error[1] === 'm' &&
                        res.error[2] === 'a' && res.error[3] === 'i' &&
                        res.error[4] === 'l') {
                        setAccountMatch({ type: 'email', isMatch: false });
                      }
                    } else if (typeof res === 'object') {
                      setAccountMatch({ type: 'password', isMatch: false });
                    } else {
                      const init = {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          userId: res
                        })
                      };
                      fetch('/api/cart/userType', init)
                        .then(result => {
                          fetch(`/api/product/cart/${res}/login`)
                            .then(res => res.json())
                            .then(productResult => {
                              dispatch({ type: STOCK, payload: productResult });
                              setAccountMatch({ type: null, isMatch: true });
                              dispatch({ type: AUTH, payload: res });
                              sessionStorage.setItem('id', res);
                              props.history.push('/');
                            });
                        });
                    }
                  });
              } else {
                if (!document.querySelector('#email').checkValidity() &&
                  !document.querySelector('#password').checkValidity()) {
                  setIsInvalid('all');
                } else if (!document.querySelector('#email').checkValidity()) {
                  setIsInvalid('email');
                } else setIsInvalid('password');
              }
            }
          }>Log In</button>
          <span onClick={
            () => setCreateAccount(true)
          }>Create Account</span>
        </div>
      </div>
    );
  } else {
    return <NewAccount setCreateAccount={setCreateAccount}/>;
  }
};

export default withRouter(Account);
