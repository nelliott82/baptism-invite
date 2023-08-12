import React, { useState, useEffect } from 'react';
import Languages from '../Languages.js';
import Loading from './cards/Loading.jsx';
import Admin from './cards/Admin.jsx';
import Background from './cards/Background.jsx';
import SaveTheDate from './cards/SaveTheDate.jsx';
import Photo from './cards/Photo.jsx';
import GodparentContainer from './cards/GodparentContainer.jsx';
import Baptism from './cards/Baptism.jsx';
import ResponseForm from './cards/ResponseForm.jsx';
import axios from 'axios';

const App = () => {
  const [access, setAccess] = useState(true);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(Languages.Spanish);
  const [display, setDisplay] = useState('hidden');
  const [login, setLogin] = useState(true);
  const [invited, setInvited] = useState(false);
  const [invitation, setInvitation] = useState({});
  const cardDiv = 'relative w-full inline-block text-center p-5';
  const adminCardDiv = 'relative rounded-md bg-amber-800 bg-opacity-60 hover:bg-opacity-75 w-10/12 inline-block text-center p-5 mb-12 mt-16';
  const photoCardDiv = 'relative w-full inline-block text-center';
  const buttons = 'rounded-full bg-amber-100 hover:bg-amber-500 inline-block text-base px-2.5 py-1';

  const handleClick = (choice) => {
    setLanguage(Languages[choice]);
  }

  useEffect(() => {
    const pathname = window.location.pathname.split('/').filter(x => x);
    if (pathname[0] === 'admin') {
      setDisplay('');
      axios.get(`/invitations/admin/verify/${pathname[1] || 123}`)
      .then((response) => {
        setLogin(response.data.login);
        setLoading(false);
      })
      .catch((err) => {
        setLogin(true);
        setLoading(false);
      });
    } else if (pathname[0] === 'invited') {
      setAccess(false);
      if (pathname[1] === process.env.UUID) {
        setLoading(false);
      } else {
        axios.get(`/invitations/invitees/${pathname[1]}`)
          .then((response) => {
            if (response.data.valid) {
              setInvited(true);
              setInvitation(response.data);
              setLoading(false);
              if (response.data.language) {
                setLanguage(Languages.English);
              }
            }
          })
          .catch((err) => {
            window.location.assign(`https://www.google.com/`);
          });
        }
    } else {
      window.location.assign(`https://www.google.com/`);
    }
  }, []);

  return (
    <>
      <div className='relative'>
        <Background/>
        {loading ?
          <Loading/>
          :
          <>
            <div id='content' className='flex flex-wrap flex-col pt-0 relative overflow-y justify-center content-center overflow-y-scroll'>
              {access ?
                <>
                  <Admin display={display}
                        login={login}
                        setLogin={setLogin}
                        cardDiv={adminCardDiv}
                        buttons={buttons} />
                </>
              :
                <>
                  <div className='w-[7rem] fixed top-0 right-0 p-2 bg-slate-200 bg-opacity-50 z-10 flex justify-evenly'>
                    <span className='hover:cursor-pointer' onClick={() => handleClick('English')}>🇺🇸<u>{language.english}</u></span>
                    <span> </span>
                    <span className='hover:cursor-pointer' onClick={() => handleClick('Spanish')}>🇵🇾<u>{language.spanish}</u></span>
                  </div>
                  <Photo cardDiv={photoCardDiv} photo={process.env.FAMILY_PHOTO} />
                  <SaveTheDate cardDiv={cardDiv} text={language.SaveTheDate} />
                  <Photo cardDiv={photoCardDiv} photo={process.env.AMBAR_PHOTO} />
                  <GodparentContainer cardDiv={cardDiv} text={language.Godparents} />
                  <Baptism cardDiv={cardDiv} buttons={buttons} text={language.Baptism} />
                  <Photo cardDiv={photoCardDiv} photo={process.env.BARBIE_PHOTO} />
                  <ResponseForm cardDiv={cardDiv}
                                buttons={buttons}
                                invited={invited}
                                invitation={invitation}
                                text={language.ResponseForm} />
                </>
              }
            </div>
            <a href='https://dryicons.com/free-icons/church'> Icon byd Dryicons </a>
          </>
        }
      </div>
    </>
  )
}

export default App;