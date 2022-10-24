import React from 'react';
import Content from './Content/Content';
import Side from './Side/Side';
import './Home.css';

export default function Home(props) {
  return (
    <div className='home'>
      <Content />
      <Side />
    </div>
  );
}
