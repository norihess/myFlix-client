import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {Form, Button, Container, Row, Col, Card, CardGroup} from 'react-bootstrap';

export function RegistrationView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Username, setUsernameErr ] = useState('');
  const [ Password, setPassword ] = useState('');
  const [ Password, setPasswordErr ] = useState('');
  const [ Email, setEmail ] = useState('');
  const [ Email, setEmailErr ] = useState('');
  const [ Birthday, setBirthday ] = useState('');
  const [ Birthday, setBirthdayErr ] = useState('');

  //validate user inputs
const validate = () => {
  let isReq = true;
  if(!username) {
    setUsernameErr ('Username Required');
    isReq = false;
  }
  if(!email){
    setEmailErr ('Must have a valid email');
    isReq = false;
  }
  if(!birdthday){
    setBirthdayErr('Birthday Required')
    isReq = false;
  }
  if(!password) {
    setPasswordErr ('Password Required');
    isReq = false;
  } else if (password.legth < 6) {
    setPasswordErr ('Password must be 6 characters long');
    isReq = false;
  }
  return isReq;
}
	
	const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday);
    /* Send a request to the server for authentication */
    /* then call props on registored user(username) */
    props.onRegistration({Username, Password, Email, Birthday});
  };
//style={{ background: 'linear-gradient(to bottom right, rgb(75, 164, 248), rgb(194, 231, 252))', marginTop: '20px'}}
  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card className = "reg">
              <Card.Body className = "reg">
              <Card.Title><h2>REGISTER NOW</h2></Card.Title>
              <Form className = "form">
              <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <br/>
                <Form.Control type="text" value={Username} onChange={e => setUsername(e.target.value)} placeholder="Enter username"  />
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <br/>
                <Form.Control type="password" value={Password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"/>
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>
             
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <br/>
                <Form.Control type="Email" value={Email} onChange={e => setEmail(e.target.value)} placeholder="Enter email"/>
                {emailErr && <p>{emailErr}</p>}
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formBasicBirthday">
              <Form.Label>Birthday</Form.Label>
              <br/>
                <Form.Control  type="birthday" value={Birthday} onChange={e => setBirthday(e.target.value)} placeholder="mth/d/yr"/>
                {birthdayErr && <p>{birthdayErr}</p>}
              </Form.Group>
              <br/>
              <Button variant="outline-primary" size ="lg" type="submit" onClick={handleSubmit}>Register</Button>
              <Button variant="outline-primary" size ="lg" type="button" onClick={()=>window.location.replace("./")}>Login</Button>
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