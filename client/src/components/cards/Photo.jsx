import React from 'react';

const Photo = ({ cardDiv, photo }) => {

  return (
    <div className={cardDiv}>
      <img className='w-full' src={photo} />
    </div>
  )
}

export default Photo;