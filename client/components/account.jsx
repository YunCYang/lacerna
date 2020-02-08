import React from 'react';

const Account = () => {
  return (
    <div className='account'>
      <div>
        <span>Login</span>
      </div>
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="login" id="email" required/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="login" id="password" required/>
        </div>
      </div>
      <div>
        <button type='button' onClick={
          () => {
            if (document.querySelector('#email').checkValidity() &&
              document.querySelector('#password').checkValidity()) {
              // console.log(document.querySelector('#password').value);
              return null;
            }
          }
        }>Log In</button>
        <span>Create Account</span>
      </div>
    </div>
  );
};

export default Account;
