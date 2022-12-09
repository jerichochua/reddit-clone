import React from 'react';

const FormButton = ({ label, type }) => {
  return (
    <button className='form-btn' type={type}>
      {label}
    </button>
  );
};

export default FormButton;
