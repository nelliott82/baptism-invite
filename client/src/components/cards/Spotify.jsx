import React, { useState } from 'react';

const Spotify = ({ attending, songsRef, handleChange }) => {
  const [spotify, setSpotify] = useState(false);

  const handleSpotifyChange = (e) => {
    e.preventDefault();

    if (e.target.value === 'yes') {
      setSpotify(true);
    } else {
      setSpotify(false);
    }
  }

  return (
    <>
      {attending === 'true' ?
        <>
          <tr>
            <td className='text-left'><label htmlFor='songs'>Do you have a Spotify Account?</label></td>
            <td className='text-left w-full max-md:w-44'>
              <select onChange={handleSpotifyChange} defaultValue="-">
                <option disabled value="-">-</option>
                <option value='yes' >Yes</option>
                <option value='no' >No</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className='text-left'><label htmlFor='songs'>Songs that make me dance:</label></td>
            <td className='text-center w-full max-md:w-44'>
              {spotify ?
                <a className='font-mono max-md:text-base' href={process.env.SPOTIFY} target='_blank'>
                  <u>Click here to add songs to our reception spotify playlist</u>
                </a>
                :
                <textarea name='songs'
                          ref={songsRef}
                          onChange={handleChange}
                          className='w-full'/>
              }
            </td>
          </tr>
        </>
        :
        null
      }
    </>
  )
}

export default Spotify;