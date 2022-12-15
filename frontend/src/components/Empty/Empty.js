import React from 'react';
import './Empty.css';

const Empty = ({ message }) => {
  return (
    <div className='empty-content'>
      <p>No content found. Please try a different page.</p>
      {message && <p className='empty-message'>{message}</p>}
    </div>
  );
};

export default Empty;
