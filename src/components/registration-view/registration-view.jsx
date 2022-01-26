import React, { useState } from 'react';

import './registration-view.scss'

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ Birthday, setBirthday ] = useState('');

	  // validate user inputs
    const validate = () => {
			let isReq = true;

			if(!username){
					setUsernameErr('Username required');
					isReq = false;
			}else if(username.length < 2){
					setUsernameErr('Username must be at least 2 characters long');
					isReq = false;
			}
			if(!password){
					setPasswordErr('Password required');
					isReq = false;
			}else if(password.length < 6){
					setPassword('Password must be at least 6 characters long');
					isReq = false;
			}
			if(!email){
					setEmailErr('Email required');
					isReq = false;
			}else if(email.indexOf('@') === -1){
					setEmail('Email must be valid');
					isReq = false;
			}

			return isReq;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if(isReq) {
				/* Send request to the server for authentication */
				axios.post('https://nori-myflixdb.herokuapp.com//users', {
						Username: username,
						Password: password,
						Email: email,
						Birthday: birthday,
				})
						.then(response => {
								const data = response.data;
								console.log(data);
								alert('Registration successful, please login!');
								window.open('/', '_self');
						})
						.catch(response => {
								console.error(response);
								alert('Unable to register');
						});
		}
};

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}

RegistrationView.propTypes = {
	register: PropTypes.shape({
			Username: PropTypes.string.isRequired,
			Password: PropTypes.string.isRequired,
			Email: PropTypes.string.isRequired,
	}),
	onRegistration: PropTypes.func,
};