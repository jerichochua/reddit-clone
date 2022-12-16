import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Comment = ({ comment, username, onDelete }) => {
  const isAuthor = username === comment.author;

  return (
    <li className='comments-list-item'>
      <div className='comment-container'>
        <div className='comment-header'>
          <span className='comment-header-author'>{comment.author}</span>
          <span className='comment-header-timestamp'>
            {dayjs(comment.created_at).fromNow()}
          </span>
          {isAuthor && (
            <button
              value={comment.id}
              className='delete-button'
              onClick={onDelete}
            >
              Delete
            </button>
          )}
        </div>
        <div className='comment-body'>
          <p>{comment.content}</p>
        </div>
      </div>
    </li>
  );
};

export default Comment;
