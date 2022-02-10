import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form'
import './registration-view.scss'

export function RegistrationView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');
  const [ Email, setEmail ] = useState('');
  const [ Birthday, setBirthday ] = useState('');
	
	const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    props.onRegistration({Username, Password, Email, Birthday});
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={Username} onChange={e => setUsername(e.target.value)} />
      </label>
      <br/><br/>
      <label>
        Password:
        <input type="password" value={Password} onChange={e => setPassword(e.target.value)} />
      </label>
      <br/><br/>
      <label>
        Email:
        <input type="Email" value={Email} onChange={e => setEmail(e.target.value)} />
      </label>
      <br/><br/>
      <label>
        Birthday:
        <input type="Birthday" value={Birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <br/><br/>
      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};