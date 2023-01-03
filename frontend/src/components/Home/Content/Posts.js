import React from 'react';
import { Link } from 'react-router-dom';
import Votes from '../../Vote/Votes';

const Posts = ({ postId, title, author, score, timestamp, comments }) => {
  return (
    <li>
      <div className='post-container'>
        <Votes postId={postId} votes={score} />
        <div className='post-item'>
          <div className='title'>
            <Link to={`/posts/${postId}`}>{title}</Link>
          </div>
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
