import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoritesModal from './FavoritesModal';
import EditUserModal from './EditUserModal';
import axios from 'axios';

export default function Header() {
  const navigate = useNavigate();
  const [user, setuser] = useState('');
  const [favMovies, setfavMovies] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token)  {
        navigate("/");
    }
    var user = localStorage.getItem('user')
    setuser(user); 

    axios.get(`https://nori-myflixdb.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      
      console.log(response.data)
    
      axios
      .get(`https://nori-myflixdb.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => {
         const favs = []
         console.log(res.data.FavoriteMovies)
         response.data.forEach(x=>{
           if(res.data.FavoriteMovies.includes(x._id)){
              favs.push(x)
           }
         }) 
         setfavMovies([...favs])
         console.log(favs)
         console.log(favMovies)
         
        // setMovies(res.data.FavoriteMovies);
      })
      .catch((err) => {
        console.error(err);
      });

    })
    .catch(function (error) {
      console.log(error);
    });

   


  }, []);
  
  const logOut = () => {
    localStorage.setItem('token', '');
    navigate("/");
}

deleteUser = () => {
  const Username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  
  axios.delete(`https://nori-myflixdb.herokuapp.com/users/${Username}`, {
          headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
          console.log(response);
          alert("Profile deleted");
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.open('/', '_self');
      })
      .catch(function (error) {
          console.log(error);
      });
}

  return <header>
        <h1>Welcome {user.Username}</h1>
        <div style={{float: 'right', marginTop: '-50px'}}>
        <EditUserModal/>
        <FavoritesModal favMovies={favMovies}/>
        <button onClick={()=>deleteUser()} href='#'>
            Delete User
        </button>
        <button onClick={logOut} href='#'>
            Log out
        </button>
        </div>
        <hr width="100%" />
        <br />
      </header>;
}
