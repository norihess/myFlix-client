import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import './login-view.scss';

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
    <Container fluid = "md">
    <form>
      <Form.Group className="mb-3" controlId="formBasicUsername">
      <Form.Label>Username</Form.Label>
      <br/>
        <input type="text" value={Username} onChange={e => setUsername(e.target.value)}  placeholder="Enter username" />
      </Form.Group>
      <br/>
      <Form.Group className="mb-3" controlId="formBasicUsername">
      <Form.Label>Password</Form.Label>
      <br/>
        <input type="password" value={Password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"  />
      </Form.Group>
      <br/>
      <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Log in</Button>
			<Button variant="outline-primary" type="button" onClick={()=>window.location.replace("/register")}>Register</Button>
    </form>
    </Container>
  );
}


LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};