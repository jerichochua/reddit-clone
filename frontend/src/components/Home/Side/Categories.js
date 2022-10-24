import React from 'react';
import CategoryItem from './CategoryItem';

export default function Categories(props) {
  return (
    <div className='cat-list'>
      <p className='cat-header'>categories</p>
      <CategoryItem category='Category 1' />
      <CategoryItem category='Category 2' />
    </div>
  );
}
