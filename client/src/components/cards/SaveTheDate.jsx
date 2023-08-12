import React from 'react';

const SaveTheDate = ({ cardDiv, text }) => {

  return (
    <div className={cardDiv}>
      <div>
        <pre className='themeFontM'>{text.parents}</pre>
        <br/>
        <pre className='themeFont'>{text.heading1}</pre>
        <pre className='themeFontL'>{text.baptism}</pre>
        <pre className='themeFont'>{text.heading2}</pre>
        <br/>
        <p className='names'>Ámbar Serene</p>
        <br/>
        <p className='themeFont'>{text.date}</p>
        <br/>
      </div>
    </div>
  )
}

export default SaveTheDate;