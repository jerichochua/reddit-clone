import React from 'react';
import Posts from './Posts';
import './Content.css';

export default function Content(props) {
  return (
    <div className='content'>
      <ul>
        <Posts
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
