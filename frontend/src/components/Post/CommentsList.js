import React, { useEffect, useState } from 'react';
import { get } from '../../util/api';
import Comment from './Comment';
import './Comments.css';

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await get(`posts/${postId}/comments`);
      setComments(response);
    };
    fetchComments();
  }, [postId]);

  const commentsList = comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));

  return <ul className='comments-list'>{commentsList}</ul>;
};

export default CommentsList;
