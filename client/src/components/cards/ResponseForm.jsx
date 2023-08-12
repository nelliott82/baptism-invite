import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ResponseForm = ({ cardDiv, buttons, invited, invitation, text }) => {
  const [display, setDisplay] = useState('hidden');
  const [error, setError] = useState(false);
  const [guestsArr, setGuestsArr] = useState([]);
  const [guests, setGuests] = useState(0);
  const [guestsError, setGuestsError] = useState('');
  const [attending, setAttending] = useState('-');
  const [attendingError, setAttendingError] = useState('');
  const [received, setReceived] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const nameRef = useRef();

  const errorStyling = 'font-mono text-base max-md:text-sm text-red-600 h-[2rem] max-md:h-[3rem] w-full'

  const handleChange = (e) => {
    e.preventDefault();
    setGuestsError('');
    setAttendingError('');

    if (e.target.name === 'guests') {
      setGuests(e.target.value);
    } else if (e.target.name === 'attending') {
      setAttending(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setDisabled(true);
    const pathname = window.location.pathname.split('/').filter(x => x);

    if (attending !== '-') {
      axios.put('/invitations/invitees', {
        uuid: pathname[1],
        guests,
        attending: attending === 'true' ? true : false
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
          setDisabled(false);
        });
    } else {
      setAttendingError('border-4 border-red-700 border-solid');
      setDisabled(false);
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
          <h1>{text.heading}</h1>
          <p className={errorStyling}>{error ? text.error : ''}</p>
          <form>
            <table>
              <tbody>
                <tr>
                  <td className='text-left'><label htmlFor='name'>{text.name}</label></td>
                  <td className='text-left w-full max-md:w-44'>
                    <input name='name'
                           ref={nameRef}
                           readOnly
                           className="w-full"/>
                  </td>
                </tr>
                <tr>
                  <td className='text-left'><label htmlFor='guests'>{text.guests}</label></td>
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
                  <td className='text-left'><label htmlFor='attending'>{text.attending}</label></td>
                  <td className='text-left w-full max-md:w-44'>
                    <select name='attending'
                            value={attending}
                            onChange={handleChange}
                            className={attendingError}
                            required>
                      <option value='-' >-</option>
                      <option value='true' >{text.yes}</option>
                      <option value='false' >No</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <br/>
            <input type='submit' className={buttons} onClick={handleSubmit} disabled={disabled} value={text.submitButton}/>
          </form>
        </>
        :
        <h1>{text.thankYou}</h1>
      }
    </div>
  )
}

export default ResponseForm;