import React, { useState, useEffect, useRef } from 'react';
import Spotify from './Spotify.jsx';
import axios from 'axios';

const ResponseForm = ({ cardDiv, buttons, invited, invitation }) => {
  const [display, setDisplay] = useState('hidden');
  const [error, setError] = useState(false);
  const [guestsArr, setGuestsArr] = useState([]);
  const [guests, setGuests] = useState(0);
  const [guestsError, setGuestsError] = useState('');
  const [attending, setAttending] = useState('-');
  const [attendingError, setAttendingError] = useState('');
  const [spotify, setSpotify] = useState('-');
  const [received, setReceived] = useState(false);
  const nameRef = useRef();
  const songsRef = useRef();

  const errorStyling = 'font-mono text-base max-md:text-sm text-red-600 h-[2rem] max-md:h-[3rem] w-full'

  const handleChange = (e) => {
    e.preventDefault();
    setGuestsError('');
    setAttendingError('');

    if (e.target.name === 'guests') {
      setGuests(e.target.value);
    } else if (e.target.name === 'attending') {
      setAttending(e.target.value);
    } else if (e.target.name === 'songs') {
      songsRef.current.value = e.target.value;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    const pathname = window.location.pathname.split('/').filter(x => x);

    if (attending !== '-') {
      axios.put('/invitations/invitees', {
        uuid: pathname[1],
        guests,
        attending: attending === 'true' ? true : false,
        songs: songsRef.current.value,
      })
        .then((response) => {
          setReceived(true);
        })
        .catch((err) => {
          if (err.response.data.errno === 3819) {
            setGuestsError('border-4 border-red-700 border-solid');
          } else {
            setError(true);
          }
        });
    } else {
      setAttendingError('border-4 border-red-700 border-solid');
    }
  }

  useEffect(() => {
    if (invited) {
      setDisplay('');

      nameRef.current.value = invitation.name;
      setGuests(parseInt(invitation.guests));
      setGuestsArr(new Array(parseInt(invitation.guests) + 1).fill(0));
    }

  }, [invited]);

  return (
    <div className={`themeFont ${cardDiv} ${display}`}>
      {!received ?
        <>
          <h1>Response</h1>
          {/* <br/> */}
          <p className={errorStyling}>{error ? 'Oops! Something went wrong. Please try again.' : ''}</p>
          <form>
            <table>
              <tbody>
                <tr>
                  <td className='text-left'><label htmlFor='name'>Name:</label></td>
                  <td className='text-left w-full max-md:w-44'>
                    <input name='name'
                           ref={nameRef}
                           readOnly
                           className="w-full"/>
                  </td>
                </tr>
                <tr>
                  <td className='text-left'><label htmlFor='guests'>Guests:</label></td>
                  <td className='text-left w-full max-md:w-44'>
                    <select name='guests'
                            value={guests}
                            className={guestsError}
                            onChange={handleChange}>
                      {guestsArr.map((x, i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className='text-left'><label htmlFor='attending'>Attending:</label></td>
                  <td className='text-left w-full max-md:w-44'>
                    <select name='attending'
                            value={attending}
                            onChange={handleChange}
                            className={attendingError}
                            required>
                      <option value='-' >-</option>
                      <option value='true' >Yes</option>
                      <option value='false' >No</option>
                    </select>
                  </td>
                </tr>
                <Spotify attending={attending} songsRef={songsRef} handleChange={handleChange} buttons={buttons} />
              </tbody>
            </table>
            <br/>
            <input type='submit' className={buttons} onClick={handleSubmit}/>
          </form>
        </>
        :
        <h1>Thank you!</h1>
      }
    </div>
  )
}

export default ResponseForm;