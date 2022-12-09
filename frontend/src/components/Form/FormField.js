import React from 'react';

const FormField = ({ label, type, placeholder }) => {
  return (
    <div className='form-field'>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  );
};

export default FormField;
