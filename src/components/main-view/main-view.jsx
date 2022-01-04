//imports React into the file and allows you to create new instances
import React from 'react';
//template or blueprint for creating new components
//export exposes the MainView component
export class MainView extends React.Component {

	//returns the visual representation of the component
  render() {
    return (
      <div className="main-view">
        <div>Inception</div>
        <div>The Shawshank Redemption</div>
        <div>Gladiator</div>
      </div>
    );
  }
}

export default MainView;