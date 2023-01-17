import React from 'react';

const FormOption = ({ name, label, options, setOption }) => {
  const optionsList = options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  const onChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <div className='form-field'>
      <label>{label}</label>
      <select name={name} onChange={onChange}>
        {optionsList}
      </select>
    </div>
  );
};

export default FormOption;
