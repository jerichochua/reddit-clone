import React from 'react';
import getRelativeTime from '../../util/getRelativeTime';
import PostButton from './PostButton/PostButton';
import { useAppContext } from '../../contexts/AppProvider';
import Votes from '../Vote/Votes';

const PostDetails = (props) => {
  const { state } = useAppContext();

  const isAuthor = state.username === props.post.author;

  return (
    <div className='post-details-container'>
      <Votes score={props.post.score} />
      <div className='post-content-container'>
        <div className='post-title'>
          <span>{props.post.title}</span>
        </div>
        <div className='post-content'>
          <p>{props.post.content}</p>
        </div>
        <div className='post-details'>
          <p>
            {props.post.comments} comment
            {parseInt(props.post.comments) === 1 ? '' : 's'} by{' '}
            {props.post.author} {getRelativeTime(props.post.created_at)}
          </p>
          {isAuthor && (
            <PostButton label='Delete' type='danger' onClick={props.onDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
