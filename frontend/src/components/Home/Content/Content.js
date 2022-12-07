import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { get } from '../../../util/api';
import Posts from './Posts';
import './Content.css';

dayjs.extend(relativeTime);

const Content = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await get('posts');
      setPosts(response);
    };
    fetchPosts();
  }, []);

  const postsList = posts.map((post) => {
    return (
      <Posts
        key={post.id}
        postid={post.id}
        title={post.title}
        author={post.author}
        timestamp={dayjs(post.created_at).fromNow()}
        votes={post.score}
        comments={parseInt(post.comments)}
      />
    );
  });

  return (
    <div className='content'>
      {posts.length === 0 ? <p>No posts to show</p> : <ul>{postsList}</ul>}
    </div>
  );
};

export default Content;
