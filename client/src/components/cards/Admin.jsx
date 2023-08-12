import React, { useState, useEffect } from 'react';
import LoginForm from './admincards/LoginForm.jsx';
import Navbar from './admincards/Navbar.jsx';
import CreateInvite from './admincards/CreateInvite.jsx';
import Invitations from './admincards/Invitations.jsx';
import Responded from './admincards/Responded.jsx';
import axios from 'axios';

const Admin = ({ display, login, setLogin, text, cardDiv, buttons }) => {
  const [invitations, setInvitations] = useState([]);

  const getInvitations = () => {
    const pathname = window.location.pathname.split('/').filter(x => x);

    axios.get(`/invitations/admin/${pathname[1]}`)
      .then((response) => {
        setInvitations(response.data);
      })
      .catch((err) => {
        // Handle Error
      })
  }

  useEffect(() => {
    if (!login) {
      getInvitations();
    }
  }, [display, login]);

  return (
    <div className={`${display} mt-8 flex flex-col flex-wrap justify-center content-center`}>
      {login ?
        <div className={cardDiv}>
          <LoginForm setLogin={setLogin} getInvitations={getInvitations} buttons={buttons} />
        </div>
        :
        <>
          <Navbar/>
          <CreateInvite cardDiv={cardDiv} setInvitations={setInvitations} buttons={buttons} />
          <Invitations cardDiv={cardDiv} invitations={invitations} setInvitations={setInvitations} text={text} />
          <Responded cardDiv={cardDiv} invitations={invitations} />
        </>
      }
    </div>
  )
}

export default Admin;