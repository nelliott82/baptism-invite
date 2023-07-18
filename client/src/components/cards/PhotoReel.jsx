import React from 'react';
import Photos from './Photos.jsx';

const PhotoReel = ({ cardDiv }) => {

  return (
    <div className={`themeFont ${cardDiv}`}>
      <h1>Photos</h1>
      <br/>
      <Photos/>
    </div>
  )
}

export default PhotoReel;