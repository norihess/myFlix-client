//imports React into the file and allows you to create new instances
import React from 'react';

export class MovieCard extends React.Component {
  render() {
    return <div className="movie-card">some title</div>;
  }
}

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
  const { movies } = this.state;

  if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <div className="main-view">
      {movies.map(movie => <div key={movie._id}>{movie.Title}</div>)}
    </div>
  	);
	}
}

export default MainView;