import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Container, Row, Col, Card, CardGroup} from 'react-bootstrap';
import axios from 'axios';

export class MovieCard extends React.Component {
  state={
    genre: ''
  }

  fetchGenre = (genre) => {
    axios.get(`https://nori-myflixdb.herokuapp.com/genre/${genre}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
    })
    .then(response => {
      console.log(response.data)
      // Assign the result to the state
    this.setState({
      genre: response.data
    });
    //modal code
    let str = "Genre: " + this.state.genre.Name +"\n"
    + "Description: " + this.state.genre.Description;
    alert(str)
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }
 
  fetchDirector = (director) => {
    axios.get(`https://nori-myflixdb.herokuapp.com/director/${director}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
    })
    .then(response => {
      console.log(response.data)
      // Assign the result to the state
    this.setState({
      director: response.data
    });
    //modal code
    let str = "Director: " + this.state.director.Name +"\n"
    + "Bio: " + this.state.director.Bio +"\n" 
    + "Birth Year: " + this.state.director.Birth +"\n" 
    + "Dead or Alive?: " + this.state.director.Death;
    alert(str)
    })
    .catch(function (error) {
      console.log(error);
    });

   }


  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <CardGroup className ="movie">
      <Card style={{width: '450px', height: '550px', overflow: 'hidden', marginBottom: '20px'}} >
      <Card.Body className="movie">
      <Card.Title>
        <h4 style={{cursor: 'pointer'}} onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</h4>
      </Card.Title>
      <br />
      <Card.Img variant="top" src={movie.ImagePath}/>
      <p><b>Director:</b><a href="#" onClick={() => this.fetchDirector(movie.Director.Name)}>{movie.Director.Name}</a></p>
      <p><b>Genre:</b> <a href="#" onClick={() => this.fetchGenre(movie.Genre.Name)}>{movie.Genre.Name}</a></p>
      <p>{movie.Description}</p>
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
