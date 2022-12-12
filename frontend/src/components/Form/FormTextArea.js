import React, { useState } from 'react';

const FormTextArea = ({ name, label, placeholder, required }) => {
  const [value, setValue] = useState('');
  return (
    <div className='form-field'>
      <label>{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        rows='6'
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default FormTextArea;
