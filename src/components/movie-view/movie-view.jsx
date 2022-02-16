import React from 'react';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }
  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-poster">
          <img src={movie.ImagePath} max-width="350" max-height="350"/>
        </div>
        <br />
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <br />
        <Button variant="outline-primary" size ="lg" type="button" class= "movie-btn"onClick ={() => {onBackClick(null);}}>Back</Button>
      </div>
    );
  }
}


{/* <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} width="350" height="350"/>
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <br />
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <br />
        <Button variant="outline-primary" size ="lg" type="button" onClick ={() => {onBackClick(null);}}>Back</Button>
      </div> */}