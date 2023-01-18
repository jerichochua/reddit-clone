import React from 'react';
import { Link } from 'react-router-dom';
import Votes from '../../Vote/Votes';

const Posts = ({
  postId,
  title,
  author,
  score,
  timestamp,
  comments,
  type,
  url,
}) => {
  return (
    <li>
      <div className='post-container'>
        <Votes score={score} />
        <div className='post-item'>
          <div className='title'>
            {type === 'text' && <Link to={`/posts/${postId}`}>{title}</Link>}
            {type === 'link' && (
              <a href={url} target='_blank' rel='noreferrer'>
                {title}
              </a>
            )}
          </div>
          {type === 'link' && <div className='post-url'>{url}</div>}
          <div className='caption'>
            <span>by </span>
            <Link to={`/user/${author}`}>{author}</Link>
            <span> {timestamp}</span>
          </div>
          <div>
            <Link className='links' to={`/posts/${postId}`}>
              {comments} comment{comments === 1 ? '' : 's'}
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Posts;
