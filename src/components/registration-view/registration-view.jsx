import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

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
    <Container fluid = "md">
    <form>
      <Form.Group className="mb-3" controlId="formBasicUsername">
      <Form.Label>Username</Form.Label>
      <br/>
        <Form.Control type="text" value={Username} onChange={e => setUsername(e.target.value)} placeholder="Enter username"  />
      </Form.Group>
      <br/>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <br/>
        <Form.Control type="password" value={Password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"/>
      </Form.Group>
      <br/>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <br/>
        <input type="Email" value={Email} onChange={e => setEmail(e.target.value)} placeholder="Enter email"/>
      </Form.Group>
      <br/>
      <Form.Group>
      <Form.Label>Birthday</Form.Label>
      <br/>
        <input type="Birthday" value={Birthday} onChange={e => setBirthday(e.target.value)} placeholder="00/00/0000"/>
      </Form.Group>
      <br/>
      <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Register</Button>
    </form>
    </Container>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};