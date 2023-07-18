import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Responded = ({ cardDiv, invitations }) => {
  const [responded, setResponded] = useState([]);
  const [filter, setFilter] = useState('all');
  const columnClass = 'text-left w-[28rem] max-md:w-44';

  const handleFilter = (e) => {
    // e.preventDefault();

    if (e.target.value === 'all') {
      setResponded(invitations.filter(x => x.attending !== null));
      setFilter('all');
    } else if (e.target.value === 'yes') {
      setResponded(invitations.filter(x => x.attending));
      setFilter('yes');
    } else {
      setResponded(invitations.filter(x => x.attending === 0));
      setFilter('no');
    }
  }

  useEffect(() => {
    handleFilter({ target: { value: filter }});
  }, [invitations]);

  return (
    <div className={cardDiv}>
      <h1>Responded</h1>
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
          <td className={columnClass}>Guests Coming</td>
          <td className={columnClass}>Attending</td>
        </tr>
       </thead>
       <tbody>
        {responded.map((x, i) => {

          return (
            <tr key={x.uuid}>
              <td className={columnClass}>{x.name}</td>
              <td className={columnClass}>{x.contact}</td>
              <td className={columnClass}>{x.attending === 1 ? x.guestsResponse : '0'}</td>
              <td className={columnClass}>{x.attending === 1 ? 'Yes' : 'No'}</td>
            </tr>
          )
        })}
        <tr>
          <td/>
          <td className={columnClass}>Total Attending:</td>
          <td className={columnClass}>
            {invitations.reduce((accum, x) => {
              if (x.attending === 1) {
                accum = accum + parseInt(x.guestsResponse);
              }
              return accum;
            }, 0)}
          </td>
          <td/>
        </tr>
       </tbody>
      </table>
    </div>
  )
}

export default Responded;