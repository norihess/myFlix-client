import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

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
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
              <Card.Title><h2>REGISTER NOW!</h2></Card.Title>
              <Form className = "form">
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
                <Form.Control type="Email" value={Email} onChange={e => setEmail(e.target.value)} placeholder="Enter email"/>
              </Form.Group>
              <br/>
              <Form.Group className="mb-3" controlId="formBasicBirthday">
              <Form.Label>Birthday</Form.Label>
              <br/>
                <Form.Control  type="birthday" value={Birthday} onChange={e => setBirthday(e.target.value)} placeholder="00/00/0000"/>
              </Form.Group>
              <br/>
              <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Register</Button>
              </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};