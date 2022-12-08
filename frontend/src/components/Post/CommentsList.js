import React from 'react';
import Comment from './Comment';
import './Comments.css';

const CommentsList = ({ comments }) => {
  const commentsList = comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));

  return <ul className='comments-list'>{commentsList}</ul>;
};

export default CommentsList;
