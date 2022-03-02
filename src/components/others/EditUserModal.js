import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';



export default function EditUserModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ Username, setUsername ] = useState("");
    const [ Password, setPassword ] = useState("");
    const [ Email, setEmail ] = useState("");
    const [ BirthDate, setBirthDate ] = useState("");
    const navigate = useNavigate();

    useEffect( ()=> { 
      const token = localStorage.getItem('token')
      if(!token)  {
          navigate("/");
      }
      var user = localStorage.getItem('user')
      setUsername(user.Username);
      setPassword(user.Password);
      setEmail(user.Email);  
      setBirthDate(user.BirthDate);
    }, [])

    const handleSubmit = (e) => {
      e.preventDefault();
      
      axios.put(`https://notflixapi.herokuapp.com/users/${Username}`, 
      {Username, Password, Email, BirthDate},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response=>{
          if(response.status === 200)
          {
              alert('Profile edited successful!');
              navigate("/main");
          }
         
      })
      .catch(err=>console.log(err));
    };

    return (
        <>
          <button onClick={handleShow}>
            Edit Profile
          </button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               
            <Form>
      <Form.Group className="mb-3" controlId="formGroupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" disabled required value={Username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required value={Password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" required value={Email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" required value={BirthDate} onChange={e => setBirthDate(e.target.value)} />
      </Form.Group>
      <Button variant="danger" type="submit" onClick={handleSubmit}>Edit Profile</Button>
    </Form> 

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
