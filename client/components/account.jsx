import React from 'react';
import NewAccount from './newAccount';
import { useDispatch } from 'react-redux';
import { AUTH } from '../common/constants/action-types';

const Account = () => {
  const [createAccount, setCreateAccount] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState('');
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
            <input type="email" name="login" id="email" required />
            <span className={`invalid ${isInvalid === 'email' || isInvalid === 'all' ? 'shown' : 'hidden'}`}>
              Email is invalid
            </span>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="login" id="password" required />
            <span className={`invalid ${isInvalid === 'password' || isInvalid === 'all' ? 'shown' : 'hidden'}`}>
              Password is required to log in
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
                    dispatch({
                      type: AUTH,
                      payload: res
                    });
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

export default Account;
