import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Container, Row, Col, Card, CardGroup} from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <CardGroup className ="movie">
      <Card>
      <Card.Body className="movie">
      <Card.Title>
        <h4 style={{cursor: 'pointer'}} onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</h4>
      </Card.Title>
      <br />
      <Card.Img variant="top" src={movie.ImagePath}/>
      </Card.Body> 
      </Card>
      </CardGroup>
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
