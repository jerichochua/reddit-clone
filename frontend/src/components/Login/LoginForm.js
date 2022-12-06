import React from 'react';
import '../Form/Form.css';

const LoginForm = (props) => {
  return (
    <div className='form-container'>
      <form className='form'>
        <div className='form-field'>
          <label>username</label>
          <input type='text' placeholder='username' />
        </div>
        <div className='form-field'>
          <label>password</label>
          <input type='password' placeholder='password' />
        </div>
        <button className='form-btn' type='submit'>
          log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
