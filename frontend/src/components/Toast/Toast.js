import React from 'react';
import './Toast.css';

const Toast = ({ type, message, show }) => {
  return (
    <div className={`toast-container ${show ? 'show' : ''}`}>
      <p className={`toast-text ${type}`}>{message}</p>
    </div>
  );
};

export default Toast;
