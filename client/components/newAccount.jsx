import React from 'react';

const NewAccount = props => {
  const [fnIsValid, setFnIsValid] = React.useState(null);
  const [lnIsValid, setLnIsValid] = React.useState(null);
  const [emailIsValid, setEmailIsValid] = React.useState(null);

  return (
    <div className='account'>
      <div>
        <span>Register</span>
      </div>
      <div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="signup" id="firstName" required />
          <span className={`invalid ${!fnIsValid && fnIsValid !== null ? 'shown' : 'hidden'}`}>First name is required</span>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="signup" id="lastName" required />
          <span className={`invalid ${!lnIsValid && lnIsValid !== null ? 'shown' : 'hidden'}`}>Last name is required</span>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="signup" id="email" required />
          <span className={`invalid ${!emailIsValid && emailIsValid !== null ? 'shown' : 'hidden'}`}>Email is invalid</span>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="signup" id="password"
            pattern='^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})' required />
          <span>Password is invalid</span>
          <span>Needs to have more than 8 characters</span>
          <span>At least 1 uppercase character is required</span>
          <span>At least 1 lowercase character is required</span>
          <span>At least 1 number is required</span>
          <span>At least 1 special character is required</span>
        </div>
      </div>
      <div>
        <button type='button' onClick={
          () => {
            if (document.querySelector('#firstName').checkValidity() &&
              document.querySelector('#lastName').checkValidity() &&
              document.querySelector('#email').checkValidity()) {
              return null;
            } else {
              if (!document.querySelector('#firstName').checkValidity()) setFnIsValid(false);
              else setFnIsValid(true);
              if (!document.querySelector('#lastName').checkValidity()) setLnIsValid(false);
              else setLnIsValid(true);
              if (!document.querySelector('#email').checkValidity()) setEmailIsValid(false);
              else setEmailIsValid(true);
            }
          }
          // () => {
          //   if (document.querySelector('#email').checkValidity() &&
          //     document.querySelector('#password').checkValidity()) {
          //     const init = {
          //       method: 'POST',
          //       headers: {
          //         'Content-Type': 'application/json'
          //       },
          //       body: JSON.stringify({
          //         email: document.querySelector('#email').value,
          //         password: document.querySelector('#password').value
          //       })
          //     };
          //     fetch('/api/auth/login', init)
          //       .then(res => res.json())
          //       .then(res => {
          //         dispatch({
          //           type: AUTH,
          //           payload: res
          //         });
          //       });
          //   }
          // }
        }>Create My Account</button>
        <span onClick={
          () => props.setCreateAccount(false)
        }>Log In</span>
      </div>
    </div>
  );
};

export default NewAccount;
