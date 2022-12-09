import React from 'react';

const FormTextArea = ({ label, placeholder, required }) => {
  return (
    <div className='form-field'>
      <label>{label}</label>
      <textarea placeholder={placeholder} rows='6' required={required} />
    </div>
  );
};

export default FormTextArea;
