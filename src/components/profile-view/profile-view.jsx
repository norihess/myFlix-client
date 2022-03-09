import React from 'react';
import axios from 'axios';
import './profile-view.scss';
import { Button, Form, Modal } from 'react-bootstrap';

export default function EditUserModal(props) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [ Username, setUsername ] = useState("");
	const [ Password, setPassword ] = useState("");
	const [ Email, setEmail ] = useState("");
	const [ BirthDate, setBirthDate ] = useState("");
	const navigate = useNavigate();

	useEffect( ()=> { 
		const token = localStorage.getItem('token')
		if(!token)  {
				navigate("/");
		}
		var user = jwt_decode(token);
		setUsername(user.Username);
		setPassword(user.Password);
		setEmail(user.Email);  
		setBirthDate(user.BirthDate);
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault();
		
		axios.put(`https://nori-myflixdb.herokuapp.com/${Username}`, 
		{Username, Password, Email, BirthDate},
		{
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		})
		.then(response=>{
				if(response.status === 200)
				{
						alert('Profile edited successful!');
						navigate("/main");
				}
			 
		})
		.catch(err=>console.log(err));
	};

	return (
			<>
				<button onClick={handleShow}>
					Edit Profile
				</button>
	
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Profile</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						 
					<Form>
		<Form.Group className="mb-3" controlId="formGroupUsername">
			<Form.Label>Username</Form.Label>
			<Form.Control type="text" disabled required value={Username} onChange={e => setUsername(e.target.value)} />
		</Form.Group>
		<Form.Group className="mb-3" controlId="formGroupPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control type="password" required value={Password} onChange={e => setPassword(e.target.value)} />
		</Form.Group>
		<Form.Group className="mb-3" controlId="formGroupEmail">
			<Form.Label>Email</Form.Label>
			<Form.Control type="email" required value={Email} onChange={e => setEmail(e.target.value)} />
		</Form.Group>
		<Form.Group className="mb-3" controlId="formGroupBirthday">
			<Form.Label>Birthday</Form.Label>
			<Form.Control type="date" required value={BirthDate} onChange={e => setBirthDate(e.target.value)} />
		</Form.Group>
		<Button variant="danger" type="submit" onClick={handleSubmit}>Edit Profile</Button>
	</Form> 

					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
}

export default function FavoritesModal(props) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [movies, setMovies] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
			const token = localStorage.getItem('token')
			if(!token)  {
					navigate("/");
			}
			var user = jwt_decode(token);
			axios
			.get(`https://nori-myflixdb.herokuapp.com/${user.Username}/favorites`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			})
			.then((res) => {
				 setMovies(res.data.Favorites);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
			<>
				<button onClick={handleShow}>
					View Favorite Movies
				</button>
	
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Favorites</Modal.Title>
					</Modal.Header>
					<Modal.Body>
							{
									movies.map((movie, index) => (
											<MovieCard className="movieCard" key={index} movie={movie} />
									))
							}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
}