import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Comment = (props) => {
  return (
    <li className='comments-list-item'>
      <div className='comment-container'>
        <div className='comment-header'>
          <span className='comment-header-author'>{props.comment.author}</span>
          <span className='comment-header-timestamp'>
            {dayjs(props.comment.created_at).fromNow()}
          </span>
        </div>
        <div className='comment-body'>
          <p>{props.comment.content}</p>
        </div>
      </div>
    </li>
  );
};

export default Comment;
