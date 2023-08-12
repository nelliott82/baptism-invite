import React, { useState, useRef } from 'react';
import axios from 'axios';

const LoginForm = ({ setLogin, getInvitations, buttons }) => {
  const [incorrect, setIncorrect] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    setIncorrect('');

    if (e.target.name === 'email') {
      emailRef.current.value = e.target.value;
    } else if (e.target.name === 'password') {
      passwordRef.current.value = e.target.value;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const pathname = window.location.pathname.split('/').filter(x => x);

    if (passwordRef.current.value.length > 5) {
      axios.put(`/invitations/admin/login`, {
        uuid: pathname[1],
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
        .then((response) => {
          setLogin(false);
          getInvitations();
        })
        .catch((err) => {
          if (err === 'Incorrect Password') {
            setIncorrect('border-4 border-red-700 border-solid');
          } else {
            window.location.assign(`https://www.google.com/`);
          }
        })
    } else {
      setIncorrect('border-4 border-red-700 border-solid');
    }
  }

  return (
    <div>
      <form>
        <label htmlFor='email'>Email</label>
        <input type='email'
               ref={emailRef}
               onChange={handleChange}
               name='email'></input>
        <br/>
        <label htmlFor='password'>Password</label>
        <input type='password'
               ref={passwordRef}
               onChange={handleChange}
               className={incorrect}
               name='password'></input>
        <br/>
        <br/>
        <input type='submit' className={buttons} onClick={handleSubmit}/>
      </form>
    </div>
  )
}

export default LoginForm;