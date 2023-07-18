import React from 'react';
import Countdown from './Countdown.jsx';

const SaveTheDate = ({ cardDiv }) => {

  return (
    <div className={cardDiv}>
      <div>
        <p className="themeFont">Save The Date</p>
        <br/>
        <p className="names">John & Jane</p>
        <br/>
        <p className="themeFont">March 12th, 2024</p>
        <br/>
        <Countdown/>
      </div>
    </div>
  )
}

export default SaveTheDate;