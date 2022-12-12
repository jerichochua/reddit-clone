import React, { useState } from 'react';

const FormField = ({ label, type, placeholder, required }) => {
  const [value, setValue] = useState('');
  return (
    <div className='form-field'>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default FormField;
