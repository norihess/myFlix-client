import React from 'react';

export class MovieCard extends React.Component {
  render() {
	const { movies } = this.state;

  if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <div className="main-view">
      {movies.map(movie => <MovieCard />)}
    </div>
  	);
	}
}
