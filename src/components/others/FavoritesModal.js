import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
import { useNavigate } from 'react-router-dom';


export default function FavoritesModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token)  {
            navigate("/");
        }
        var user = localStorage.getItem('user');
        axios
        .get(`https://nori-myflixdb.herokuapp.com/users/${user.Username}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => {
          console.log(res.data.FavoriteMovies)
           setMovies(res.data.FavoriteMovies);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);

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
                    movies.map((movie, index) => (
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
