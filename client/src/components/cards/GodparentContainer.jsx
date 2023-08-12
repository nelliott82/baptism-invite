import React from 'react';
import Godparents from './Godparents.jsx';

const GodparentContainer = ({ cardDiv, text }) => {

  return (
    <div className={`themeFont ${cardDiv}`}>
      <h1 className='themeFontM' >{text.heading}</h1>
      <br/>
      <div>
        <div className='themeFont h-full w-full flex flex-row max-md:flex-col flex-nowrap max-md:flex-wrap justify-around content-around'>
          <Godparents text={text.godparents1} />
          <br/>
          <Godparents text={text.godparents2} />
        </div>
      </div>
    </div>
  )
}

export default GodparentContainer;