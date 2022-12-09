import React from 'react';

const FormField = ({ label, type, placeholder, required }) => {
  return (
    <div className='form-field'>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} required={required} />
    </div>
  );
};

export default FormField;
