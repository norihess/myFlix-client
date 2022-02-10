import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import './login-view.scss'

export function LoginView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(Username, Password);
  };

  return (
    <form>
      <FloatingLabel>
        Username:
        <input type="text" value={Username} onChange={e => setUsername(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel>
        Password:
        <input type="password" value={Password} onChange={e => setPassword(e.target.value)} />
      </FloatingLabel>
      <button variant="outline-primary" type="submit" onClick={handleSubmit}>Log in</button>
			<button variant="outline-primary" type="button" onClick={()=>window.location.replace("/register")}>Register</button>
    </form>
  
//   controlId="floatingInput"
//   label="Email address"
//   className="mb-3"
// >
//   <Form.Control type="email" placeholder="name@example.com" />
// </FloatingLabel>
// <FloatingLabel controlId="floatingPassword" label="Password">
//   <Form.Control type="password" placeholder="Password" />
// </FloatingLabel>
    
  );
}
LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};