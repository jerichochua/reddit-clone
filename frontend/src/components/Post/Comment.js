import React, { useState } from 'react';
import { FormButton } from '../Form';
import getRelativeTime from '../../util/getRelativeTime';
import PostButton from './PostButton/PostButton';

const Comment = ({ comment, username, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const isAuthor = username === comment.author;

  return (
    <li className='comments-list-item'>
      <div className='comment-container'>
        <div className='comment-header'>
          <span className='comment-header-author'>{comment.author}</span>
          <span className='comment-header-timestamp'>
            {getRelativeTime(comment.created_at)}
          </span>
          {isAuthor && (
            <>
              <PostButton
                label={isEditing ? 'Cancel' : 'Edit'}
                type='secondary'
                onClick={() => setIsEditing(!isEditing)}
              />
              <PostButton
                label='Delete'
                type='danger'
                value={comment.id}
                onClick={onDelete}
              />
            </>
          )}
        </div>
        <div>
          {isEditing ? (
            <form onSubmit={onEdit}>
              <textarea
                name='commentedit'
                className='comment-edit-textarea'
                defaultValue={comment.content}
                rows='2'
                required
              ></textarea>
              <div className='comment-edit-footer'>
                <FormButton
                  name='commenteditbtn'
                  label='Edit'
                  value={comment.id}
                  type='submit'
                />
              </div>
            </form>
          ) : (
            <p className='comment-body'>{comment.content}</p>
          )}
        </div>
      </div>
    </li>
  );
};

export default Comment;
