import React, { useState, useEffect } from 'react';
import Admin from './cards/Admin.jsx';
import Background from './cards/Background.jsx';
import SaveTheDate from './cards/SaveTheDate.jsx';
import PhotoReel from './cards/PhotoReel.jsx';
import Ceremony from './cards/Ceremony.jsx';
import Reception from './cards/Reception.jsx';
import GeneralInfo from './cards/GeneralInfo.jsx';
import ResponseForm from './cards/ResponseForm.jsx';
import axios from 'axios';

const App = () => {
  const [access, setAccess] = useState(true);
  const [display, setDisplay] = useState('hidden');
  const [login, setLogin] = useState(true);
  const [invited, setInvited] = useState(false);
  const [invitation, setInvitation] = useState({});
  const cardDiv = 'relative bg-green-200 bg-opacity-50 hover:bg-opacity-75 w-10/12 inline-block text-center p-5 mb-12';
  const buttons = 'rounded-full bg-emerald-50 hover:bg-emerald-200 inline-block text-base px-2.5 py-1';

  useEffect(() => {
    const pathname = window.location.pathname.split('/').filter(x => x);
    if (pathname[0] === 'admin') {
      axios.get(`/invitations/admin/verify/${pathname[1]}`)
      .then((response) => {
        setDisplay('');
        setLogin(response.data.login);
      })
      .catch((err) => {
        setAccess(false);
      });
    } else if (pathname[0] === 'invited') {
      setAccess(false);
      axios.get(`/invitations/invitees/${pathname[1]}`)
        .then((response) => {
          if (response.data.valid) {
            setInvited(true);
            setInvitation(response.data);
          }
        })
        .catch((err) => {

        });
    } else {
      setAccess(false);
    }
  }, []);

  return (
    <>
      <div className='relative'>
        <Background/>
        <div id='content' className='flex flex-wrap flex-col pt-16 relative overflow-y justify-center content-center overflow-y-scroll'>
          {access ?
            <>
              <Admin display={display}
                     login={login}
                     setLogin={setLogin}
                     cardDiv={cardDiv}
                     buttons={buttons} />
            </>
          :
            <>
              <SaveTheDate cardDiv={cardDiv} />
              <PhotoReel cardDiv={cardDiv} />
              <Ceremony cardDiv={cardDiv} buttons={buttons} />
              <Reception cardDiv={cardDiv} buttons={buttons} />
              <GeneralInfo cardDiv={cardDiv} />
              <ResponseForm cardDiv={cardDiv}
                            buttons={buttons}
                            invited={invited}
                            invitation={invitation} />
            </>
          }
        </div>
        <a href='https://dryicons.com/free-icons/church'> Icon by Dryicons </a>
        <a href='https://www.vecteezy.com/free-vector/line-break'>Line Break Vectors by Vecteezy</a>
      </div>
    </>
  )
}

export default App;