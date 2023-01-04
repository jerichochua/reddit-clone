import React, { useState } from 'react';
import './Vote.css';

const Votes = ({ score }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  const handleUpvote = () => {
    if (isUpvoted) {
      setIsUpvoted(false);
    } else if (isDownvoted) {
      setIsDownvoted(false);
      setIsUpvoted(true);
    } else {
      setIsUpvoted(true);
    }
  };

  const handleDownvote = () => {
    if (isDownvoted) {
      setIsDownvoted(false);
    } else if (isUpvoted) {
      setIsUpvoted(false);
      setIsDownvoted(true);
    } else {
      setIsDownvoted(true);
    }
  };

  return (
    <div className='votes-container'>
      <button
        className={`upvote-btn${isUpvoted ? ' voted' : ''}`}
        onClick={handleUpvote}
      ></button>
      <span>{score}</span>
      <button
        className={`downvote-btn${isDownvoted ? ' voted' : ''}`}
        onClick={handleDownvote}
      ></button>
    </div>
  );
};

export default Votes;
