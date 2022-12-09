import React from 'react';
import './CommentForm.css';

const CommentForm = () => {
  return (
    <div className='comment-form-container'>
      <form className='comment-form'>
        <textarea
          className='comment-form-textarea'
          placeholder='Add a comment...'
          rows='2'
        ></textarea>
        <button className='comment-form-button'>Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
