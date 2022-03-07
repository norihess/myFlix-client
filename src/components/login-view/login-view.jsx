import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

//validate user inputs
const validate = () => {
  let isReq = true;
  if(!Username) {
    setUsernameErr ('Username Required');
    isReq = false;
  }else if(Username.length < 2){
    setUsernameErr('Username must be 2 characters long');
    isReq = false;
   }
  if(!Password) {
    setPasswordErr ('Password Required');
    isReq = false;
  } else if (Password.length < 6) {
    setPasswordErr ('Password must be 6 characters long');
    isReq = false;
  }
  return isReq;
}
// onLoggedIn
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
    /* Send a request to the server for authentication */
    axios.post("https://nori-myflixdb.herokuapp.com/login", {Username, Password})
    .then(response => {
      console.log(response)
      const data = response.data;
      console.log(data)
      props.onLoggedIn(data);
      //window.location.replace("/movies")
    })
    .catch(e => {
      console.log('no such user')
    });
  };
};
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(Username, Password);
  //   /* Send a request to the server for authentication */
  //   /* then call props.onLoggedIn(username) */
  //   props.onLoggedIn(Username, Password);
  // };

  return (
    <Container>
      <Row>
        <Col>
        <CardGroup>
         <Card className = "log">
            <Card.Body className = "log">
            <Card.Title><h2>LOGIN</h2></Card.Title>
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <br/>
                <Form.Control type="text" value={Username} onChange={e => setUsername(e.target.value)}  placeholder="Enter username" />
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>
              <br/>
              <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <br/>
                <Form.Control type="password" value={Password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"  />
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>
              <br/>
              <Button variant="outline-primary" size ="lg" type="submit" >Log in</Button>
              <Button variant="outline-primary" size ="lg" type="button" onClick={()=>window.location.replace("/register")}>Register</Button>
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