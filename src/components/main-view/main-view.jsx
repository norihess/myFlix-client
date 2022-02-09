import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component{
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  componentDidMount(){
    axios.get('https://nori-myflixdb.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      })
  }
	setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    axios.get('https://nori-myflixdb.herokuapp.com/users')
    .then(response => {
      this.setState({
        token: response.data.token
      });
    })
  }
  onRegistration(user){
    axios.post('https://nori-myflixdb.herokuapp.com/users')
    .then(response => {
      this.setState({
        token: response.data.token
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

	render() {
    const { movies, selectedMovie, user, register} = this.state;

    if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

    else if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    
    else if (movies.length === 0) return <div className="main-view"/>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => 
						{ this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => 
							{ this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}


export default MainView;