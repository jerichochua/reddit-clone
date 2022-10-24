import React from 'react';

export default function Votes(props) {
  return (
    <div className='votes'>
      <button className='upvote-btn'></button>
      <span>{props.votes}</span>
      <button className='downvote-btn'></button>
    </div>
  );
}
