import React from 'react';

const NewAccount = props => {
  const [fnIsValid, setFnIsValid] = React.useState(null);
  const [lnIsValid, setLnIsValid] = React.useState(null);
  const [emailIsValid, setEmailIsValid] = React.useState(null);
  const [pwdLengthCheck, setPwdLengthCheck] = React.useState(null);
  const [pwdUcCheck, setPwdUcCheck] = React.useState(null);
  const [pwdLcCheck, setPwdLcCheck] = React.useState(null);
  const [pwdNumberCheck, setPwdNumberCheck] = React.useState(null);
  const [pwdSpcCheck, setPwdSpcCheck] = React.useState(null);
  const [pwdIsValid, setPwdIsValid] = React.useState(null);
  const [emailDuplicate, setEmailDuplicate] = React.useState(false);

  const passwordCheck = () => {
    const lengthCheck = RegExp('(?=.{8,})');
    const ucCheck = RegExp('(?=.*[A-Z])');
    const lcCheck = RegExp('(?=.*[a-z])');
    const numberCheck = RegExp('(?=.*[0-9])');
    const spcCheck = RegExp('(?=.*[!@#$%^&*_=+-])');
    if (!lengthCheck.test(document.querySelector('#password').value)) setPwdLengthCheck(false);
    else (setPwdLengthCheck(true));
    if (!ucCheck.test(document.querySelector('#password').value)) setPwdUcCheck(false);
    else (setPwdUcCheck(true));
    if (!lcCheck.test(document.querySelector('#password').value)) setPwdLcCheck(false);
    else (setPwdLcCheck(true));
    if (!numberCheck.test(document.querySelector('#password').value)) setPwdNumberCheck(false);
    else (setPwdNumberCheck(true));
    if (!spcCheck.test(document.querySelector('#password').value)) setPwdSpcCheck(false);
    else (setPwdSpcCheck(true));
    if (pwdLengthCheck && pwdUcCheck && pwdLcCheck && pwdNumberCheck && pwdSpcCheck) return true;
    else return false;
  };

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
          <span className={`invalid ${emailDuplicate ? 'shown' : 'hidden'}`}>The email address is already in use</span>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="signup" id="password"
            pattern='^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,}$' required />
          <span className={`invalid ${!pwdIsValid && pwdIsValid !== null ? 'shown' : 'hidden'}`}>Password is invalid</span>
          <span className={`invalid ${!pwdIsValid && !pwdLengthCheck && pwdLengthCheck !== null ? 'shown' : 'hidden'}`}>Needs to have more than 8 characters</span>
          <span className={`invalid ${!pwdIsValid && !pwdUcCheck && pwdUcCheck !== null ? 'shown' : 'hidden'}`}>At least 1 uppercase character is required</span>
          <span className={`invalid ${!pwdIsValid && !pwdLcCheck && pwdLcCheck !== null ? 'shown' : 'hidden'}`}>At least 1 lowercase character is required</span>
          <span className={`invalid ${!pwdIsValid && !pwdNumberCheck && pwdNumberCheck !== null ? 'shown' : 'hidden'}`}>At least 1 number is required</span>
          <span className={`invalid ${!pwdIsValid && !pwdSpcCheck && pwdSpcCheck !== null ? 'shown' : 'hidden'}`}>At least 1 special character is required</span>
        </div>
      </div>
      <div>
        <button type='button' onClick={
          () => {
            if (document.querySelector('#firstName').checkValidity() &&
              document.querySelector('#lastName').checkValidity() &&
              document.querySelector('#email').checkValidity() &&
              document.querySelector('#password').checkValidity()) {
              setFnIsValid(true);
              setLnIsValid(true);
              setEmailIsValid(true);
              setPwdIsValid(true);
              const init = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  firstName: document.querySelector('#firstName').value,
                  lastName: document.querySelector('#lastName').value,
                  email: document.querySelector('#email').value,
                  password: document.querySelector('#password').value,
                  userType: 'false'
                })
              };
              fetch('/api/auth/signup', init)
                .then(res => res.json())
                .then(res => {
                  if (res.error) {
                    if (res.error[0] === 'e' && res.error[1] === 'm' && res.error[2] === 'a' &&
                      res.error[3] === 'i' && res.error[4] === 'l') setEmailDuplicate(true);
                    else if (emailDuplicate) setEmailDuplicate(false);
                  } else {
                    if (emailDuplicate) setEmailDuplicate(false);
                    props.setCreateAccount(false);
                  }
                  // props.setCreateAccount(false);
                });
            } else {
              if (!document.querySelector('#firstName').checkValidity()) setFnIsValid(false);
              else setFnIsValid(true);
              if (!document.querySelector('#lastName').checkValidity()) setLnIsValid(false);
              else setLnIsValid(true);
              if (!document.querySelector('#email').checkValidity()) setEmailIsValid(false);
              else setEmailIsValid(true);
              if (!document.querySelector('#password').checkValidity()) {
                setPwdIsValid(false);
                passwordCheck();
              } else {
                setPwdIsValid(true);
                if (!pwdLengthCheck) setPwdLengthCheck(true);
                if (!pwdUcCheck) setPwdUcCheck(true);
                if (!pwdLcCheck) setPwdLcCheck(true);
                if (!pwdNumberCheck) setPwdNumberCheck(true);
                if (!pwdSpcCheck) setPwdSpcCheck(true);
              }
              if (emailDuplicate) setEmailDuplicate(false);
            }
          }
        }>Create My Account</button>
        <span onClick={
          () => props.setCreateAccount(false)
        }>Log In</span>
      </div>
    </div>
  );
};

export default NewAccount;
