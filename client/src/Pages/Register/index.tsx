import { useState, ChangeEvent } from 'react';
import validator from 'validator';
import Axios from 'axios';

import Input from '../../Components/Global/Input';
import SpringButton from '../../Components/Custom/Button';
import { StyledLink, LoginLink } from '../../Components/Custom/Link';

import './register.styles.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [password1, setPassword1] = useState('');
  const [password1Err, setPassword1Err] = useState('');
  const [password2, setPassword2] = useState('');
  const [password2Err, setPassword2Err] = useState('');

  const submitRegister = async (e: any) => {
    e.preventDefault();
    setEmailErr('');
    setPassword1Err('');
    setPassword2Err('');
    if (!validator.isEmail(email)) {
      setEmailErr('Invalid Email');
    }
    if (validator.isEmpty(email)) {
      setEmailErr('Field cannot be empty!');
    }
    if (password1 !== password2) {
      setPassword2Err("Passwords don't match");
    }
    if (validator.isEmpty(password1)) {
      setPassword1Err('Field cannot be empty!');
    }
    if (validator.isEmpty(password2)) {
      setPassword2Err('Field cannot be empty!');
    }
    console.log(emailErr, password1Err, password2Err);
    if (emailErr || password1Err || password2Err) {
      return;
    } else {
      const response = await Axios({
        method: 'put',
        baseURL: 'http://localhost:8083',
        url: '/auth/register',
        data: {
          email: email,
          password: password1,
        },
        withCredentials: true,
        validateStatus: null,
      });
      if (response.data.error) {
        setEmailErr(response.data.error);
      }
      console.log(response);
    }
  };

  return (
    <div className='register'>
      <div className='register__body'>
        <div className='register__title'>Register</div>
        <form style={{ width: '100%' }} onSubmit={submitRegister}>
          <Input
            name='email'
            type='email'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setEmailErr('');
            }}
            value={email}
            label='Email Adress'
            error={emailErr}
          />
          <Input
            name='password'
            type='password'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword1(e.target.value);
              setPassword1Err('');
            }}
            value={password1}
            label='Password'
            error={password1Err}
          />
          <Input
            name='password2'
            type='password'
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword2(e.target.value);
              setPassword2Err('');
            }}
            value={password2}
            label='Confirm Password'
            error={password2Err}
          />
          <SpringButton
            color={'#02a247'}
            width={'100%'}
            fontSize={'2rem'}
            marginBottom={'2rem'}
          >
            Register
          </SpringButton>
        </form>
        <div className='register__or'></div>
        <div onClick={() => {}} className='register__google'>
          <i className='icon-google'></i>
          <StyledLink className='register__google--text'>
            Register with google
          </StyledLink>
        </div>
        <LoginLink to='/login'>Already have an account?</LoginLink>
      </div>
    </div>
  );
};

export default Register;
