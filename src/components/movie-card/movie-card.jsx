import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Container, Row, Col, Card, CardGroup} from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <Card>
      <Card.Body>
      <Card.Title>
        <h4 style={{cursor: 'pointer'}} onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</h4>
      </Card.Title>
      <br />
      <img src={movie.ImagePath} width="250" height="250" ></img>
      </Card.Body> 
      </Card>
     
    );
  }
}

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: []
//     })
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired
// };
