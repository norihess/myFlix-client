import React from 'react';
import axios from 'axios';
import './profile-view.scss';


export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userDetails: [],
        validated: false,
        Username: '',
        Password: '',
        email: '',
        Birthdate: '',
        FavoriteMovies: [],
        modalState: false
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
        this.updateUserDetails = this.updateUserDetails.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteUserDetails = this.deleteUserDetails.bind(this);
  }


  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }

	
	
  getUserDetails(token) {
    axios.get(`https://nori-myflixdb.herokuapp.com/users/${this.props.user}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).then(response => {
        this.setState({
            // Store the details in the appropriate state variables (separating the FavoriteMovies array for ease of use)
            userDetails: response.data,
            FavoriteMovies: response.data.FavoriteMovies
        });
    }).catch(function(error) {
        console.log(error);
    });
	};
}