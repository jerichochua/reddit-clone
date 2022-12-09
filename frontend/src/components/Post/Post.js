import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../util/api';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import PostDetails from './PostDetails';
import './Post.css';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await get(`posts/${id}`);
      setPost(response);
    };
    const fetchComments = async () => {
      const response = await get(`posts/${id}/comments`);
      setComments(response);
    };
    fetchPost();
    fetchComments();
  }, [id]);

  return (
    <div className='post'>
      <PostDetails post={post} />
      <CommentForm />
      <CommentsList comments={comments} />
    </div>
  );
};

export default Post;
