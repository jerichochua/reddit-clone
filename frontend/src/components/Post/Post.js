import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../util/api';
import { useAppContext } from '../../contexts/AppProvider';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import PostDetails from './PostDetails';
import './Post.css';

const Post = () => {
  const { state } = useAppContext();
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const response = await get(`posts/${id}`);
      setPost(response);
    };
    fetchPost();
  }, [id]);

  return (
    <main className='post'>
      <PostDetails post={post} />
      {state.token && <CommentForm postId={id} />}
      <CommentsList postId={id} />
    </main>
  );
};

export default Post;
