import React from 'react';
import './PostButton.css';

const PostButton = ({ label, type, value, onClick }) => {
  return (
    <button className={`post-button ${type}`} value={value} onClick={onClick}>
      {label}
    </button>
  );
};

export default PostButton;
