import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
import { useNavigate } from 'react-router-dom';


export default function FavoritesModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
          <button onClick={handleShow}>
            View Favorite Movies
          </button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Favorites</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    props.favMovies.map((movie, index) => (
                        <MovieCard className="movieCard" key={index} movie={movie} />
                    ))
                }
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
