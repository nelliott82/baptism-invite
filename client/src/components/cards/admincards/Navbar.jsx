import React from 'react';
import axios from 'axios';

const Navbar = ({ cardDiv }) => {

  const handleLogout = (e) => {
    e.preventDefault();
    const pathname = window.location.pathname.split('/').filter(x => x);

    axios.put(`/invitations/admin/logout`, { uuid: pathname[1] })
      .then((response) => {
        window.location.assign(`http://${window.location.host}`);
      })
      .catch((err) => {
        // Handle Error
      })
  }

  return (
    <nav className='fixed top-0 left-0 right-0 bg-white shadow-lg z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <div className='text-center'>
            <span className='text-lg font-semibold'>ADMIN</span>
          </div>
          <div>
            <a href={`/invited/${process.env.UUID}`} className='mr-4'><u>Main Page</u></a>
            <span onClick={handleLogout} className='mr-4 cursor-pointer'><u>Logout</u></span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;