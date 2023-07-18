import React from 'react';
import Gifts from './Gifts.jsx';
import Dress from './Dress.jsx';

const GeneralInfo = ({ cardDiv }) => {

  return (
    <div className={`themeFont ${cardDiv}`}>
      <h1>General Info</h1>
      <br/>
      <Gifts/>
      <div className="flex flex-row flex-nowrap justify-evenly content-evenly">
        <img src="./assets/linebreak.png" className="w-[60vw]"/>
      </div>
      <Dress/>
    </div>
  )
}

export default GeneralInfo;