import React from 'react';
import '../Form/Form.css';

const SignupForm = (props) => {
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
        <div className='form-field'>
          <label>confirm password</label>
          <input type='password' placeholder='confirm password' />
        </div>
        <button className='form-btn' type='submit'>
          sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
