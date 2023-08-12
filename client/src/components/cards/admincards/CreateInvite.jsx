import React, { useRef } from 'react';
import axios from 'axios';

const CreateInvite = ({ cardDiv, setInvitations, buttons }) => {
  const nameRef = useRef();
  const contactRef = useRef();
  const guestsRef = useRef();

  const columnClass = 'text-left w-[28rem] max-md:w-44';

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.name === 'name') {
      nameRef.current.value = e.target.value;
    } else if (e.target.name === 'contact') {
      contactRef.current.value = e.target.value;
    } else {
      guestsRef.current.value = e.target.value;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameRef.current.value && contactRef.current.value && guestsRef.current.value) {
      axios.post('/invitations/admin', {
          name: nameRef.current.value,
          contact: contactRef.current.value,
          guests: guestsRef.current.value,
          language: document.getElementById('english').checked
        })
        .then((response) => {
          setInvitations(response.data);
          nameRef.current.value = '';
          contactRef.current.value = '';
          guestsRef.current.value = '';
        })
        .catch((err) => {
          // Handle error
        })
    }
  }

  return (
    <div className={cardDiv}>
      <h1>Add Invitation</h1>
      <form>
        <table>
          <thead>
            <tr>
              <td className={columnClass}>Name</td>
              <td className={columnClass}>Contact</td>
              <td className={columnClass}>Guests</td>
              <td className={columnClass}>English?</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={columnClass}>
                <input name='name'
                       ref={nameRef}
                       onChange={handleChange}
                       className="w-full"/>
              </td>
              <td className={columnClass}>
                <input name='contact'
                       ref={contactRef}
                       onChange={handleChange}
                       className="w-full"/>
              </td>
              <td className={columnClass}>
                <input name='guests'
                       ref={guestsRef}
                       type='number'
                       min={1}
                       onChange={handleChange}
                       className="w-full"/>
              </td>
              <td className={columnClass}>
                <input id='english'
                       type='checkbox'
                       className="w-full"/>
              </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <input type='submit' className={buttons} onClick={handleSubmit}/>
      </form>
    </div>
  )
}

export default CreateInvite;