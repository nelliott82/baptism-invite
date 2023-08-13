import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Invitations = ({ cardDiv, invitations, setInvitations, text }) => {
  const [filteredInvites, setFilteredInvites] = useState([]);
  const [filter, setFilter] = useState('all');
  const columnClass = 'text-left w-[28rem] max-md:w-44';

  const handleFilter = (e) => {

    if (e.target.value === 'all') {
      setFilteredInvites(invitations);
    } else if (e.target.value === 'yes') {
      setFilteredInvites(invitations.filter(x => x.attending));
    } else {
      setFilteredInvites(invitations.filter(x => x.attending === null));
    }

    setFilter(e.target.value);
  }

  const handleDelete = (e, id) => {
    e.preventDefault();

    axios.delete(`/invitations/admin/${id}`)
      .then((response) => {
        const invitationsFiltered = invitations.filter(x => x.id !== id);
        setInvitations(invitationsFiltered);
      })
      .catch((err) => {
        // Handle Error
      })
  }

  useEffect(() => {
    handleFilter({ target: { value: filter }});
  }, [invitations]);

  return (
    <div className={cardDiv}>
      <h1>Invitations</h1>
      <label htmlFor='filter'>Filter:</label>
      <select onChange={handleFilter}>
        <option value='all' >All</option>
        <option value='yes' >Yes</option>
        <option value='no' >No</option>
      </select>
      <table>
       <thead>
        <tr>
          <td className={columnClass}>Name</td>
          <td className={columnClass}>Contact</td>
          <td className={columnClass}>Guests</td>
          <td className={columnClass}>Invitation Link</td>
          <td className={columnClass}>Responded</td>
          <td className={columnClass}>Delete</td>
        </tr>
       </thead>
       <tbody>
        {filteredInvites.map((x, i) => {
          let whatsAppMessage = `${text.message}https://${window.location.host}/invited/${x.uuid}`

          return (
            <tr key={x.uuid}>
              <td className={columnClass}>{x.name}</td>
              <td className={columnClass}>{x.contact}</td>
              <td className={columnClass}>{x.guests}</td>
              <td className={columnClass}>
                <a href={`https://api.whatsapp.com/send/?phone=${x.contact}&text=${encodeURIComponent(whatsAppMessage)}`} target='_blank'>
                  <u>Link</u>
                </a>
              </td>
              <td className={columnClass}>{x.attending !== null ? 'Yes' : 'No'}</td>
              <td className='text-center' onClick={(e) => handleDelete(e, x.id)}>
                <p className='cursor-pointer'>X</p>
              </td>
            </tr>
          )
        })}
        <tr>
          <td/>
          <td className={columnClass}>Total Invited:</td>
          <td className={columnClass}>
            {filteredInvites.reduce((accum, x) => {
              accum = accum + parseInt(x.guests);
              return accum;
            }, 0)}
          </td>
          <td/>
          <td/>
          <td/>
        </tr>
       </tbody>
      </table>
    </div>
  )
}

export default Invitations;