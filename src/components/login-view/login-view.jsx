import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

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
    <Container>
      <Row>
        <Col>
        <CardGroup>
         <Card className = "loCard">
            <Card.Body className = "loBody">
            <Card.Title><h2>LOGIN</h2></Card.Title>
            <form>
              <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <br/>
                <Form.Control type="text" value={Username} onChange={e => setUsername(e.target.value)}  placeholder="Enter username" />
              </Form.Group>
              <br/>
              <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <br/>
                <Form.Control type="password" value={Password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"  />
              </Form.Group>
              <br/>
              <Button variant="outline-primary" size ="lg" type="submit" onClick={handleSubmit}>Log in</Button>
              <Button variant="outline-primary" size ="lg" type="button" onClick={()=>props.setRegister()}>Register</Button>
              </form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
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