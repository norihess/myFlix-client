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
    axios.get(`https://nori-myflixdb.herokuapp.com/users/${Username}`, {
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

		updateUserDetails(e) {
			const form = e.currentTarget.parentNode;
			let token = localStorage.getItem('token');
			let user = localStorage.getItem('user');
			// Make use of Bootstraps built in validation, changing the state validated  to true to indicate that the form has undergone validation (not to indicate if it's passed validation or not)
			if (form.checkValidity() === false) {
					e.preventDefault();
					e.stopPropagation();
					this.setState({ validated: true });
			} else {
					e.preventDefault();
					this.setState({ validated: true });
					// If validation passed, then make a put request to the API, updating all the details on the form (which are now stored in the state variables thanks to the handleFieldChange function)
					axios.put(`https://myhorrormovies.herokuapp.com/users/${user}`, {
							Username: this.state.Username,
							Password: this.state.Password,
							Email: this.state.email,
							Birthday: this.state.Birthdate
					}, {
							headers: { Authorization: `Bearer ${token}`}
					}).then(response => {
							const data = response.data;
							// Update localStorage with the new username
							localStorage.setItem('user', data.Username);
							// Reload the page to make sure that the user can immediately start using their new details
							window.open(`/users/${data.Username}`, '_self');
					}).catch(error => {
							console.log('error updating user details')
					});
			}
	};
	handleFieldChange(event) {
			let {name, value} = event.target;
			this.setState({ [name]: value})
	}
}