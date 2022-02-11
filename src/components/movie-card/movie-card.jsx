import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Container, Row, Col, Card, CardGroup} from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <Card>
      <Card.Body style={{ background: 'grey'}} >
      <Card.Title>
        <h2 onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</h2>
      </Card.Title>
      <br />
      <img src={movie.ImagePath} width="250" height="250" ></img>
      {/* <p>{movie.Description.substring(0, 10)}</p> */}
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
