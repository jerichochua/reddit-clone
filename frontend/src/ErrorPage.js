import React from 'react';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

const ErrorPage = () => {
  return (
    <div style={style}>
      <h1>Oops!</h1>
      <p>Not Found</p>
    </div>
  );
};

export default ErrorPage;
