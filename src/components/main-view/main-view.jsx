import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import MovieCard  from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { FavoritesModal, EditUserModal } from '../profile-view/profile-view';
import { Form, Button, Container, Row, Col, Card, CardGroup, Nav } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../others/Header';


export class MainView extends React.Component{
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false,
      show: false,
      favMovies: [],
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
  // componentDidMount(){
  //   axios.get('https://nori-myflixdb.herokuapp.com/movies')
  //     .then(response => {
  //       this.setState({
  //         movies: response.data
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }
  
	setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  
  getMovies(token) {
    axios.get(`https://nori-myflixdb.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  onRegistration(user){
    axios.post('https://nori-myflixdb.herokuapp.com/users', user)
    .then(response => {
      console.log(response.data)
      this.setState({
        user: response.data,
        register: false,
        login: true
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  setRegister = () => {
    this.setState({
      register: true
    })
  }

//   NavBar = () => {
//     return (
//       <Nav class="navbar navbar-default">
//   <div class="container-fluid">
//     <div class="navbar-header">
//       <a class="navbar-brand" href="#">MovieFlix</a>
//     </div>
//     <ul class="nav navbar-nav">
//     <li><a onClick={()=>{
//         window.location.replace("/");
//       }}>Edit Profile</a></li>
//     <li><a onClick={()=>this.setState({show: true})}>Favorite Movies</a></li>
//       <li><a onClick={()=>{
//         localStorage.setItem("user", "");
//         localStorage.setItem("token", "");
//         window.location.replace("/");
//       }}>Log out</a></li>
//     </ul>
//   </div>
// </Nav>
//     )
//   }

  MovieList = (props) =>
  {
    console.log(props);
  return (<div className="main-view">

    {/* <this.NavBar /> */}
    <Header />

    <Row className="main-view justify-content-md-center">
       { props.selectedMovie
           ? <MovieView movie={props.selectedMovie} onBackClick={newSelectedMovie => 
		 				{ props.setSelectedMovie(newSelectedMovie); }}/>
       : props.movies.map( movie => (
        <Col md={3}> <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => 
         { props.setSelectedMovie(movie) }}/>
         </Col>
     )) }
     </Row>
   </div>)
  }

	render() {
    const { movies, selectedMovie, register, token, user} = this.state;
    console.log(this.state)
    
    return (<BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginView onLoggedIn={(dt) => this.onLoggedIn(dt)} setRegister={this.setRegister} />} />
        <Route exact path="/register" element={<RegistrationView onRegistration={(register) => this.onRegistration(register)}/> } />
        <Route exact path="/movies" element={ <this.MovieList movies={movies} selectedMovie={selectedMovie} />}/>
      </Routes>
    </BrowserRouter>)

    // if (!token && !register) return <LoginView onLoggedIn={(user, password) => this.onLoggedIn(user, password)} setRegister={this.setRegister} />;

    // else if (register && !token) return <RegistrationView onRegistration={(register) => this.onRegistration(register)}/>;

    //  else return (
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