import React from 'react';

const Dress = ({ cardDiv }) => {

  return (
    <div>
      <p>Dress</p>
      <div className="flex flex-row max-md:flex-col flex-nowrap max-md:flex-wrap justify-evenly content-evenly">
        <img src="./assets/dress.png" className="w-[35vw] max-md:w-[33vw] self-center"/>
        <div style={{'fontSize': '1.25rem', 'alignSelf': 'center'}}>
          <p>
            We want you to feel comfortable and look elegant. Whatever you have that meets both criteria is fine with us.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dress;