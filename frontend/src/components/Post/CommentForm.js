import React, { useState } from 'react';
import { post } from '../../util/api';
import { FormButton } from '../Form';
import { useAppContext } from '../../contexts/AppProvider';
import './CommentForm.css';

const CommentForm = ({ postId }) => {
  const { state } = useAppContext();
  const [message, setMessage] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { content: e.target.content.value };
    try {
      const response = await post(`posts/${postId}`, body, state.token);
      if (response) {
        setMessage('comment added');
        e.target.content.value = '';
      } else {
        setMessage('error adding comment');
        console.error(response);
      }
    } catch (error) {
      setMessage(`error adding comment: ${error.message}`);
    }
  };

  return (
    <div className='comment-form-container'>
      <form className='comment-form' onSubmit={onSubmitForm}>
        <textarea
          name='content'
          className='comment-form-textarea'
          placeholder='Add a comment...'
          rows='2'
          required
        ></textarea>
        <div className='comment-form-footer'>
          {message && <span className='comment-footer-message'>{message}</span>}
          <FormButton label='Comment' type='submit' />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
