import React from 'react';
import Post from './Post';
import './Content.css';

export default function Content(props) {
  return (
    <div className='content'>
      <ul>
        <Post
          title='Sample Title'
          author='Sample Author'
          timestamp='Time'
          votes='100'
          comments='100'
        />
      </ul>
    </div>
  );
}
