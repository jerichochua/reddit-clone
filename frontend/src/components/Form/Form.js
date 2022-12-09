import React from 'react';
import './Form.css';

const Form = ({ children, wide }) => {
  return (
    <div
      className='form-container'
      style={{ maxWidth: wide ? '600px' : '375px' }}
    >
      <form className='form'>{children}</form>
    </div>
  );
};

export default Form;
