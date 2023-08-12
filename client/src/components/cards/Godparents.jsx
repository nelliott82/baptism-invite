import React from 'react';

const Godparents = ({ text }) => {

  return (
    <div className='self-end'>
      <pre className={'themeFont'} >{text.country}</pre>
      <pre className={'themeFont'} >{text.names}</pre>
      <img className='w-[40vw] max-md:w-full' src={text.image} />
    </div>
  )
}

export default Godparents