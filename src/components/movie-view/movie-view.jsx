import React from 'react';
import axios from 'axios';
import './movie-view.scss';

import { Form, Button, Container, Row, Col, Card, CardGroup, Nav } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
      <Card style={{width: '450px'}}>
        <Card.Img variant="top" src={movie.ImagePath}/>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button variant="outline-primary" size ="lg" type="button" onClick ={() => {onBackClick(null);}}>Back</Button>
          <Button variant="outline-primary" size ="lg" type="button" onClick ={() => {onClick(null);}}>Add to Favorites</Button>
        </Card.Body>
      </Card>
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