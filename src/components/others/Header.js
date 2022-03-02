import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoritesModal from './FavoritesModal';
import EditUserModal from './EditUserModal';
import axios from 'axios';

export default function Header() {
  const navigate = useNavigate();
  const [user, setuser] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token)  {
        navigate("/");
    }
    var user = localStorage.getItem('user')
    setuser(user); 
  }, []);
  
  const logOut = () => {
    localStorage.setItem('token', '');
    navigate("/");
}

const deleteUser = () => {
  //send axios call to delte user
  axios.delete('http://localhost:8080/users/')
  .then(res=>alert("User Deleted!"))
  .catch(err=>console.log(err))
}
  return <header>
        <h1>Welcome {user.Username}</h1>
        <div style={{float: 'right', marginTop: '-50px'}}>
        <EditUserModal/>
        <FavoritesModal />
        <button onClick={deleteUser} href='#'>
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
