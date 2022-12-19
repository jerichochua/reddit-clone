import React from 'react';

const FormButton = ({ label, name, value, type }) => {
  return (
    <button className='form-btn' name={name} value={value} type={type}>
      {label}
    </button>
  );
};

export default FormButton;
