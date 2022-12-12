import React from 'react';
import './Form.css';

const Form = ({ children, wide, onSubmit }) => {
  return (
    <div
      className='form-container'
      style={{ maxWidth: wide ? '600px' : '375px' }}
    >
      <form className='form' onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default Form;
