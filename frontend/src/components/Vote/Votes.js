import React from 'react';
import './Vote.css';

const Votes = (props) => {
  return (
    <div className='votes-container'>
      <button className='upvote-btn'></button>
      <span>{props.votes}</span>
      <button className='downvote-btn'></button>
    </div>
  );
};

export default Votes;
