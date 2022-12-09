import React from 'react';

const FormTextArea = ({ label, placeholder }) => {
  return (
    <div className='form-field'>
      <label>{label}</label>
      <textarea placeholder={placeholder} rows='6' />
    </div>
  );
};

export default FormTextArea;
