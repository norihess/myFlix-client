//imports React into the file and allows you to create new instances
import React from 'react';
import { MovieView } from '../movie-view/movie-view';
import MainView from './components/main-view/main-view';
import MovieCard from './components/movie-card/movie-card';

//template or blueprint for creating new components
//export exposes the MainView component
export class MainView extends React.Component {
	// the place to initialize a state’s values
	constructor(){
		//initializes your component’s state
		super();
		this.state = {
			movies: [
				{_id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
				{_id: 2, Title: 'The Shawshank Redeption', Description: 'desc2...', ImagePath: '...'},
				{_id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
			]
		}
	}
// 	//returns the visual representation of the component
//   render() {
//     return (
//       <div className="main-view">
//         <div>Inception</div>
//         <div>The Shawshank Redemption</div>
//         <div>Gladiator</div>
//       </div>
//     );
//   }
// }
render() {
  const { movies, selectedMovie } = this.state;

  if (selectedMovie) return <MovieView movie={selectedMovie} />;

  if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <div className="main-view">
      <button onClick={() => {alert('Nice!')}}>Click me!</button>
      {movies.map(movie => 
				<MovieCard key={movie._id} 
					movie={movie} onClick={() => { 
						this.state.selectedMovie = movie; }} 
						/>)}
    </div>
  	);
	}
}
export class MainView extends React.Component{
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }
}

export default MainView;