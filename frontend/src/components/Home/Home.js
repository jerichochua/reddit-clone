import React from 'react';
import Content from './Content/Content';
import './Home.css';

const Home = ({ isUserPage }) => {
  return (
    <main className='home'>
      <Content isUserPage={isUserPage} />
    </main>
  );
};

export default Home;
