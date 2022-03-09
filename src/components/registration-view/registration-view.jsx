import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Form, Button, Container, Row, Col, Card, CardGroup} from 'react-bootstrap';

export function RegistrationView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');
  const [ Email, setEmail ] = useState('');
  const [ Birthday, setBirthday ] = useState('');
  const [ Values, setValues ] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  })

  //validate user inputs
const validate = () => {
  let isReq = true;
  if(!Username) {
    setValues({ Values, usernameErr: 'Username Required' });
    isReq = false;
  }else if(Username.length < 2){
    setValues ({Values, usernameErr:'Username must be 2 characters long'});
    isReq = false;
   }
  if(!Email){
    setValues ({Values, emailErr:'Must have a valid email'});
    isReq = false;
  }
  if(!Birthday){
    setValues ({Values, birthdayErr:'Birthday Required'})
    isReq = false;
  }
  if(!Password) {
    setValues ({Values, passwordErr:'Password Required'});
    isReq = false;
  } else if (Password.length < 6) {
    setValues ({Values, passwordErr: 'Password must be 6 characters long'});
    isReq = false;
  }
  return isReq;
}
	
const handleSubmit = (e) => {
  e.preventDefault();
  const isReq = validate();
  if (isReq) {
  /* Send a request to the server for authentication */
  axios.post(`https://nori-myflixdb.herokuapp.com/users`, {
    Username: Username,
    Password: Password,
    Email: Email,
    Birthday: Birthday
  })
  .then(response => {
    const data = response.data;
    console.log(data);
    alert('Registration successful, please login!');
    window.location.replace("/");
    // props.onLoggedIn(data);
  })
  .catch(e => {
    console.error(response);
    alert('unable to register');
    });
  }
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
              <Form className = "form" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <br/>
                <Form.Control type="text" value={Username} onChange={e => setUsername(e.target.value)} placeholder="Enter username"  />
                {Values.usernameErr && <p>{Values.usernameErr}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <br/>
                <Form.Control type="password" value={Password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"/>
                {Values.passwordErr && <p>{Values.passwordErr}</p>}
              </Form.Group>
             
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <br/>
                <Form.Control type="Email" value={Email} onChange={e => setEmail(e.target.value)} placeholder="Enter email"/>
                {Values.emailErr && <p>{Values.emailErr}</p>}
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formBasicBirthday">
              <Form.Label>Birthday</Form.Label>
              <br/>
                <Form.Control  type="birthday" value={Birthday} onChange={e => setBirthday(e.target.value)} placeholder="mth/d/yr"/>
                {Values.birthdayErr && <p>{Values.birthdayErr}</p>}
              </Form.Group>
              <br/>
              <Button variant="outline-primary" size ="lg" type="submit">Register</Button>
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