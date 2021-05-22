import { useState, ChangeEvent } from 'react';
import validator from 'validator';

import Input from '../../Components/Global/Input';
import SpringButton from '../../Components/Custom/Button';
import { LoginLink, StyledLink } from '../../Components/Custom/Link';
import useAuth from '../../Hooks/Auth';
import './login.styles.scss';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const { login } = useAuth();

  const submitLogin = async (e: any) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setEmailErr('Invalid Email');
    }
    if (validator.isEmpty(email)) {
      setEmailErr('Email cannot be empty!');
    }
    if (validator.isEmpty(password)) {
      setPasswordErr('Password cannot be empty!');
    }
    if (emailErr || passwordErr) {
      return;
    } else {
      const res = await login(email, password);
      if (res?.error) {
        setEmailErr(res.error);
      }
    }
  };

  return (
    <div className='login'>
      <div className='login__body'>
        <div className='login__title'>Login</div>
        <form style={{ width: '100%' }} onSubmit={submitLogin}>
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
              setPassword(e.target.value);
              setPasswordErr('');
            }}
            value={password}
            label='Password'
            error={passwordErr}
          />
          <SpringButton
            color={'#02a247'}
            width={'100%'}
            fontSize={'2rem'}
            marginBottom={'2rem'}
          >
            login
          </SpringButton>
        </form>

        <StyledLink onClick={() => {}}>Forgot your password?</StyledLink>
        <div className='login__or'></div>
        <div onClick={() => {}} className='login__google'>
          <i className='icon-google'></i>
          <StyledLink className='login__google--text'>
            Sign in with google
          </StyledLink>
        </div>

        <LoginLink to='/register'>Don't Have an Account?</LoginLink>
      </div>
    </div>
  );
};

export default Login;
