import React from 'react';
import './LoginForm.css';

const LoginForm = (props) => {
  return (
    <div className='login-form-container'>
      <form className='login-form'>
        <div className='form-field'>
          <label>username</label>
          <input type='text' placeholder='username' />
        </div>
        <div className='form-field'>
          <label>password</label>
          <input type='password' placeholder='password' />
        </div>
        <button className='login-btn' type='submit'>log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
