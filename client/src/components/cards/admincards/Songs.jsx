import React, { useEffect } from 'react';

const Songs = ({ cardDiv, invitations }) => {
  const columnClass = 'text-left w-[28rem] max-md:w-44';

  useEffect(() => {
  }, [invitations]);

  return (
    <div className={cardDiv}>
      <h1>Songs</h1>
      <table>
       <thead>
        <tr>
          <td className={columnClass}>Name</td>
          <td className={columnClass}>Songs</td>
        </tr>
       </thead>
       <tbody>
        {invitations.map((x, i) => {
          if (x.attending === 1 && x.songs) {
            return (
              <tr key={x.uuid}>
                <td className={columnClass}>{x.name}</td>
                <td className={columnClass}>{x.songs}</td>
              </tr>
            )
          }
        })}
       </tbody>
      </table>
    </div>
  )
}

export default Songs;