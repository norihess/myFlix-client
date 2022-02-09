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
      register: false,
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

  onLoggedIn(username, pass) {
    console.log(username, pass)
    axios.post(`https://nori-myflixdb.herokuapp.com/login?Username=${username}&Password=${pass}`)
    .then(response => {
      console.log(response)
      this.setState({
        token: response.data.token
      });
    })
  }
  onRegistration(user){
    axios.post('https://nori-myflixdb.herokuapp.com/users', user)
    .then(response => {
      console.log(response.data)
      this.setState({
        user: response.data,
        register: true
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

	render() {
    const { movies, selectedMovie, user, register, token} = this.state;
    console.log(this.state)

    if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

    else if (register) return <LoginView onLoggedIn={(user, pass) => this.onLoggedIn(user, pass)} />;

    else if (token) return (
      <div className="main-view">
        {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => 
							{ this.setSelectedMovie(movie) }}/>
          ))
        }
      </div> )

    // if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

    // else if (register) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    
    // // else if (movies.length === 0) return <div className="main-view"/>;

    // else return (
    //   <div className="main-view">
    //     {selectedMovie
    //       ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => 
		// 				{ this.setSelectedMovie(newSelectedMovie); }}/>
    //       : movies.map(movie => (
    //         <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => 
		// 					{ this.setSelectedMovie(movie) }}/>
    //       ))
    //     }
    //   </div>
    // );
  }
}


export default MainView;